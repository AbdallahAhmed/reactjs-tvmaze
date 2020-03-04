import React, {Component} from 'react';
import axios from "../../../../../axios";
import Search from '../../../../Layouts/Search/Search'
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


class Episode extends Component {

    state = {
        episode: null
    };

    componentDidMount() {
        this.loadEpisode();
    }

    componentDidUpdate() {
        this.loadEpisode();
    }

    loadEpisode() {
        const id = this.props.match.params.id;
        if (id) {
            if (!this.state.episode || (this.state.episode && this.state.episode.id !== +id)) {
                axios.get('/episodes/' + id)
                    .then(response => {
                        /*console.log(response.data);*/
                        this.setState({episode: response.data});
                    });
            }
        }
    }

    render() {
        var episode = "Loading";
        if (this.state.episode) {
            var image = this.state.episode.image;
            image = image && image.original ? image.original : "default";

            episode = (
                <div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                        <Card style={{ maxWidth: '50%'}}>
                            <CardMedia style={{maxHeight: 500, paddingTop: '50%', marginTop: '30'}}
                                       image={image}
                                       title={this.state.episode.title}
                            />
                            <CardContent>
                                <Typography gutterBottom style={{fontWeight: "bold"}} component="h1">
                                    {this.state.episode.name}
                                </Typography>
                                <Typography component="p">
                                    {this.state.episode.summary.replace(/<[^>]+>/g, '')}
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
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Search {...this.props} options={[]} home={false}/>
                {episode}
            </div>
        );
    }
}

export default Episode;