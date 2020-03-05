import React, {Component} from 'react';
import Search from "./Layouts/Search/Search";
import MetaTags from "react-meta-tags";
import {TITLE} from "../index";

class Home extends Component {

    render() {
        const meta = (
            <MetaTags>
                <title>{TITLE}</title>
                <meta name="description"
                      content={"TVMaze Reactjs App"}/>
                <meta property="og:title" content={TITLE}/>
            </MetaTags>
        );
        return (
            <div>
                {meta}
                <Search {...this.props} home={true}/>
            </div>
        )
    }
}

export default Home;