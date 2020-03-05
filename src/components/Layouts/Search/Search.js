import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "../../../axios";
import SearchCard from "./SearchCard";
import SearchAutoComplete from "./SearchAutoComplete";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Show from "../../Shows/Show";


class Search extends Component {
    state = {
        searchString: '',
        loading: false,
        options: [],
    };

    getShows = () => {
        const query = this.state.searchString;
        axios.get('search/shows?q=' + query)
            .then(response => {
                this.setState({
                    options: response.data.map(show => {
                        return show.show;
                    })
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
        var options = (
            <Typography style={{textAlign: "center"}} component="p">
                Please Enter A Keyword
            </Typography>
        );
        if (this.state.options.length) {
            options = (
                <Grid container spacing={6} style={{padding: 20}}>
                    {this.state.options.map(show => (
                        <Grid key={show.id} item xs={12} sm={6} lg={3} xl={3}>
                            <Show {...this.props} show={show}/>
                        </Grid>
                    ))}
                </Grid>
            )
        } else if (this.state.loading) {
            options = (
                <Typography style={{textAlign: "center"}} component="p">
                    Loading...!
                </Typography>
            );
        }
        else if (this.state.searchString !== '') {
            options = (
                <Typography style={{textAlign: "center"}} component="p">
                    No Shows are found!
                </Typography>
            );
        }
        var search = (
            <div style={{flexGrow: 1 , padding : '2%'}}>
                <Grid container justify='center' spacing={2}>
                    <Grid item xs={8} >
                        <Grid item xs={12}>
                            <TextField style={{width: '100%'}}
                                       placeholder="Search for Shows"
                                       onChange={this.onSearchInputChange}/>
                        </Grid>
                    </Grid>
                    <Grid  item xs={12}>
                        {options}
                    </Grid>
                </Grid>
            </div>

        )
        if (!this.props.home) {
            search = (
                <SearchAutoComplete
                    {...this.props}
                    changed={this.onSearchInputChange}
                    options={this.state.options} />
            )
        }
        return search;
    }
}

export default Search;