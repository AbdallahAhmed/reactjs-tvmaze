import React, {Component} from 'react';
import axios from '../../../../axios';
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";

class List extends Component {

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
            })
    };

    render() {
        var list = (
            <div style={{flexGrow: 1, padding: '2%'}}>
                <LinearProgress variant="query" />
            </div>
        );
        var seasons = this.state.seasons;
        if (!this.state.loading && seasons.length) {
            list = seasons.map((season, i) => {
                if (season.premiereDate) {
                    return (
                        <Button style={{marginLeft: 4}} color="primary" onClick={() => {
                            this.props.history.push({
                                pathname: '/show/' + this.state.id + '/seasons/' + season.number
                            })
                        }
                        } key={season.id}>
                            Season {season.number}
                        </Button>
                    )
                }
                return "";
            });
        } else if (this.state.loading) {
            list = (
                <div style={{flexGrow: 1, padding: '2%'}}>
                    <LinearProgress variant="query"/>
                </div>
            );
        }
        return list;
    }
}

export default List;