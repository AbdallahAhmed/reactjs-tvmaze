import React, {Component} from 'react';
import axios from '../../../../axios';
import Season from "./Season";

class SeasonEpisodes extends Component {

    state = {
        id: this.props.match.params.id,
        seasons: [],
        loading: true,
    };

    componentDidMount() {
        this.getSeasons();
    }

    getSeasons = () => {
        const id = this.state.id;
        axios.get('shows/' + id + '/seasons')
            .then(response => {
                this.setState({
                    seasons: response.data,
                    loading: false,
                });
            }).catch(() => this.props.history.push('/'));
    };

    render() {
        var seasons = this.state.seasons;
        var seasonsList = "Loading...!";
        if (!this.state.loading && seasons.length) {
            seasonsList = seasons.map((season, i) => {
                    if (season.premiereDate && (+season.number === +this.props.match.params.season_id))
                        return (
                            <Season
                                {...this.props}
                                index={i + 1}
                                style={{paddingTop: 16}}
                                key={season.id}
                                season={season}/>
                        );
                    return "";
                }
            );
        }

        return seasonsList;
    }
}

export default SeasonEpisodes;
/*

seasons navbar

seasons*/
