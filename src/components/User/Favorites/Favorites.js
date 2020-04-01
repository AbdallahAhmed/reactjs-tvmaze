import React, {Component} from 'react';
import './Style.css';
import {api, backend} from "../../../axios";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../Layouts/UI/Spinner/Spinner";
import {Favorite} from "@material-ui/icons";
import {connect} from "react-redux";
import {updateUserShows} from "../../../store/actions/index";
import ShowDetails from "./ShowDetails";

class Favorites extends Component {
    state = {
        shows: [],
        loading: true,
        limit: 20,
        offset: 0,
        hasMore: true,
        show: null,
    };

    componentDidMount() {
        this.loadShows();
    }

    loadShows = async () => {
        let {offset, limit, shows, show} = this.state;
        await backend.get(`favorites?limit=${limit}&offset=${offset}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                const result = res.data.shows;
                this.setState({
                    shows: shows.concat(result),
                    offset: offset + limit,
                    hasMore: result.length >= 20,
                    show: !show ? result[0] : show,
                    loading: false
                });
            }).catch(err => console.log(err.response.data))

    };

    handleShowClick = async (id) => {
        if (this.state.show.id !== id) {
            const show = await api.get(`shows/${id}`);
            this.setState({show});
        }
    };

    handleSaveClick = async (id) => {
        const url = !this.props.shows_ids.includes(id) ? 'addFavorite/' : 'removeFavorite/';
        const res = await backend.post(url + id, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        this.props.updateUserShows(res.data);
    };

    render() {
        const {show, shows, loading} = this.state;
        const result = shows.map((show, i) => (
            <div key={i} className={"Main"} onClick={() => this.handleShowClick(show.id)}
                 style={{cursor: "pointer"}}>
                {show.name}
            </div>
        ));
        let showView = null;
        if (show) {
            showView = (
                <Grid item lg={8}>
                    <Grid container>
                        <Grid item lg={11}>
                            <ShowDetails clicked={() => this.handleSaveClick(show.id)} {...this.props} show={show}/>
                        </Grid>
                        <Grid item lg={1}>
                            <Button onClick={() => this.handleSaveClick(show.id)} variant={"contained"}
                                    color={"inherit"}>
                                <Favorite color={this.props.shows_ids.includes(show.id) ? "primary" : "disabled"}/>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item lg={12}>
                        <ShowDetails clicked={() => this.handleSaveClick(show.id)} info {...this.props} show={show}/>
                    </Grid>
                </Grid>
            )
        }
        return (
            <div className={"Main"}>
                {!loading && !shows.length
                    ? <p>You Don't Have Any Favorite Shows Yet!</p>
                    : loading ? (<Spinner style={{fontSize: "8px", margin: "24px auto"}}/>)
                        : <Grid container spacing={2}>
                            <Grid item lg={4} md={12} sm={12} style={{overflowY: "scroll", height: "500px"}}>
                                <InfiniteScroll
                                    loadMore={this.loadShows}
                                    hasMore={this.state.hasMore}
                                    loader={<Spinner style={{fontSize: "8px", margin: "24px auto"}} key={0}/>}
                                    useWindow={false}
                                    initialLoad={false}
                                >
                                    {result}
                                </InfiniteScroll>
                            </Grid>
                            {showView}
                        </Grid>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        shows_ids: state.auth.user.shows_ids,
    }
};
export default connect(mapStateToProps, {updateUserShows})(Favorites);