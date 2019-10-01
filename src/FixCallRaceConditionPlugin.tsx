import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "flex-plugin";
import { ITask, Manager, Notifications, NotificationType, TaskHelper, ActionPayload, Actions } from "@twilio/flex-ui";
import { MainContent } from "./components/MainContent";
import * as styles from "./components/MainContent/styles";

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
        flex.Actions.addListener("beforeMonitorCall", this.handleMonitorCall);
    }

    registerNotification() {
        Notifications.registerNotification({
            type: NotificationType.warning,
            id: this.notificationID,
            content: <MainContent notificationId={this.notificationID} />,
            timeout: 0
        });
    }

    handleBeforeAcceptTask = (payload: ActionPayload) => {
        const { task }: { task: ITask } = payload;

        // If this is not a call tasks, don't do anything
        if (!TaskHelper.isCallTask(task)) {
            return;
        }

        const connection = this.getPhoneConnectionFromState();

        // Before accepting the task, remove any existing call
        if (this.ifFlavorTwo(connection)) {
            this.hangupCallAndLog(2, "before accepting task");
        }

        // A few seconds after accepting the tasks, check for clean-up
        setTimeout(() => {
            const connection = this.getPhoneConnectionFromState();

            // If flavour #1, let agents know that there's an invalid call and reservation
            // and ask them if they want to hang it up
            if (this.ifFlavorOne(connection, task)) {
                Notifications.showNotification(this.notificationID, {
                    content: (
                        <>
                            Sorry, the system isn’t responding. It looks like the caller has already hung up.{" "}
                            <styles.Bold>To continue, cancel the pending task.</styles.Bold>
                        </>
                    ),
                    onHangup: () => this.hangupCallAndLog(1, "timeout")
                });
                return;
            }
        }, 5000);
    };

    handleMonitorCall = () => {
        const connection = this.getPhoneConnectionFromState();

        return new Promise((resolve) => {
            if (this.ifFlavorTwo(connection)) {
                Notifications.showNotification(this.notificationID, {
                    onHangup: () => {
                        this.hangupCallAndLog(1, "timeout");
                        resolve();
                    },
                    content: (
                        <>
                            <styles.Bold>To monitor this call, cancel the pending task.</styles.Bold>
                        </>
                    )
                });
            }
        });
    };

    getPhoneConnectionFromState() {
        const {
            flex: {
                phone: { connection }
            }
        } = (this.manager as Manager).store.getState();

        return connection;
    }

    ifFlavorOne(connection: any, currentTask: ITask) {
        return connection && currentTask && currentTask.sourceObject.status === "pending";
    }

    ifFlavorTwo(connection: any) {
        return connection;
    }

    hangupCallAndLog = (flavour: number, event: string) => {
        Actions.invokeAction("HangupCall", { task: {} });
        console.error(
            `Voice call race condition detected - Scenario 1, flavour ${flavour}. Hanging an invalid call down on ${event}.`
        );
    };
}