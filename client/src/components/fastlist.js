import React from 'react';
import axios from 'axios';
import Fast from './fast';
import InfoPanel from './infopanel'
import { Button, Card, Grid, Header, Icon, Segment, Label } from 'semantic-ui-react'

export default class FastList extends React.Component {
    constructor(props) {
        super(props);
        this.getFasts = this.getFasts.bind(this);
        this.deleteFast = this.deleteFast.bind(this);
        this.updatePanel = this.updatePanel.bind(this);
        this.state = { fasts: [], selected: null, progress: 0 };
    }

    componentDidMount() {
        this.getFasts();
    }

    getFasts() {
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                id: this.props.user.id
            }
        };
        axios.get('/fasts/', config)
            .then(res => {
                this.setState({ fasts: res.data })
            })
            .catch(err => console.log(err));
    }

    deleteFast(id) {
        axios.delete(`/fasts/${id}`)
            .then(res => {
                this.setState({ fasts: this.state.fasts.filter(fast => fast._id !== id) });
                if (this.state.selected._id === id) {
                    this.setState({ fasts: this.state.fasts, selected: null })
                }
            });
    }

    updatePanel(id, progress) {
        this.setState({ fasts: this.state.fasts, selected: this.state.fasts.find(fast => fast._id === id), progress: progress });
    }

    render() {
        return (
            <div>
                <Grid columns={2} textAlign='center'>
                    <Grid.Row verticalAlign='middle' style={{ 'justifyContent': 'flex-start'}}>
                        <Grid.Column width='11'>
                            <Segment vertical style={{ overflow: 'auto', maxHeight: '100vh' }}>
                                <Button basic color="olive" icon onClick={() => { this.props.history.replace("/add") }}><Icon name="add"/></Button>
                                <Header as="h3" style={{display: 'inline-block', marginLeft: '5px'}}>Logged Fasts <Label circular color='olive'>{this.state.fasts.length}</Label></Header>
                                <Card.Group stackable centered style={{ margin: '.875em .5em' }}>
                                    {this.state.fasts.map((fast, i) => (
                                        <div key={fast._id}>
                                            <Fast id={fast._id}
                                                start={fast.startTime}
                                                end={fast.endTime}
                                                index={i}
                                                updatePanel={this.updatePanel} /><br />
                                        </div>
                                    ))}
                                </Card.Group>
                                {!this.state.fasts.length && <div>No fasts to display.</div>}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width='3' style={{ 'paddingRight': 0, 'paddingLeft': 0 }}>
                            <Segment color="olive" vertical raised style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', overflow: 'auto', height: '100vh' }} id="sidebar">
                                <InfoPanel fast={this.state.selected}
                                           progress={this.state.progress}
                                           deleteFast={this.deleteFast}
                                           history={this.props.history}/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}