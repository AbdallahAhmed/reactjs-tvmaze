import React, {Component} from 'react';
import axios from '../../../../axios';
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Season from "./Season";

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
            list = seasons.map(season => {
                if (season.premiereDate) {
                    return (
                        <ExpansionPanel key={season.id}  square>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography >Season {season.number}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Season {...this.props} show_id={this.state.id} season={season}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

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