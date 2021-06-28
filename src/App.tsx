import React from 'react';
import { Map } from './components/Map';

class App extends React.Component {
  render() {
    return (
      <Map containerElement={<div/>}
           mapElement={<div style={{ height: window.innerHeight - 15, width: window.innerWidth - 15 }}/>}
           googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyCoPqCC8XT2kwShwfCms3xk6JE2d-LT9_o&libraries=visualization'}
           loadingElement={<div style={{ height: `100%` }}/>}
      />
    );
  }
}

export default App;
