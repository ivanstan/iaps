import React from 'react';
import { Map } from './components/Map';
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import Polygon from "react-google-maps/lib/components/Polygon";

class App extends React.Component {

  private static RESOLUTION = 12000;

  public state = {
    data: [],
    zoom: 8,
    radius: 24,
    state: []
  }

  async componentDidMount() {

    const array: any[] = []

    // let data: any = await fetch('http://127.0.0.1:8000/')
    // data = await data.json()
    // for (let i in data) {
    //   array.push({
    //     location: new google.maps.LatLng(data[i].latitude, data[i].longitude),
    //     weight: data[i].value
    //   })
    // }

    let state: any = await fetch('/serbia.geojson');
    state = await state.json()
    let coords: any = [];
    state.features[0].geometry.coordinates[0][0].map((coord: any) => coords.push({lat: coord[1], lng: coord[0]}));

    this.setState({
      data: array,
      zoom: 8,
      state: coords
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
        <Polygon
          path={this.state.state}
          options={{
            strokeColor: '#000',
            strokeWeight: 5
          }}
        />
      </Map>
    );
  }
}

export default App;
