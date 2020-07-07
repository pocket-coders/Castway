'use strict';

const e = React.createElement

class Index extends React.Component {
  render() {
    return e(
      <div>
       <h1>This is a NodeJS Typescript Server, configured with Yarn and serving React 😀</h1>
      </div>
    );
  }
}

const container = document.querySelector('#index-container');
ReactDOM.render(e(index), container)