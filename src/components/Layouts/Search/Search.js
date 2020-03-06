import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import axios from "../../../axios";
import SearchAutoComplete from "./SearchAutoComplete";
import Grid from "@material-ui/core/Grid";
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
                    }),
                    loading: false
                })
                this.props.changed(this.state.options, query);
            })
            .catch(error => {
                console.log("Error occurred:" + error)
            })
    };

    onSearchInputChange = () => {
        if (/\S/.test(event.target.value)) {
            this.setState({
                searchString: event.target.value,
                loading: true
            }, this.getShows)
        } else if (event.target.value === "") {
            this.setState({options: []})
            this.props.changed([], "");
        }
    }

    render() {
        var search = (
            <Grid item xs={8}>
                <Grid item xs={12}>
                    <TextField style={{width: '100%'}}
                               placeholder="Search for Shows"
                               onChange={() => {
                                   this.onSearchInputChange();
                               }}/>
                </Grid>
            </Grid>
        )
        if (!this.props.home) {
            search = (
                <SearchAutoComplete
                    {...this.props}
                    changed={this.onSearchInputChange}
                    options={this.state.options}/>
            )
        }
        return search;
    }
}

export default Search;