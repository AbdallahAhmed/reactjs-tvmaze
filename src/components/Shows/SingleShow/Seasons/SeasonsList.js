import React, {Component} from 'react';
import axios from '../../../../axios';
import Button from "@material-ui/core/Button";
import Season from "./Season";

class SeasonsList extends Component {

    state = {
        id: this.props.match.params.id,
        seasons: [],
        currentSeasonId: this.props.match.params.season_id,
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
            })
    };

    render() {
        var list = "";
        var seasons = this.state.seasons;
        var seasonsList = "Loading...!";
        if (!this.state.loading && seasons.length && seasons[0].premiereDate) {
            list = seasons.map((season, i) => {
                if (season.premiereDate) {
                    return (
                        <Button href={"#" + (+i + 1)} key={season.id}>
                            Season {season.number}
                        </Button>
                    )
                }
                return "";
            });
            seasonsList = seasons.map((season, i) => {
                    if (season.premiereDate)
                        return (<Season index={i + 1} style={{paddingTop: 16}} key={season.id} season={season}/>)
                    return "";
                }
            );
        } else {
            list = "No Episodes Yet!"
        }


        return (
            <div>
                {/*<Route path="/show/:id/seasons/:season_id" exact component={Season}/>*/}
                <div>
                    {list}
                </div>
                {seasonsList}
            </div>
        );
    }
}

export default SeasonsList;
/*

seasons navbar

seasons*/
