import React, {Component} from 'react';
import axios from "../../axios";
import Search from '../Layouts/Search/Search'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

class ShowDetails extends Component {

    state = {
        show: null
    };

    componentDidMount() {
        this.loadShow();
    }

    componentDidUpdate(){
        this.loadShow();
    }

    loadShow() {
        const id = this.props.match.params.id;
        if ( id ) {
            if ( !this.state.show || (this.state.show && this.state.show.id !== +id) ) {
                axios.get('/shows/' + id)
                    .then(response => {
                        /*console.log(response.data);*/
                        this.setState({show: response.data});
                        console.log(response.data)
                    });
            }
        }
    }

    render() {
        var show = "Loading";
        if (this.state.show) {
            var image = this.state.show.image;
            image = image && image.original ? image.original : "default";
            show = (
                        <Card style={{alignSelf: 'center', maxWidth: 345}}>
                            <CardMedia style={{
                                height: 0,
                                paddingTop: '50%'
                            }}
                                       image={image}
                                       title={this.state.show.title}
                            />
                            <CardContent>
                                <Typography gutterBottom style={{fontWeight: "bold"}} component="h1">
                                    {this.state.show.name}
                                </Typography>
                                <Typography component="p">
                                    {this.state.show.summary.replace(/<[^>]+>/g, '')}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={this.onNavigateHandler}>
                                    Go to show
                                </Button>
                            </CardActions>
                        </Card>
            );
        }
        return (
            <div>
                <Search {...this.props} options={[]} home={false}/>
                {show}
            </div>
        )
    }
}

export default ShowDetails;