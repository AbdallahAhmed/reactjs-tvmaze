import React from 'react';
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Img from "../UI/Img";

const SearchCard = (props) => {
    const image = props.option.image ? props.option.image.original : "//static.tvmaze.com/images/no-img/no-img-portrait-text.png";
    return (
        <Grid container spacing={1} alignItems="center" justify="center" >
            <Grid item lg={4}>
                <Img
                    alt={name}
                    style={{height: "auto", width: "80%"}}
                    src={image}
                    title={name}
                />
            </Grid>
            <Grid item lg={8}>
                <CardContent style={{align: 'center'}}>
                    <Typography variant="body2" color="textSecondary">
                        {props.option.name}
                    </Typography>
                </CardContent>
            </Grid>
        </Grid>
    );
};

export default SearchCard;