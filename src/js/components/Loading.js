import React from 'react';

export default class Loading extends React.Component {
    render() {
        return <div style={styles.container}>
            <img className="loadingGif" src="/images/loading.gif"/>
        </div>
    }
}

var styles = {
  container: {
      width: '100%',
      height: '100%',
  }
};