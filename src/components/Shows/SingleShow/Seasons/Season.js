import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from '../../../../axios';
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";


class Season extends Component {
    state = {
        season: this.props.season,
        episodes: []
    };

    componentDidMount() {
        const id = this.state.season.id;
        axios.get('seasons/' + id + "/episodes")
            .then(response => {
                this.setState({
                    episodes: response.data
                })
            }).catch(() => this.props.history.push('/'));
    };

    onEpisodeClickHandler = (id) => {
        const show_id = this.props.show_id
        const season_id = this.props.season.id;
        this.props.history.push({
            pathname: '/show/' + show_id + '/seasons/' + season_id + '/episode/' + id,
        });
    };

    render() {
        var table = (
            <div style={{flexGrow: 1, padding: '2%'}}>
                <LinearProgress variant="query" />
            </div>
        );
        if(this.state.episodes.length){
            table = (
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell  align="left">Number</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {this.state.episodes.map(episode => (
                                <TableRow key={episode.id}>
                                    <TableCell style={{maxWidth: '2%'}} align="center" >{episode.number}</TableCell>
                                    <TableCell align="center">
                                        <Button style={{color: 'navy'}} onClick={() => {
                                            this.onEpisodeClickHandler(episode.id)
                                        }}>
                                            {episode.name}
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">{episode.airdate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
        return table;
    }
}

export default Season;
