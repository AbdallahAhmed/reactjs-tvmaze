import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "../../../axios";
import SearchCard from "./SearchCard";


class Search extends Component {
    state = {
        searchString: '',
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
        var search = <TextField style={{width: '100%', padding: 24}}
                                id="searchInput"
                                placeholder="Search for Shows"
                                margin="normal"
                                onChange={this.props.changed}/>
        if (!this.props.home) {
            search = (
                <Autocomplete
                    freeSolo
                    id="combo-box-demo"
                    options={this.state.options}
                    getOptionLabel={option => option.name}
                    clearOnEscape
                    onChange={(event, newValue) => {
                        if (newValue.id)
                            this.props.history.push({
                                pathname: '/show/' + newValue.id
                            });
                    }}
                    style={{paddingTop: 20, width: "30%", alignItems: 'center'}}
                    renderInput={params => <TextField fullWidth onChange={this.onSearchInputChange} {...params}
                                                      variant="outlined"/>}
                    renderOption={option => {
                        return (
                            <SearchCard {...this.props} option={option}/>
                        );
                    }}
                />
            )
        }
        return (
            <div>
                {search}
            </div>
        );
    }
}

export default Search;