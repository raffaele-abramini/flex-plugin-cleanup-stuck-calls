import * as React from 'react';
import { Notifications, Actions } from '@twilio/flex-ui';
import * as styles from './styles'

interface ControlsProps {
    notificationId: string
}

export class Controls extends React.PureComponent<ControlsProps> {
    static defaultProps = {};

    handleIgnoreClick = () => {
        Notifications.dismissNotificationById(this.props.notificationId);
    };

    handleHangupClick = () => {
        Notifications.dismissNotificationById(this.props.notificationId);
        Actions.invokeAction("HangupCall", { task: {} });
    };

    render() {
        return (
            <styles.MainContainer>
                <styles.ButtonContainer>
                    <styles.StyledButton type="button" onClick={this.handleIgnoreClick}>Ignore</styles.StyledButton>
                </styles.ButtonContainer>
                <styles.ButtonContainer>
                    <styles.StyledButton type="button" onClick={this.handleHangupClick}>Hangup</styles.StyledButton>
                </styles.ButtonContainer>
            </styles.MainContainer>
        )
    }
}