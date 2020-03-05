import React, {Component} from 'react';
import axios from "../../../../../axios";
import Search from '../../../../Layouts/Search/Search'
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MetaTags from "react-meta-tags";
import {TITLE} from "../../../../../index";


class Episode extends Component {

    state = {
        episode: null,
    };

    componentDidMount() {
        this.loadEpisode();
    }

    componentDidUpdate() {
        this.loadEpisode();
    }

    loadEpisode() {
        const id = this.props.match.params.episode_id;
        if (id) {
            if (!this.state.episode || (this.state.episode && this.state.episode.id !== +id)) {
                axios.get('/episodes/' + id)
                    .then(response => {
                        this.setState({episode: response.data});
                    }).catch(() => this.props.history.push('/'));
            }
        }
    }

    render() {
        var episode = "Loading";
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
                <Card>
                    <CardMedia style={{paddingTop: '80%', marginTop: '30'}}
                               image={image}
                               title={this.state.episode.title}
                    />
                    <CardContent>
                        <Typography gutterBottom style={{fontWeight: "bold"}} component="h1">
                            {this.state.episode.name}
                        </Typography>
                        <Typography component="p">
                            {this.state.episode.summary ? this.state.episode.summary.replace(/<[^>]+>/g, '') : ""}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        {this.state.episode.season ? (
                            <Typography>
                                {"Season: " + this.state.episode.season}
                            </Typography>
                        ) : ""}
                        {this.state.episode.number ? (
                            <Typography>
                                {"Episode: " + this.state.episode.number}
                            </Typography>
                        ) : ""}
                        {this.state.episode.airdate ? (
                            <Typography>
                                {"Date: " + this.state.episode.airdate}
                            </Typography>
                        ) : ""}
                        <Typography>
                            See More: <a href={this.state.episode.url} target="_blank">{this.state.episode.url}</a>
                        </Typography>
                    </CardContent>
                </Card>
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