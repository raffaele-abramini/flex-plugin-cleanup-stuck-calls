import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "flex-plugin";
import { ITask, Manager, Notifications, NotificationType, TaskHelper, ActionPayload, Actions } from "@twilio/flex-ui";
import { MainContent } from "./components/MainContent";

const PLUGIN_NAME = "FixCallRaceConditionPlugin";

export default class FixCallRaceConditionPlugin extends FlexPlugin {
    constructor() {
        super(PLUGIN_NAME);
    }

    manager?: Flex.Manager;
    notificationID = "HANGUP_STUCK_CALL_NOTIFICATION";

    /**
     * This code is run when your plugin is being started
     * Use this to modify any UI components or attach to the actions framework
     *
     * @param flex { typeof Flex }
     * @param manager { Flex.Manager }
     */
    init(flex: typeof Flex, manager: Flex.Manager) {
        this.manager = manager;

        this.registerNotification();
        flex.Actions.addListener("beforeAcceptTask", this.handleBeforeAcceptTask);
    }

    registerNotification() {
        Notifications.registerNotification({
            type: NotificationType.warning,
            id: this.notificationID,
            content: (
                <MainContent
                    notificationId={this.notificationID}
                    onHangup={this.hangupCallAndLog}
                />
            ),
            timeout: 0
        });
    }

    handleBeforeAcceptTask = (payload: ActionPayload) => {
        const { task } = payload;

        if (!TaskHelper.isCallTask(task as ITask)) {
            return;
        }

        const { connection, tasks } = this.getStateProps();

        // Before accepting the task, remove any existing call (matching flavor #2)
        if (this.ifFlavorTwo(connection, tasks)) {
            Notifications.showNotification(this.notificationID, {
                flavour: 2,
                event: "before accepting task"
            });
        }

        // A few seconds after accepting the tasks, check for clean-up
        setTimeout(() => {
            const { connection, tasks } = this.getStateProps();

            // If there's not connection, no clean-up is needed
            if (!connection) {
                return;
            }

            // If flavour #1, let the agent know that we are hanging up the connection
            // and removing the already cancelled reservation
            const currentTask = tasks.get((task as ITask).sid);
            if (this.ifFlavorOne(connection, currentTask)) {
                Notifications.showNotification(this.notificationID, {
                    flavour: 1,
                    event: "timeout"
                });
                return;
            }

            // If flavour #2, remove any existing call - so that there's no need to do it in the next "beforeAcceptTask" event
            if (this.ifFlavorTwo(connection, tasks)) {
                Notifications.showNotification(this.notificationID, {
                    flavour: 2,
                    event: "timeout"
                });
                return;
            }
        }, 5000);
    };

    getStateProps() {
        const {
            flex: {
                phone: { connection },
                worker: { tasks }
            }
        } = (this.manager as Manager).store.getState();

        return {
            connection,
            tasks
        };
    }

    ifFlavorOne(connection: any, currentTask: ITask) {
        return connection && currentTask && currentTask.status === "pending";
    }

    ifFlavorTwo(connection: any, tasks: Map<string, ITask>) {
        const tasksArr = Array.from(tasks.values());

        if (!connection) {
            return false;
        }

        return !tasksArr.length || !tasksArr.find(this.isAcceptedCallTask);
    }

    isAcceptedCallTask = (task: ITask) => TaskHelper.isCallTask(task as ITask) && task.status === "accepted";

    hangupCallAndLog = (flavour?: number, event?: string) => {
        Actions.invokeAction("HangupCall", { task: {} });
        console.warn(
            `Voice call race condition detected - Scenario 1, flavour ${flavour}. Hanging an invalid call down on ${event}.`
        );
    };
}
