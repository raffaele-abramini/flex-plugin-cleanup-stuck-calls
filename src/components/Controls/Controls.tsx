import * as React from "react";
import { Notifications, Actions } from "@twilio/flex-ui";
import * as styles from "./styles";

interface ControlsProps {
    notificationId: string;
    onHangup: (flavour?: number, event?: string) => void;
    notificationContext: {
        event?: string;
        flavour?: number;
    }
}

export class Controls extends React.PureComponent<ControlsProps> {
    static defaultProps = {
        notificationContext: {}
    };

    handleHangupClick = () => {
        const { flavour, event } = this.props.notificationContext;
        Notifications.dismissNotificationById(this.props.notificationId);
        this.props.onHangup(flavour, event);
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
