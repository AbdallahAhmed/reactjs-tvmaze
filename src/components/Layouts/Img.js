import React, {Component} from "react";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";

class Img extends Component {
    state = {loaded: false};

    onLoad = () => {
        this.setState({loaded: true});
    };

    render() {
        const {loaded} = this.state;
        let {src, title, style} = this.props;
        return (
            <div>
                {!loaded ? (
                    <div>
                        <div style={{flexGrow: 1, padding: '2%'}}>
                            <LinearProgress variant="query"/>
                        </div>
                        < img
                            src={src}
                            style={{display: "none"}}
                            alt={title}
                            onLoad={this.onLoad}
                        />
                    </div>

                ) : (
                    < img
                        src={src}
                        alt={title}
                        title={title}
                        style={style}
                    />
                )}

            </div>
        );
    }
}

export default Img