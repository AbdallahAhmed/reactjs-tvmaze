import React, {Component} from 'react';
import Search from "./Layouts/Search/Search";
import MetaTags from "react-meta-tags";
import {TITLE} from "../index";
import Grid from "@material-ui/core/Grid";
import Show from "./Shows/Show";
import axios from "../axios";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import Pagination from "@material-ui/lab/Pagination/Pagination";
import Typography from "@material-ui/core/Typography/Typography";
import Container from "@material-ui/core/Container/Container";

class Home extends Component {

    state = {
        shows: [],
        limit: 20,
        loading: true,
        search: false,
        query: "",
        paginationCount: 0,
        paginationPage: 1,
        pagedShows: [],
        ref: React.createRef()
    };

    componentDidMount() {
        this.loadShows();
    };

    loadShows() {
        axios.get('/shows?page=0')
            .then(response => {
                let shows = response.data;
                shows.sort((a, b) => {
                    return b.weight - a.weight
                });
                shows = shows.length > 200 ? shows.splice(0, 200) : shows;
                this.setState({
                    shows: shows,
                    pagedShows: shows.length > 20 ? shows.slice(0, 20) : shows,
                    loading: false,
                    limit: 20,
                    search: false,
                    paginationPage: 1,
                    paginationCount: shows.length > 20 ? Math.ceil((shows.length / 20)) : 1,
                });
            })
    }

    onSearch = (shows, query) => {
        if (!shows.length) {
            if (!query) {
                this.loadShows();
                return;
            }
            this.setState({
                pagedShows: shows,
                loading: false
            });
        }
        shows.sort((a, b) => {
            return b.weight - a.weight
        });
        shows = shows.length > 200 ? shows.splice(0, 200) : shows;
        let limit = this.state.limit;
        this.setState({
            shows: shows,
            search: true,
            pagedShows: shows.length > limit ? shows.slice(0, limit) : shows,
            paginationPage: 1,
            query: query,
            paginationCount: shows.length > limit ? Math.ceil((shows.length / limit)) : 1,
        });
    };

    onPageChange = (event, value) => {
        let currentPage = this.state.paginationPage;

        if (currentPage !== value) {
            let shows = this.state.shows;
            let limit = this.state.limit;
            this.setState({
                pagedShows: shows.slice((value - 1) * limit, ((value - 1) * limit) + limit),
                paginationPage: value,
            });
            this.refs["shows"].scrollIntoView({behavior: 'smooth'});
        }
    };

    render() {
        let shows = (
            <Grid item xs={12} sm={6} lg={3} xl={3}>
                <LinearProgress variant="query"/>
            </Grid>
        );
        let pagination = "";
        let showsList = null;
        if (!this.state.loading) {
            showsList = (
                <Container fixed>

                    <Grid ref={"shows"} container spacing={6} style={{padding: 60}}>
                        <Grid container direction="column"
                              alignItems="center"
                              justify="center">
                            <Grid item xs={4} sm={6} lg={12} xl={12}>
                                <Typography color={"primary"} variant={"h5"}>
                                    {this.state.search ? this.state.pagedShows.length ? `Results for "${this.state.query.toString()}"` : `No Results for "${this.state.query.toString()}"` : "Most Popular Shows"}
                                </Typography>
                            </Grid>
                        </Grid>
                        {this.state.pagedShows.map(show => (
                            <Grid key={show.id} item xs={12} sm={6} lg={3} xl={3}>
                                <Show {...this.props} show={show}/>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            );
            shows = showsList;
            pagination = this.state.pagedShows.length ? (
                <Pagination
                    variant="outlined" shape="rounded" color="primary"
                    page={this.state.paginationPage} onChange={this.onPageChange}
                    count={this.state.paginationCount}/>
            ) : "";
        }
        const meta = (
            <MetaTags>
                <title>{TITLE}</title>
                <meta name="description"
                      content={"TVMaze Reactjs App"}/>
                <meta property="og:title" content={TITLE}/>
            </MetaTags>
        );
        return (
            <div style={{flexGrow: 1, padding: '2%'}}>
                {meta}
                <Grid container justify='center' spacing={2}>
                    <Grid container justify='center'>
                        <Search {...this.props} changed={this.onSearch} home={true}/>
                    </Grid>
                    {shows}
                    <Grid container direction="column" alignItems="center" justify='center'>
                        <Grid item lg={12}>
                            {pagination}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Home;