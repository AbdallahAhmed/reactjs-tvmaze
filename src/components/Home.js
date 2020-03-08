import React, {Component} from 'react';
import Search from "./Layouts/Search/Search";
import MetaTags from "react-meta-tags";
import {GENRE_VALUES, GENRES, TITLE, YEARS} from "../index";
import Grid from "@material-ui/core/Grid";
import Show from "./Shows/Show";
import axios from "../axios";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import Pagination from "@material-ui/lab/Pagination/Pagination";
import Typography from "@material-ui/core/Typography/Typography";
import Container from "@material-ui/core/Container/Container";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect/NativeSelect";
import Button from "@material-ui/core/Button/Button";

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
        ref: React.createRef(),
        params: {},
        genre: "",
        rate: "",
        year: "",
    };

    initialState = {};

    constructor(props) {
        super(props);
        this.initialState = {
            shows: [],
            limit: 20,
            loading: true,
            search: false,
            query: "",
            paginationCount: 0,
            paginationPage: 1,
            pagedShows: [],
            params: {},
            genre: "",
            rate: "",
            ref: React.createRef(),
            year: "",
        };
    }


    componentDidMount() {
        this.loadShows();
    };

    reset = () => {
        this.setState(this.initialState);
        this.loadShows();
        this.props.history.push("/")
    };

    loadShows() {
        axios.get('/shows?page=0')
            .then(response => {
                let shows = response.data;
                this.setShows(shows);
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
                loading: false,
            });
        }
        this.setShows(shows, query, true)
    };

    setShows = (shows, query = "", search = false) => {
        let year, rate, genre = "";
        const queries = new URLSearchParams(this.props.location.search);
        const params = {};
        for (let param of queries.entries())
            params[param[0]] = param[1];

        if (params.s || search) {
            search = true;
            query = query ? query : params.s;
            shows = shows.filter(show => {
                return show.name.includes(query);
            });
        }
        if (params.year) {
            year = params.year;
            shows = shows.filter(show => {
                return show.premiered ? +show.premiered.substring(0, 4) === +params.year : false;
            })
        }
        if (params.rate) {
            rate = params.rate;
            shows = shows.filter(show => {
                return show.rating ? show.rating.average ? show.rating.average >= +params.rate : false : false;
            })
        }
        if (params.genre) {
            genre = params.genre;
            shows = shows.filter(show => {
                for (let genre of show.genres)
                    return genre.toLowerCase() === params.genre.toLowerCase() && GENRE_VALUES.includes(genre.toLowerCase());
                return false
            })
        }
        shows.sort((a, b) => {
            return b.weight - a.weight
        });
        shows = shows.length > 200 ? shows.splice(0, 200) : shows;
        let limit = this.state.limit;
        this.setState({
            shows: shows,
            pagedShows: shows.length > limit ? shows.slice(0, limit) : shows,
            paginationPage: 1,
            paginationCount: shows.length > limit ? Math.ceil((shows.length / limit)) : 1,
            search: search,
            query: query,
            loading: false,
            params: params,
            genre: genre,
            rate: rate,
            year: year
        });
    }

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


    onSelectChange = (event, type) => {
        const value = event.target.value;
        let queryString = this.generateParamsString(value, type)
        this.props.history.push({
            pathname: "/",
            search: queryString
        });
        this.loadShows();
    };

    generateParamsString = (value = "", type = "") => {
        const queries = new URLSearchParams(this.props.location.search);
        const params = {};
        for (let param of queries.entries())
            params[param[0]] = param[1];
        let array = [];

        let {query, search} = this.state;
        if (search && query)
            array.push("s=" + query);

        for (let param in params) {
            if (param !== type && param !== "s")
                array.push(param + "=" + params[param])
        }
        if (value !== "")
            array.push(type + "=" + value);
        return "?" + array.join('&');

    };


    render() {
        let {search, loading, query, paginationCount, paginationPage, pagedShows, params, rate, year, genre} = this.state;
        let shows = (
            <Grid item xs={12} sm={6} lg={3} xl={3}>
                <LinearProgress variant="query"/>
            </Grid>
        );
        let pagination = "";
        let showsList = null;
        if (!loading) {
            showsList = (

                <Grid ref={"shows"} container spacing={6} style={{paddingTop: 60}}>
                    <Grid container direction="column"
                          alignItems="center"
                          justify="center">
                        <Grid item xs={4} sm={6} lg={12} xl={12}>
                            <Typography color={"primary"} variant={"h5"}>
                                {search ? pagedShows.length ? `Results for "${query}"` : `No Results for "${query}"` : pagedShows.length ? "Most Popular Shows" : "No Shows Are Found!"}
                            </Typography>
                        </Grid>
                    </Grid>
                    {pagedShows.map(show => (
                        <Grid key={show.id} item xs={12} sm={6} lg={3} xl={3}>
                            <Show {...this.props} show={show}/>
                        </Grid>
                    ))}
                </Grid>
            );
            shows = showsList;
            pagination = pagedShows.length ? (
                <Pagination
                    variant="outlined" shape="rounded" color="primary"
                    page={paginationPage} onChange={this.onPageChange}
                    count={paginationCount}/>
            ) : "";
        }
        const meta = (
            <MetaTags>
                <title>{TITLE}</title>
                <meta name="description" content={"TVMaze Reactjs App"}/>
                <meta property="og:title" content={TITLE}/>
                <meta property="og:description" content={TITLE}/>
            </MetaTags>
        );
        return (
            <Container fixed>
                <div style={{flexGrow: 1, padding: '2%'}}>
                    {meta}
                    <Grid container justify="center" spacing={2}>
                        <Grid container justify='center'>
                            <Search {...this.props} query={this.state.query} changed={this.onSearch} home={true}/>
                        </Grid>
                        <Grid container spacing={1} justify="center" style={{paddingTop: 12}}>
                            <Grid item lg={3}>
                                <FormControl style={{maxWidth: 100}}>
                                    <InputLabel htmlFor="age-native-simple">Year</InputLabel>
                                    <NativeSelect value={year !== "" ? year : ""} onChange={(event) => this.onSelectChange(event, "year")}>
                                        <option value="" />
                                        {YEARS.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item lg={3}>
                                <FormControl style={{minWidth: 100}}>
                                    <InputLabel htmlFor="age-native-simple">Rate</InputLabel>
                                    <NativeSelect value={rate !== "" ? rate : ""} onChange={(event) => this.onSelectChange(event, "rate")}>
                                        <option value="" />
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(rate => (
                                            <option key={rate} value={rate}>{`+${rate}`}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item lg={3}>
                                <FormControl style={{maxWidth: 100}}>
                                    <InputLabel htmlFor="age-native-simple">Genre</InputLabel>
                                    <NativeSelect value={genre !== "" ? genre : ""} onChange={(event) => this.onSelectChange(event, "genre")}>
                                        <option value=""/>
                                        {GENRES.map(gen => (
                                            <option key={gen} value={gen.toLowerCase()}>{gen}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item lg={3}>
                                <Button onClick={this.reset} variant={"contained"} color={"primary"} style={{display: Object.keys(params).length ? "" : "none"}}>
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                        {shows}
                        <Grid container direction="column" alignItems="center" justify="center"
                              style={{paddingTop: 40}}>
                            <Grid item lg={12}>
                                {pagination}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        )
    }
}

export default Home;