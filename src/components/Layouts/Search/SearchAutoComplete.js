import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchCard from "./SearchCard";

const SearchAutoComplete = (props) => {
    return (
        <Autocomplete
            freeSolo
            id="debug"
            options={props.options}
            getOptionLabel={option => option.name}
            clearOnEscape
            onChange={(event, newValue) => {
                if (newValue)
                    props.history.push({
                        pathname: '/show/' + newValue.id
                    });
            }}
            style={{width: '100%'}}
            renderInput={params => (
                <div style={{flexGrow: 1, padding: '2%'}}>
                    <Grid container justify='center' spacing={2}>
                        <Grid item xs={8}>
                            <Grid item xs={12}>
                                <TextField style={{width: '100%'}}
                                           placeholder="Search for Shows"
                                           onChange={props.changed} {...params}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
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