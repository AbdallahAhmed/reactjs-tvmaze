import React, {Component} from 'react';
import MetaTags from "react-meta-tags";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination/Pagination";
import Typography from "@material-ui/core/Typography/Typography";
import Container from "@material-ui/core/Container/Container";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect/NativeSelect";
import Button from "@material-ui/core/Button/Button";

import Show from "./Shows/Show";
import Search from "./Layouts/Search/Search";
import {GENRES, TITLE, YEARS} from "../constants";
import {connect} from "react-redux";
import {fetchShows, changePage, filterShows, updateShows} from '../store/actions/index';
import {backend} from "../axios";

class Home extends Component {

    state = {
        ref: React.createRef(),
        removed: []
    };

    componentDidMount() {
        this.loadShows();
    };

    reset = () => {
        this.props.fetchShows();
        this.props.history.push("/")
    };

    loadShows() {
        const queries = new URLSearchParams(this.props.location.search);
        const params = {};
        for (let param of queries.entries())
            params[param[0]] = param[1];
        if (params.year || params.rate || params.genre || params.s)
            this.props.filterShows(params);
        else
            this.props.fetchShows();
    }

    onSearch = (query) => {
        let queryString = this.generateParamsString("", "", query);
        this.props.history.push({
            pathname: "/",
            search: queryString
        });
    };

    onPageChange = (event, value) => {
        if (this.props.paginationPage !== value) {
            this.props.changePage(value)
            this.refs["shows"].scrollIntoView({behavior: 'smooth'});
        }
    };

    onSelectChange = (event, type) => {
        const value = event.target.value;
        let params = {
            ...this.props.params,
            [type]: value
        };
        this.props.filterShows(params);
        let queryString = this.generateParamsString(value, type);
        this.props.history.push({
            pathname: "/",
            search: queryString
        });

    };

    generateParamsString = (value = "", type = "", query = this.props.query) => {
        const queries = new URLSearchParams(this.props.location.search);
        const params = {};
        for (let param of queries.entries())
            params[param[0]] = param[1];

        let array = [];
        if (query) {
            array.push("s=" + query);
        }
        for (let param in params) {
            if (param !== type && param !== "s")
                array.push(param + "=" + params[param])
        }

        if (value !== "")
            array.push(type + "=" + value);
        return "?" + array.join('&');
    };

    handleSaveClick = async (id) => {
        let {removed} = this.state;
        const url = ! removed.includes(id) ? 'addFavorite/' : 'removeFavorite/';
        await backend.post(url + id).then(res => {
            this.props.updateShows(res.data.shows_count);
        });
        removed = !removed.includes(id) ? removed.filter(el => el !== id) : removed.concat(id);
        this.setState({removed});
    };
    render() {
        let {loading, search, query, pagedShows, paginationCount, paginationPage, params, error, filter} = this.props;

        let {year, genre, rate} = params;
        let pagination = "";
        let showsList = null;
        if (!loading) {
            if (!error) {
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
                                <Show clicked={() => this.handleSaveClick(show.id)} {...this.props} show={show}/>
                            </Grid>
                        ))}
                    </Grid>
                );
                pagination = pagedShows.length ? (
                    <Pagination
                        variant="outlined" shape="rounded" color="primary"
                        page={paginationPage} onChange={this.onPageChange}
                        count={paginationCount}/>
                ) : "";
            } else {
                showsList = <p>{error}</p>
            }

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
                            <Search changed={(q) => this.onSearch(q)} home />
                        </Grid>
                        <Grid container spacing={1} justify="center" style={{paddingTop: 12}}>
                            <Grid item lg={3}>
                                <FormControl style={{maxWidth: 100}}>
                                    <InputLabel htmlFor="age-native-simple" shrink={year !== ""} style={{
                                        position: "relative"
                                    }}>Year</InputLabel>
                                    <NativeSelect value={year !== "" ? year : ""}
                                                  onChange={(event) => this.onSelectChange(event, "year")}>
                                        <option value="">{null}</option>
                                        {YEARS.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item lg={3}>
                                <FormControl style={{minWidth: 100}}>
                                    <InputLabel htmlFor="age-native-simple" shrink={rate !== ""} style={{
                                        position: "relative",
                                    }}>Rate</InputLabel>
                                    <NativeSelect value={rate !== "" ? rate : ""}
                                                  onChange={(event) => this.onSelectChange(event, "rate")}>
                                        <option value=""/>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(rate => (
                                            <option key={rate} value={rate}>{`+${rate}`}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item lg={3}>
                                <FormControl style={{maxWidth: 100, margin: 2}}>
                                    <InputLabel htmlFor="age-native-simple" shrink={genre !== ""} style={{
                                        position: "relative"
                                    }}>Genre</InputLabel>
                                    <NativeSelect value={genre !== "" ? genre : ""}
                                                  onChange={(event) => this.onSelectChange(event, "genre")}>
                                        <option value=""/>
                                        {GENRES.map(gen => (
                                            <option key={gen} value={gen.toLowerCase()}>{gen}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item lg={3}>
                                <Button onClick={this.reset} variant={"contained"} color={"primary"}
                                        style={{display: filter ? "" : "none"}}>
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                        {showsList}
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

const mapStateToProps = state => {
    return {
        shows: state.shows.shows,
        loading: state.shows.loading,
        search: state.shows.search.status,
        query: state.shows.search.query,
        pagedShows: state.shows.pageShows,
        paginationPage: state.shows.paginationPage,
        paginationCount: state.shows.paginationCount,
        error: state.shows.error,
        params: state.shows.filter.params,
        filter: state.shows.filter.status
    }
};

/*const mapDispatchToProps = dispatch => {
    return {
        initShows: () => dispatch(actions.fetchShows()),
        changePage: (next) => dispatch(actions.changePage(next)),
        filterShows: (params) => dispatch(actions.filterShows(params)),
    }
};*/
export default connect(mapStateToProps, {fetchShows, changePage, filterShows, updateShows})(Home);