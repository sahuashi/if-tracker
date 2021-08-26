import React from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Moment from 'react-moment';
import {
  Header, Icon, Button, ButtonGroup,
} from 'semantic-ui-react';
import 'react-circular-progressbar/dist/styles.css';

export default class InfoPanel extends React.Component {
  deleteFast = () => {
    this.props.deleteFast(this.props.fast._id);
  }

  render() {
    let elapsed; let
      remainder;
    if (this.props.fast !== null) {
      if (this.props.progress === 100) {
        elapsed = <Moment duration={new Date(this.props.fast.startTime)} date={new Date(this.props.fast.endTime)} />;
        remainder = '0:00';
      } else if (new Date(this.props.fast.startTime) > new Date()) {
        elapsed = '0:00';
        remainder = <Moment duration={new Date(this.props.fast.startTime)} date={new Date(this.props.fast.endTime)} />;
      } else {
        remainder = <Moment duration={new Date()} date={new Date(this.props.fast.endTime)} />;
        elapsed = <Moment duration={new Date(this.props.fast.startTime)} date={new Date()} />;
      }
    }
    return (
      <div>
        <h3>Details</h3>
        {!this.props.fast && <Header as="h4" color="brown" style={{ opacity: 0.4 }}>Select a fast to view more information.</Header>}
        {this.props.fast && (
        <div>
          <h5>
            <Icon name="calendar outline" />
            Start:
            {' '}
          </h5>
          <p id="detail"><Moment format="dddd, MMMM DD @ hh:mm A" date={new Date(this.props.fast.startTime)} /></p>
          <h5>
            <Icon name="calendar check outline" />
            End:
            {' '}
          </h5>
          <p id="detail"><Moment format="dddd, MMMM DD @ hh:mm A" date={new Date(this.props.fast.endTime)} /></p>
          <div style={{ width: 150, height: 150, margin: 'auto' }}>
            <CircularProgressbar
              value={this.props.progress}
              text={`${this.props.progress}%`}
              styles={buildStyles({
                pathColor: `rgba(221, 161, 94, ${this.props.progress / 100})`,
                textColor: '#DDA15E',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
          </div>
          <h5>
            <Icon name="clock outline" />
            Duration:
            {' '}
          </h5>
          <p id="detail"><Moment duration={new Date(this.props.fast.startTime)} date={new Date(this.props.fast.endTime)} /></p>
          <h5>
            <Icon name="hourglass half" />
            Elapsed:
            {' '}
          </h5>
          <p id="detail">{elapsed}</p>
          <h5>
            <Icon name="hourglass half" />
            Remaining:
            {' '}
          </h5>
          <p id="detail">{remainder}</p>
          <ButtonGroup>
            <Button color="olive" onClick={() => { this.props.history.replace(`/edit/${this.props.fast._id}`); }}>Edit Fast</Button>
            <Button.Or />
            <Button style={{ backgroundColor: '#DDA15E', color: 'white' }} onClick={this.deleteFast}>Delete Fast</Button>
          </ButtonGroup>
        </div>
        )}
      </div>
    );
  }
}
