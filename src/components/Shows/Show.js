import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Img from "../Layouts/UI/Img";
import {NavLink} from "react-router-dom";

const Show = (props) => {
    let {image, summary, name, title, id} = props.show;
    image = image && image.original ? image.original : "//static.tvmaze.com/images/no-img/no-img-portrait-text.png";
    summary = summary ? summary.replace(/<[^>]+>/g, '') : ""
    return (
        <div>
            {props.show ? (
                <Card>
                    {/*<CardMedia style={{
                        height: 0,
                        paddingTop: '50%'
                    }}
                               image={image}
                               title={props.show.title}
                    />*/}
                    <Img
                        style={{
                            height: 300,
                            width: "100%",
                            margin: "auto",
                            display: "block"
                        }}
                        src={image}
                        title={title}
                    />
                    <CardContent>
                        <Typography gutterBottom style={{fontWeight: "bold"}} component="h1">
                            {name}
                        </Typography>
                        <Typography component="p">
                            {summary.substring(0, 150) + "..."}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <NavLink color={"primary"}
                                 style={{textDecoration: "none"}}
                                 to={'/show/' + id}
                        >
                            Go to show
                        </NavLink>
                    </CardActions>
                </Card>
            ) : ""}
        </div>
    )
};


export default Show;