import * as styles from './styles'
import { Controls } from '../Controls'
import React from 'react'

export class MainContent extends React.PureComponent {
  render() {
    return (
      <styles.MainContainer>Something went wrong <Controls notificationId={this.props.notificationId} /></styles.MainContainer>
    )
  }
}
