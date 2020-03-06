import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchCard from "./SearchCard";
import {fade} from "@material-ui/core";

const SearchAutoComplete = (props) => {
    return (
        <Autocomplete
            freeSolo
            options={props.options}
            getOptionLabel={option => option.name}
            clearOnEscape
            onChange={(event, newValue) => {
                if (newValue)
                    props.history.push({
                        pathname: '/show/' + newValue.id
                    });
            }}
            style={
                {
                    position: 'relative',
                    backgroundColor: fade("rgba(255,255,255)", 0.15),
                    marginRight: 4,
                    marginLeft: 0,
                    width: '25%',
                }
            }
            renderInput={params => (
                <TextField
                    style={{
                        backgroundColor: fade("rgb(255,255,255)", 0.2)
                    }}
                    placeholder="Search for Shows"
                    variant={"outlined"}
                    onChange={props.changed} {...params}
                />
            )
            }
            renderOption={option => {
                return (
                    <SearchCard {...props} option={option}/>
                );
            }}
        />
    );
};

export default SearchAutoComplete;