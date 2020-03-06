import React, {Component} from 'react';
import axios from "../../../axios";
import Search from '../../Layouts/Search/Search'
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {NavLink, Route, Switch} from "react-router-dom";
import SeasonEpisodes from "./Seasons/SeasonEpisodes";
import Cast from "./Cast";
import MetaTags from 'react-meta-tags';
import {TITLE} from '../../../index';
import Grid from "@material-ui/core/Grid";
import Episode from "./Seasons/Episodes/Episode";
import List from "./Seasons/List";
import Link from "@material-ui/core/Link/Link";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";


class ShowDetails extends Component {

    state = {
        show: null
    };

    componentDidMount() {
        this.loadShow();
    }

    componentDidUpdate() {
        this.loadShow();
    }

    loadShow() {
        const id = this.props.match.params.id;
        if (id) {
            if (!this.state.show || (this.state.show && this.state.show.id !== +id)) {
                axios.get('/shows/' + id)
                    .then(response => {
                        this.setState({show: response.data});
                    }).catch(() => this.props.history.push('/'));
            }
        }
    }

    render() {
        var show = (
            <div style={{flexGrow: 1, padding: '2%'}}>
                <LinearProgress variant="query" />
            </div>
        );
        var meta = "";
        if (this.state.show) {
            var image = this.state.show.image;
            image = image && image.original ? image.original : "//static.tvmaze.com/images/no-img/no-img-portrait-text.png";

            var genres = this.state.show.genres ? this.state.show.genres.join(" | ") : "";
            genres = genres ? genres : this.state.show.type;
            meta = (
                <MetaTags>
                    <title>{TITLE + '| ' + this.state.show.name}</title>
                    <meta name="description"
                          content={this.state.show.summary ? this.state.show.summary.replace(/<[^>]+>/g, '') : ""}/>
                    <meta property="og:title" content={TITLE + '| ' + this.state.show.name}/>
                    <meta property="og:image" content={image}/>
                </MetaTags>
            );

            show = (
                <div style={{flexGrow: 1, padding: '2%'}}>
                    <Grid container spacing={4} key={this.state.show.id}>
                        <Grid container
                              direction="column"
                              alignItems="center"
                              justify="center">
                            <Grid item lg={12}>
                                <List {...this.props} />
                            </Grid>
                        </Grid>
                        <Grid container
                              direction="column"
                              alignItems="center"
                              justify="center"
                        >
                            <Grid item lg={12}>
                                <Route path="/show/:id/seasons/:season_id" exact component={SeasonEpisodes}/>
                            </Grid>
                        </Grid>
                        <Grid item lg={2}>
                            <img
                                style={{height: "auto", width: "100%"}}
                                src={image}
                                title={this.state.show.name}
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <Typography gutterBottom style={{fontWeight: "bold"}} component="h1">
                                {this.state.show.name}
                            </Typography>
                            <Typography component="p">
                                {this.state.show.summary ? this.state.show.summary.replace(/<[^>]+>/g, '') : ""}
                            </Typography>
                        </Grid>
                        <Grid item lg={4}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant={"h6"}>
                                        Show Info
                                    </Typography>
                                    {this.state.show.network ? (
                                        <Typography>
                                            {"Network: " + this.state.show.network.name}
                                        </Typography>
                                    ) : ""}
                                    {this.state.show.status ? (
                                        <Typography>
                                            {"Status: " + this.state.show.status}
                                        </Typography>
                                    ) : ""}
                                    {genres ? (
                                        <Typography>
                                            {"Genres: " + genres}
                                        </Typography>
                                    ) : ""}
                                    {this.state.show.premiered ? (
                                        <Typography>
                                            {"Year: " + this.state.show.premiered.substring(0, 4)}
                                        </Typography>
                                    ) : ""}
                                    {this.state.show.language ? (
                                        <Typography>
                                            {"Language: " + this.state.show.language}
                                        </Typography>
                                    ) : ""}
                                    {this.state.show.officialSite ? (
                                        <Typography>
                                            Official Site:
                                            <Link target={"_blank"}
                                                  href={this.state.show.officialSite}>{" " + this.state.show.officialSite}</Link>
                                        </Typography>
                                    ) : ""}
                                    {this.state.show.rating.average ? (
                                        <Typography>
                                            {"Rating: " + this.state.show.rating.average + " / 10"}
                                        </Typography>
                                    ) : ""}
                                </CardContent>
                            </Card>
                        </Grid>
                        {/*<Grid  item lg={12} >
                            <List {...this.props} />
                        </Grid>*/}
                        {/*<Grid item lg={6}>
                            <Card style={{alignSelf: 'center'}}>
                                <CardMedia style={{ paddingTop: '80%', margin: 'auto'}}
                                           image={image}
                                           title={this.state.show.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom style={{fontWeight: "bold"}} component="h1">
                                        {this.state.show.name}
                                    </Typography>
                                    <Typography component="p">
                                        {this.state.show.summary ? this.state.show.summary.replace(/<[^>]+>/g, '') : ""}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    {genres ? (
                                        <Typography>
                                            {"Genres: " + genres}
                                        </Typography>
                                    ) : ""}
                                    {this.state.show.premiered ? (
                                        <Typography>
                                            {"Year: " + this.state.show.premiered.substring(0, 4)}
                                        </Typography>
                                    ) : ""}
                                    {this.state.show.rating.average ? (
                                        <Typography>
                                            {"Rating: " + this.state.show.rating.average + " / 10"}
                                        </Typography>
                                    ) : ""}
                                </CardContent>
                            </Card>
                        </Grid>*/}
                        {/*<Grid item lg={6} style={{width: '100%'}}>
                            <Route path="/show/:id/seasons/:season_id" exact component={SeasonEpisodes}/>
                            <Route path="/show/:id/seasons/:season_id/episode/:episode_id" exact component={Episode}/>
                        </Grid>*/}
                    </Grid>
                </div>
            );
        }
        return (
            <div style={{flexGrow: 1}}>
                {meta}
                <Search {...this.props} options={[]} home={false}/>
                {show}
            </div>
        );
    }
}

export default ShowDetails;