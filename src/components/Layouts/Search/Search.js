import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import axios from "../../../axios";
import SearchAutoComplete from "./SearchAutoComplete";
import Grid from "@material-ui/core/Grid";
import * as actions from '../../../store/actions/index';
import {connect} from "react-redux";

class Search extends Component {
    state = {
        options: [],
    };

    getShows = (query) => {
        if (!this.props.home) {
            axios.get('search/shows?q=' + query)
                .then(response => {
                    this.setState({
                        options: response.data.map(show => {
                            return show.show;
                        })
                    });
                })
                .catch(error => {
                    console.log("Error occurred:" + error)
                })
        } else {
            this.props.onSearch(query);
            this.props.changed(query);
        }
    };

    onSearchInputChange = () => {
        if (/\S/.test(event.target.value)) {
            this.getShows(event.target.value)
        } else {
            this.setState({options: []});
            if (this.props.home)
                this.getShows(event.target.value);
        }
    };

    render() {
        let search = (
            <Grid item xs={8}>
                <Grid item xs={12}>
                    <TextField
                        value={this.props.query}
                        variant="outlined"
                        style={{width: '100%'}}
                        placeholder="Search for Shows"
                        onChange={() => {
                            this.onSearchInputChange();
                        }}/>
                </Grid>
            </Grid>
        );
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


const mapStateToProps = state => {
    return {
        query: state.search.query,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (query) => dispatch(actions.search(query))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);