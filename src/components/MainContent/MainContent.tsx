import * as styles from "./styles";
import { Controls } from "../Controls";
import React from "react";

interface MainContentProps {
    notificationId: string;
}

export class MainContent extends React.PureComponent<MainContentProps> {
    render() {
        return (
            <styles.MainContainer>
                <span>
                    Sorry, the system isn’t responding. It looks like the caller has already hung up.{" "}
                    <styles.Bold>To continue, cancel the pending task.</styles.Bold>
                </span>
                <Controls notificationId={this.props.notificationId} />
            </styles.MainContainer>
        );
    }
}
