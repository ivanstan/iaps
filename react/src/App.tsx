import React from 'react';
import { Map } from './components/Map';
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

class App extends React.Component {

  private static RESOLUTION = 12000;

  public state = {
    data: [],
    zoom: 8,
    radius: 24,
  }

  async componentDidMount() {
    let data: any = await fetch('http://127.0.0.1:8000/')

    data = await data.json()

    const array: any[] = []
    for (let i in data) {
      array.push({
        location: new google.maps.LatLng(data[i].latitude, data[i].longitude),
        weight: data[i].value
      })
    }

    this.setState({
      data: array,
      zoom: 8,
    })
  }

  onZoomChange = (meterPerPixel: number) => {
    this.setState({
      radius: App.RESOLUTION / meterPerPixel
    })
  }

  render() {
    return (
      <Map containerElement={<div/>}
           mapElement={<div style={{ height: window.innerHeight - 15, width: window.innerWidth - 15 }}/>}
           onZoomChange={this.onZoomChange}
      >
        <HeatmapLayer
          options={{ radius: this.state.radius, opacity: .4, data: this.state.data }}
        />
      </Map>
    );
  }
}

export default App;
