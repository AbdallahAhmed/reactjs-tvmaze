import React from 'react';
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card/Card";

const SearchCard = (props) => {
    const image = props.option.image ? props.option.image.original : "default"
    return (
        <Grid container alignItems="center">
            <Grid item xl>
                    <CardMedia style={{
                        height: 0,
                        paddingTop: '50%',
                        align: 'right'
                    }}
                               image={image}
                    />
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