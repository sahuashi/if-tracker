import React from 'react';

import Moment from 'react-moment';
import {
  Card, Icon, Label, Progress,
} from 'semantic-ui-react';

export default class Fast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      start: new Date(this.props.start),
      end: new Date(this.props.end),
      difference: 0,
      elapsed: 0,
      progress: 0,
    };
    this.getDifference = this.getDifference.bind(this);
    this.getElapsed = this.getElapsed.bind(this);
    this.getProgress = this.getProgress.bind(this);
    this.updatePanel = this.updatePanel.bind(this);
  }

  componentDidMount() {
    this.getDifference();
    this.getElapsed();
  }

  getDifference() {
    const diffInSeconds = (this.state.end - this.state.start) / 1000;
    this.setState({ difference: diffInSeconds });
  }

  getElapsed() {
    let elapsed = ((new Date()) - this.state.start) / 1000;
    if (elapsed < 0) {
      elapsed = 0;
    }
    this.setState({ elapsed }, () => {
      (this.getProgress());
    });
  }

  getProgress() {
    let progress = (this.state.elapsed / this.state.difference) * 100;
    progress = progress > 100 ? 100 : Math.round(progress);
    this.setState({ progress });
  }

  updatePanel() {
    this.props.updatePanel(this.state.id, this.state.progress);
  }

  render() {
    const progressbar = this.state.progress === 100
      ? <Progress color="olive" percent={100} style={{ marginBottom: '1em' }} />
      : <Progress indicating percent={this.state.progress} style={{ marginBottom: '1em' }} />;

    return (
      <div>
        <Card style={{ margin: '0em 1em' }} onClick={this.updatePanel}>
          {this.state.progress === 100 && <Label floating circular><Icon color="brown" name="check" style={{ margin: '0' }} /></Label>}
          <Card.Content>
            <Card.Header style={{ marginBottom: '0.25em', color: '#283618' }}>
              Fast #
              {this.props.index + 1}
            </Card.Header>
            <div id="cardbody">
              <Icon color="olive" name="hourglass start" />
              {' '}
              <Moment format="MMMM DD, YYYY @ hh:mm A" date={this.state.start} />
            </div>
            <div id="cardbody">
              <Icon color="olive" name="hourglass end" />
              {' '}
              <Moment format="MMMM DD, YYYY @ hh:mm A" date={this.state.end} />
            </div>
            {progressbar}
            <Card.Meta style={{ marginBottom: '0.5em' }}>
              Duration:
              <Moment duration={this.state.start} date={this.state.end} />
            </Card.Meta>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
