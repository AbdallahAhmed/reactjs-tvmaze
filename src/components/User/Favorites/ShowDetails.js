import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link/Link";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import Container from "@material-ui/core/Container/Container";
import Img from "../../Layouts/UI/Img";
import {NavLink} from "react-router-dom";


const ShowDetails = (props) => {

    let show = (
        <div style={{flexGrow: 1, padding: '2%'}}>
            <LinearProgress letiant="query"/>
        </div>
    );
    let {image, genres, summary, name, network, status, premiered, language, officialSite, rating, type, id} = props.show;
    image = image && image.original ? image.original : "//static.tvmaze.com/images/no-img/no-img-portrait-text.png";
    genres = genres ? genres.join(" | ") : "";
    genres = genres ? genres : type;

    show = props.info
        ? (
            <Card >
                <CardContent>
                    {network ? (
                        <Typography>
                            {"Network: " + network.name}
                        </Typography>
                    ) : ""}
                    {status ? (
                        <Typography>
                            {"Status: " + status}
                        </Typography>
                    ) : ""}
                    {genres ? (
                        <Typography>
                            {"Genres: " + genres}
                        </Typography>
                    ) : ""}
                    {premiered ? (
                        <Typography>
                            {"Year: " + premiered.substring(0, 4)}
                        </Typography>
                    ) : ""}
                    {language ? (
                        <Typography>
                            {"Language: " + language}
                        </Typography>
                    ) : ""}
                    {officialSite ? (
                        <Typography>
                            Official Site:
                            <Link target={"_blank"}
                                  href={officialSite}>{" " + officialSite}</Link>
                        </Typography>
                    ) : ""}
                    {rating.average ? (
                        <Typography>
                            {"Rating: " + rating.average + " / 10"}
                        </Typography>
                    ) : ""}
                </CardContent>
            </Card>)
        : (
            <Grid container>
                <Grid item lg={3}>
                    <Img
                        alt={name}
                        style={{height: "auto", width: "100%"}}
                        src={image}
                        title={name}
                    />
                </Grid>
                <Grid item lg={9}>
                    <Container>
                        <Typography gutterBottom style={{fontWeight: "bold"}} component="h1">
                            <NavLink to={`/show/${id}`}>{name}</NavLink>
                        </Typography>
                        <Typography component="p">
                            {summary ? summary.replace(/<[^>]+>/g, '') : ""}
                        </Typography>
                    </Container>
                </Grid>
            </Grid>
        );
    return show;

};

export default ShowDetails;