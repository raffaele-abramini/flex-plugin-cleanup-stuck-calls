import React from 'react';
import { Notifications, NotificationType, TaskHelper } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import { MainContent } from './components/MainContent'

const PLUGIN_NAME = 'FixCallRaceConditionPlugin';

export default class FixCallRaceConditionPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  notificationID = "HANGUP_STUCK_CALL_NOTIFICATION";

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.manager = manager;

    this.registerNotification();
    flex.Actions.addListener("beforeAcceptTask", this.handleBeforeAcceptTask)
  }

  registerNotification() {
    Notifications.registerNotification({
      type: NotificationType.warning,
      id: this.notificationID,
      content: (<MainContent notificationId={this.notificationID} />),
      timeout: 0
    });
  }

  handleBeforeAcceptTask = (payload) => {
    const { task } = payload;

    if (!TaskHelper.isCallTask(task)) {
      return;
    }

    setTimeout(() => {
      const { flex: flexState } = this.manager.store.getState();
      const currentTask = flexState.worker.tasks.get(payload.task.sid);

      if (flexState.phone.connection && currentTask && currentTask.status === "pending") {
        Notifications.showNotification(this.notificationID);
      }
    }, 5000)
  }
}
