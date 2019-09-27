import * as React from "react";
import { Notifications, Actions } from "@twilio/flex-ui";
import * as styles from "./styles";

interface ControlsProps {
    notificationId: string;
    onHangup: () => void;
}

export class Controls extends React.PureComponent<ControlsProps> {
    handleHangupClick = () => {
        Notifications.dismissNotificationById(this.props.notificationId);
        this.props.onHangup();
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
