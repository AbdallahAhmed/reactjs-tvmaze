import React, {Component} from 'react';
import axios from "../../../axios";
import Search from '../../Layouts/Search/Search'
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Navbar from "../Navbar";
import {Route, Switch} from "react-router-dom";
import Episodes from "./Episodes";
import Cast from "./Cast";

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
                        /*console.log(response.data);*/
                        this.setState({show: response.data});
                        console.log(response.data)
                    });
            }
        }
    }

    render() {
        var show = "Loading";
        if (this.state.show) {
            var image = this.state.show.image;
            image = image && image.original ? image.original : "default";

            var genres = this.state.show.genres ? this.state.show.genres.join(" | ") : "";
            genres = genres ? genres : this.state.show.type;
            show = (
                <div>
                    < Navbar id={this.state.show.id}/>

                    <Card style={{alignSelf: 'center', maxWidth: 345}}>
                        <CardMedia style={{
                            height: 0,
                            paddingTop: '50%'
                        }}
                                   image={image}
                                   title={this.state.show.title}
                        />
                        <CardContent>
                            <Typography gutterBottom style={{fontWeight: "bold"}} component="h1">
                                {this.state.show.name}
                            </Typography>
                            <Typography component="p">
                                {this.state.show.summary.replace(/<[^>]+>/g, '')}
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
                    <Route path="/show/:id/episodes" exact component={Episodes}/>
                    <Route path="/show/:id/cast" exact component={Cast}/>
                </div>
            );
        }
        return (
            <div>
                <Search {...this.props} options={[]} home={false}/>
                {show}
            </div>
        );
    }
}

export default ShowDetails;