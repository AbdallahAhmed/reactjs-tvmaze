import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Img from "../Layouts/UI/Img";
import {NavLink} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {connect} from "react-redux";


const Show = (props) => {
    let {image, summary, name, title, id} = props.show;
    image = image && image.original ? image.original : "//static.tvmaze.com/images/no-img/no-img-portrait-text.png";
    summary = summary ? summary.replace(/<[^>]+>/g, '') : "";
    let [color, setColor] = useState(props.isAuth && props.favorites_ids.includes(id));
    return (
        <div style={{display: "block"}}>
            {props.show ? (
                <Card>
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
                        {props.isAuth
                            && <IconButton onClick={() => {
                                props.clicked();
                                setColor(!color);
                            }} aria-label="add to favorites">
                                <FavoriteIcon
                                    color={color ? "secondary" : "inherit"}/>
                            </IconButton>
                            }
                    </CardActions>
                </Card>
            ) : ""}
        </div>
    )
};
const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth(),
        shows_ids: state.auth.isAuth() ? state.auth.user.shows_ids : []
    }
};

export default connect(mapStateToProps)(Show);