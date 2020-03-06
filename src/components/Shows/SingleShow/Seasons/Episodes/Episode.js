import React, {Component} from 'react';
import axios from "axios";
import Search from '../../../../Layouts/Search/Search'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MetaTags from "react-meta-tags";
import {TITLE} from "../../../../../index";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link/Link";
import {NavLink} from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";


class Episode extends Component {

    state = {
        episode: null,
        show: null,
    };

    componentDidMount() {
        this.loadEpisode();
    }

    componentDidUpdate() {
        this.loadEpisode();
    }

    loadEpisode() {

        const show_id = this.props.match.params.id;
        const id = this.props.match.params.episode_id;
        if (id) {
            if (!this.state.episode || (this.state.episode && +this.state.episode.id !== +id)) {
                const one = 'http://api.tvmaze.com/shows/' + show_id;
                const two = 'http://api.tvmaze.com/episodes/' + id;
                const requestOne = axios.get(one);
                const requestTwo = axios.get(two);
                axios.all([requestOne, requestTwo]).then(axios.spread((...res) => {
                    const res1 = res[0]
                    const res2 = res[1]
                    this.setState({
                        show: res1.data,
                        episode: res2.data
                    })
                    console.log(this.state)
                })).catch(errors => () => this.props.history.push('/'))
            }
        }
    }

    render() {
        var episode = (
            <div style={{flexGrow: 1, padding: '2%'}}>
            <LinearProgress variant="query" />
            </div>
        );
        var meta = "";
        if (this.state.episode) {
            var image = this.state.episode.image;
            image = image && image.original ? image.original : "//static.tvmaze.com/images/no-img/no-img-portrait-text.png";
            meta = (
                <MetaTags>
                    <title>{TITLE + '| ' + this.state.episode.name}</title>
                    <meta name="description"
                          content={this.state.episode.summary ? this.state.episode.summary.replace(/<[^>]+>/g, '') : ""}/>
                    <meta property="og:title" content={TITLE + '| ' + this.state.episode.name}/>
                    <meta property="og:image" content={image}/>
                </MetaTags>
            );
            episode = (
                <div style={{flexGrow: 1, padding: '2%'}}>
                    <Grid container spacing={4}>
                        <Grid item lg={2}>
                            <img
                                alt={this.state.episode.name}
                                style={{height: "auto", width: "100%"}}
                                src={image}
                                title={this.state.episode.name}
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <Typography gutterBottom style={{fontWeight: "bold"}} component="h1">
                                {this.state.episode.name}
                            </Typography>
                            <Typography component="p">
                                {this.state.episode.summary ? this.state.episode.summary.replace(/<[^>]+>/g, '') : ""}
                            </Typography>
                        </Grid>
                        <Grid item lg={4}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant={"h6"}>
                                        Episode Info
                                    </Typography>
                                    {this.state.show.name ? (
                                        <Typography>
                                            {"Show name: "}
                                            <NavLink style={{textDecoration: "none"}} to={'/show/' + this.state.show.id}>
                                                {this.state.show.name}
                                            </NavLink>
                                        </Typography>
                                    ) : ""}
                                    {this.state.episode.season ? (
                                        <Typography>
                                            {"Number: "}
                                                {"Season " + this.state.episode.season}
                                            {this.state.episode.number ? ", Episode "+ this.state.episode.number: ""}
                                        </Typography>
                                    ) : ""}
                                    {this.state.episode.airdate ? (
                                        <Typography>
                                            {"Airdate: " + this.state.episode.airdate}
                                        </Typography>
                                    ) : ""}
                                    {this.state.episode.url ? (
                                        <Typography>
                                            URL: <Link target={"_blank"}
                                                       href={this.state.episode.url}>{" " + this.state.episode.url}</Link>
                                        </Typography>
                                    ) : ""}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>

            );
        }
        return (
            <div>
                {meta}
                <Search {...this.props} options={[]} home={false}/>
                {episode}
            </div>
        );
    }
}

export default Episode;