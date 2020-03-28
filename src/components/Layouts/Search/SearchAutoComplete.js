import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import SearchCard from "./SearchCard";

const SearchAutoComplete = (props) => {
    return (
        <Autocomplete
            freeSolo
            size={"small"}
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
                    position: "relative",
                    marginRight: 4,
                    marginLeft: 0,
                }
            }
            renderInput={params => (
                <TextField
                    style={{
                        backgroundColor: "white",
                        borderRadius: 4

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