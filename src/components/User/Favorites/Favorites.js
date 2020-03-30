import React, {Component} from 'react';
import './Style.css';
import {api, backend} from "../../../axios";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import InfiniteScroll from "react-infinite-scroller";
import Show from "../../Shows/Show";
import Spinner from "../../Layouts/UI/Spinner/Spinner";
import {Favorite} from "@material-ui/icons";
import Container from "@material-ui/core/Container/Container";
import {connect} from "react-redux";
import {updateShows} from "../../../store/actions/index";

class Favorites extends Component {
    state = {
        shows: [],
        loading: true,
        limit: 20,
        offset: 0,
        hasMore: true,
        show: null,
        removed: []
    };

    componentDidMount() {
        this.loadShows();
    }

    loadShows = async () => {
        let {offset, limit, shows, show} = this.state;
        await backend.get(`favorites?limit=${limit}&offset=${offset}`)
            .then(res => {
                const result = res.data.shows;
                this.setState({
                    shows: shows.concat(result),
                    offset: offset + limit,
                    hasMore: result.length >= 20,
                    show: !show ? result[0] : show
                });
            }).catch(err => console.log(err.response.data))

    };

    handleShowClick = async (id) => {
        const show = await api.get(`shows/${id}`);
        this.setState({show});
    };

    handleSaveClick = async (id) => {
        let {removed} = this.state;
        const url = removed.includes(id) ? 'addFavorite/' : 'removeFavorite/';
        await backend.post(url + id).then(res => {
            this.props.updateShows(res.data.shows_count);
        });
        removed = removed.includes(id) ? removed.filter(el => el !== id) : removed.concat(id);
        this.setState({removed});
    };

    render() {
        const {show, removed, shows} = this.state;
        const result = shows.map((show, i) => (
            <div key={i} className={"Main"} onClick={() => this.handleShowClick(show.id)}
                 style={{cursor: "pointer"}}>
                {show.name}
            </div>
        ));
        let showView = null;
        if (show) {
            showView = <Show clicked={() => this.handleSaveClick(show.id)} {...this.props} show={show}/>;
        }

        return (
            <div className={"Main"}>
                <Grid container spacing={2}>
                    <Grid item lg={4} style={{overflowY: "scroll", height: "500px"}}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadShows}
                            hasMore={this.state.hasMore}
                            loader={<Spinner key={0}/>}
                            useWindow={false}
                            initialLoad={false}
                        >
                            {result}
                        </InfiniteScroll>
                    </Grid>
                    <Grid item lg={6}>
                        {showView}
                    </Grid>
                    {showView ? (
                        <Grid item lg={2}>
                            <Button onClick={() => this.handleSaveClick(show.id)} variant={"contained"}
                                    color={"inherit"}>
                                <Favorite color={removed.includes(show.id) ? "disabled" : "primary"}/>
                            </Button>
                        </Grid>
                    ) : null}

                </Grid>
            </div>
        );
    }
}

export default connect(null, {updateShows})(Favorites);