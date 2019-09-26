import * as React from "react";
import { Notifications, Actions } from "@twilio/flex-ui";
import * as styles from "./styles";

interface ControlsProps {
    notificationId: string;
}

export class Controls extends React.PureComponent<ControlsProps> {
    static defaultProps = {};

    handleHangupClick = () => {
        Notifications.dismissNotificationById(this.props.notificationId);
        Actions.invokeAction("HangupCall", { task: {} });
    };

    render() {
        return (
            <styles.MainContainer>
                <styles.ButtonContainer>
                    <styles.StyledButton type="button" onClick={this.handleHangupClick}>
                        Cancel task
                    </styles.StyledButton>
                </styles.ButtonContainer>
            </styles.MainContainer>
        );
    }
}
