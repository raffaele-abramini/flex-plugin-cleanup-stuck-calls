import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "flex-plugin";
import { ITask, Manager, Notifications, NotificationType, TaskHelper, ActionPayload } from "@twilio/flex-ui";
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
            content: <MainContent notificationId={this.notificationID} />,
            timeout: 0
        });
    }

    handleBeforeAcceptTask = (payload: ActionPayload) => {
        const { task } = payload;

        if (!TaskHelper.isCallTask(task as ITask)) {
            return;
        }

        setTimeout(() => {
            const { flex: flexState } = (this.manager as Manager).store.getState();
            const currentTask = flexState.worker.tasks.get((task as ITask).sid);

            if (flexState.phone.connection && currentTask && currentTask.status === "pending") {
                Notifications.showNotification(this.notificationID);
            }
        }, 5000);
    };
}
