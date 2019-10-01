import * as styles from "./styles";
import { Controls } from "../Controls";
import React from "react";

interface MainContentProps {
    notificationId: string;
    notificationContext: {
        onHangup: () => void;
    };
}

export class MainContent extends React.PureComponent<MainContentProps> {
    static defaultProps = {
        notificationContext: {}
    };

    render() {
        const {
            notificationContext: { onHangup }
        } = this.props;
        return (
            <styles.MainContainer>
                <span>
                    Sorry, the system isn’t responding. It looks like the caller has already hung up.{" "}
                    <styles.Bold>To continue, cancel the pending task.</styles.Bold>
                </span>
                <Controls notificationId={this.props.notificationId} onHangup={onHangup} />
            </styles.MainContainer>
        );
    }
}
