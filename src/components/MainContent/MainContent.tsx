import * as styles from './styles'
import { Controls } from '../Controls'
import React from 'react'

interface MainContentProps {
  notificationId: string
}

export class MainContent extends React.PureComponent<MainContentProps> {
  render() {
    return (
      <styles.MainContainer>Something went wrong <Controls notificationId={this.props.notificationId} /></styles.MainContainer>
    )
  }
}
