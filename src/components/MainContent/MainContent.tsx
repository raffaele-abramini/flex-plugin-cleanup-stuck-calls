import * as styles from "./styles";
import { Controls } from "../Controls";
import React from "react";

interface MainContentProps {
    notificationId: string;
    notificationContext: {
        onHangup: () => void;
        content: React.ReactChild
    }
}

export class MainContent extends React.PureComponent<MainContentProps> {
    static defaultProps = {
        notificationContext: {}
    };

    render() {
        const {
            notificationContext: {
                content,
                onHangup
            }
        } = this.props;
        return (
            <styles.MainContainer>
                <span>
                    {content}
                </span>
                <Controls notificationId={this.props.notificationId} onHangup={onHangup} />
            </styles.MainContainer>
        );
    }
}
