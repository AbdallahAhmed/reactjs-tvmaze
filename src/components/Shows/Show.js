import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Show extends Component{
    state = {
        show: this.props.show
    };

    onNavigateHandler = () => {
        this.props.history.push({
            pathname: '/show/' + this.state.show.id
        });
    };

    render(){
        var image = this.state.show.image;
        image = image && image.original ? image.original : "//static.tvmaze.com/images/no-img/no-img-portrait-text.png";
        var summary = this.state.show.summary;
        summary = summary ? this.state.show.summary.replace(/<[^>]+>/g, '') : ""
        return (
            <div>
                {this.state.show ? (
                    <Card>
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
                                {summary.substring(0, 150) + "..."}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button color={"primary"} onClick={this.onNavigateHandler}>
                                Go to show
                            </Button>
                        </CardActions>
                    </Card>
                ) : ""}
            </div>
        )
    };
}


export default Show;