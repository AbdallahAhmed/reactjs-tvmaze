import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from '../../../../axios';
import Typography from "@material-ui/core/Typography";


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
            })
    };

    onEpisodeClickHandler = (id) => {
        this.props.history.push({
            pathname: '/episode/' +id
        });
    };
    render() {
        return (
            <div id={this.props.index} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <TableContainer  component={Paper} style={{maxWidth: 650}}>
                    <Typography gutterBottom style={{fontWeight: "bold"}}>
                        Season {this.state.season.number}
                    </Typography>
                    <Table  size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Number</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Rate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {this.state.episodes.map(episode => (
                                <TableRow key={episode.id}>
                                    <TableCell align="left" component="th" scope="row">{episode.number}</TableCell>
                                    <TableCell onClick={() => {this.onEpisodeClickHandler(episode.id)}} align="center">{episode.name}</TableCell>
                                    <TableCell align="center">{episode.airdate}</TableCell>
                                    <TableCell align="center">{episode.rate ? episode.rate.average : ""}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default Season;
