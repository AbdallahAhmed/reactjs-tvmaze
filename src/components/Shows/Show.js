import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Show = (props) => {
    let {image, summary} = props.show;
    image = image && image.original ? image.original : "//static.tvmaze.com/images/no-img/no-img-portrait-text.png";
    summary = summary ? summary.replace(/<[^>]+>/g, '') : ""
    return (
        <div>
            {props.show ? (
                <Card>
                    <CardMedia style={{
                        height: 0,
                        paddingTop: '50%'
                    }}
                               image={image}
                               title={props.show.title}
                    />
                    <CardContent>
                        <Typography gutterBottom style={{fontWeight: "bold"}} component="h1">
                            {props.show.name}
                        </Typography>
                        <Typography component="p">
                            {summary.substring(0, 150) + "..."}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color={"primary"} onClick={() => {
                            props.history.push({
                                pathname: '/show/' + props.show.id
                            });
                        }}>
                            Go to show
                        </Button>
                    </CardActions>
                </Card>
            ) : ""}
        </div>
    )
}


export default Show;