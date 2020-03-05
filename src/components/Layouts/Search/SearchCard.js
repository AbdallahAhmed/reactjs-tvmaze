import React from 'react';
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const SearchCard = (props) => {
    const image = props.option.image ? props.option.image.original : "//static.tvmaze.com/images/no-img/no-img-portrait-text.png";
    return (
        <Grid container spacing={4} alignItems="center">
            <Grid item lg={3}>
                <CardMedia style={{
                    height: 0,
                    paddingTop: '50%',
                    align: 'right'
                }}
                           image={image}
                />
            </Grid>
            <Grid item lg={3}>
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