import React, {Component} from 'react';
import {api} from "../../../axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MetaTags from 'react-meta-tags';
import {TITLE} from '../../../constants';
import Grid from "@material-ui/core/Grid";
import List from "./Seasons/List";
import Link from "@material-ui/core/Link/Link";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import Container from "@material-ui/core/Container/Container";
import Img from "../../Layouts/UI/Img";


class ShowDetails extends Component {

    state = {
        show: null,
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
                api.get('/shows/' + id)
                    .then(data => {
                        this.setState({show: data});
                    }).catch(() => this.props.history.push('/'));
            }
        }
    }

    render() {
        console.log(this.state.show)
        let show = (
            <div style={{flexGrow: 1, padding: '2%'}}>
                <LinearProgress letiant="query"/>
            </div>
        );
        let meta = "";
        if (this.state.show) {
            let {image, genres, summary, name, network, status, premiered, language, officialSite, rating, id} = this.state.show;
            image = image && image.original ? image.original : "//static.tvmaze.com/images/no-img/no-img-portrait-text.png";
            genres = genres ? this.state.show.genres.join(" | ") : "";
            genres = genres ? genres : this.state.show.type;
            meta = (
                <MetaTags>
                    <title>{TITLE + '| ' + name}</title>
                    <meta name="description"
                          content={summary ? summary.replace(/<[^>]+>/g, '') : ""}/>
                    <meta property="og:title" content={TITLE + '| ' + name}/>
                    <meta property="og:image" content={image}/>
                </MetaTags>
            );

            show = (
                <div style={{flexGrow: 1, padding: '2%'}}>
                    <Grid container spacing={4} key={id}>
                        <Grid item lg={2}>
                            <Img
                                alt={name}
                                style={{height: "auto", width: "100%"}}
                                src={image}
                                title={name}
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <Container>
                                <Typography gutterBottom style={{fontWeight: "bold"}} component="h1">
                                    {name}
                                </Typography>
                                <Typography component="p">
                                    {summary ? summary.replace(/<[^>]+>/g, '') : ""}
                                </Typography>
                            </Container>
                        </Grid>
                        <Grid item  lg={4}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant={"h6"}>
                                        Show Info
                                    </Typography>
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
                            </Card>
                        </Grid>

                        <Grid item  lg={12}>
                            <List  {...this.props} />
                        </Grid>
                    </Grid>
                </div>
            );
        }
        return (
            <Container fixed>
                {meta}
                {show}
            </Container>
        );
    }
}

export default ShowDetails;