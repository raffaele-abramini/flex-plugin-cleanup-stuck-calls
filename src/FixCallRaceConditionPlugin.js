import React from 'react';
import { Notifications, NotificationType, TaskHelper } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import { Controls } from './components/Controls'
import * as styles from './components/styles'

const PLUGIN_NAME = 'FixCallRaceConditionPlugin';

export default class FixCallRaceConditionPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }
  notificationID = "STUCK_CALL_NOTIFICATION";

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.flex = flex;
    this.manager = manager;

    this.registerNotification();
    flex.Actions.addListener("beforeAcceptTask", this.handleBeforeAcceptTask)
  }

  registerNotification() {
    Notifications.registerNotification({
      type: NotificationType.warning,
      id: this.notificationID,
      content: (
        <styles.MainContainer>Something went wrong <Controls notificationId={this.notificationID} /></styles.MainContainer>
      ),
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

      if (flexState.phone.connection && payload.task.status === "pending") {
        Notifications.showNotification(this.notificationID);
      }
    }, 5000)
  }
}
