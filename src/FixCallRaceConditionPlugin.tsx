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

    handleMonitorCall = () => {
        const connection = this.getPhoneConnectionFromState();

        const {
            flex: {
                worker: { tasks }
            }
        } = (this.manager as Manager).store.getState();

        const tasksArr: Array<ITask> = Array.from(tasks.values());

        if (
            this.ifFlavorTwo(connection) &&
            !tasksArr.find((t: ITask) => TaskHelper.isCallTask(t) && t.status === "accepted")
        ) {
            this.hangupCallAndLog(2, "before monitor call");
        }
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
