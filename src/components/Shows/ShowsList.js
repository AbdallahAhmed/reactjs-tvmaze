import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from '../../axios';
import Show from './Show';
import Typography from "@material-ui/core/Typography";

import Search from '../Layouts/Search/Search';

class ShowsList extends Component {
    state = {
        shows: [],
        searchString: ''
    }

    constructor(props) {
        super(props);
    }

    getShows = () => {
        const query = this.state.searchString;
        axios.get('search/shows?q=' + query)
            .then(response => {
                this.setState({
                    shows: response.data
                })
            })
            .catch(error => {
                console.log("Error occurred:" + error)
            })
    };

    onSearchInputChange = () => {
        if (event.target.value !== '') {
            this.setState({
                searchString: event.target.value
            }, this.getShows)
        } else {
            this.setState({
                searchString: ''
            }, this.getShows)
        }
    }

    render() {
        var shows = (
            <Typography style={{textAlign: "center"}} component="p">
                Please Enter A Keyword
            </Typography>
        );
        if (this.state.shows.length) {
            shows = (
                <Grid container spacing={8} style={{padding: 24}}>
                    {this.state.shows.map(show => (
                         <Grid key={show.show.id} item xs={12} sm={6} lg={3} xl={3}>
                            <Show {...this.props} show={show.show}/>
                        </Grid>
                    ))}
                </Grid>
            )
        } else if (this.state.searchString !== '') {
            shows = (
                <Typography style={{textAlign: "center"}} component="p">
                    No Shows are found!
                </Typography>
            );
        }
        return (
            <div>
                <div>
                    <Search home={true} changed={this.onSearchInputChange} >

                    </Search>
                    {shows}
                </div>
            </div>
        )
    }
}

export default ShowsList;