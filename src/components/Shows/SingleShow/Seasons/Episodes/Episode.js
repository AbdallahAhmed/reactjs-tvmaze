import React, {Component} from 'react';
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MetaTags from "react-meta-tags";
import {TITLE} from "../../../../../constants";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link/Link";
import {NavLink} from "react-router-dom";
import Img from "../../../../Layouts/UI/Img";
import Container from "@material-ui/core/Container/Container";


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
        let {id, episode_id} = this.props.match.params;
        if (episode_id) {
            if (!this.state.episode || (this.state.episode && +this.state.episode.id !== +episode_id)) {
                const one = 'http://api.tvmaze.com/shows/' + id;
                const two = 'http://api.tvmaze.com/episodes/' + episode_id;
                const requestOne = axios.get(one);
                const requestTwo = axios.get(two);
                axios.all([requestOne, requestTwo]).then(axios.spread((...res) => {
                    const res1 = res[0]
                    const res2 = res[1]
                    this.setState({
                        show: res1.data,
                        episode: res2.data
                    })
                })).catch(errors => () => this.props.history.push('/'))
            }
        }
    }

    render() {
        let episode = "";
        let meta = "";
        if (this.state.episode) {
            let {id} = this.state.show;
            let {image, name, summary, season, airdate, url, number} = this.state.episode;
            image = image && image.original ? image.original : "//static.tvmaze.com/images/no-img/no-img-portrait-text.png";
            meta = (
                <MetaTags>
                    <title>{TITLE + '| ' + name}</title>
                    <meta name="description"
                          content={summary ? summary.replace(/<[^>]+>/g, '') : ""}/>
                    <meta property="og:title" content={TITLE + '| ' + name}/>
                    <meta property="og:image" content={image}/>
                </MetaTags>
            );
            episode = (
                <Container>
                    <div style={{padding: '2%'}}>
                        <Grid container spacing={4}>
                            <Grid item lg={2}>
                                <Img
                                    style={{height: "auto", width: "100%"}}
                                    src={image}
                                    title={name}
                                />
                            </Grid>
                            <Grid item lg={6}>
                                <Typography gutterBottom style={{fontWeight: "bold"}} component="h1">
                                    {name}
                                </Typography>
                                <Typography component="p">
                                    {summary ? summary.replace(/<[^>]+>/g, '') : ""}
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
                                                <NavLink style={{textDecoration: "none"}} to={'/show/' + id}>
                                                    {this.state.show.name}
                                                </NavLink>
                                            </Typography>
                                        ) : ""}
                                        {season ? (
                                            <Typography>
                                                Number:
                                                {"Season " + season}
                                                {number ? ", Episode " + season : ""}
                                            </Typography>
                                        ) : ""}
                                        {airdate ? (
                                            <Typography>
                                                {"Airdate: " + airdate}
                                            </Typography>
                                        ) : ""}
                                        {url ? (
                                            <Typography>
                                                URL: <Link target={"_blank"}
                                                           href={url}>{" " + url}</Link>
                                            </Typography>
                                        ) : ""}
                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>
                    </div>
                </Container>

            );
        }
        return (
            <div>
                {meta}
                {episode}
            </div>
        );
    }
}

export default Episode;