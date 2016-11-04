import React from 'react';

export default class Loading extends React.Component {
    render() {
        return(
            <div className="loadingBox">
                <i className="fa fa-cog fa-spin fa-4x fa-fw"></i>
                <span className="sr-only">Loading...</span>
            </div>
            )
    }
}