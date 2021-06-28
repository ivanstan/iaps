import React from "react"
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps"
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

interface MapPropsInterface {
  zoom?: number
}

interface MapStateInterface {
  zoom: number,
  data: any[],
  radius: number,
}

class CustomGoogleMap extends React.Component<MapPropsInterface, MapStateInterface> {

  private static RESOLUTION = 12000;

  public state = {
    data: [],
    zoom: 8,
    radius: 24,
  }

  private _map: any

  async componentDidMount() {
    let data: any = await fetch('/data.json')
    data = await data.json()

    const array: any[] = []
    for (let i in data) {
      array.push({
        location: new google.maps.LatLng(data[i].latitude, data[i].longitude),
        weight: data[i].temperature
      })
    }

    this.setState({
      data: array,
      zoom: this.props.zoom || 8,
    })
  }

  onZoomChange = () => {
    this.setState({
      zoom: this._map.getZoom(),
      radius: this.getHeatMapRadius(CustomGoogleMap.RESOLUTION),
    });
  };

  getHeatMapRadius(resolution: number) {
    const latitude = this._map.getCenter().lat()
    const meterPerPixel = 156543.03392 * Math.cos(latitude * Math.PI / 180) / Math.pow(2, this._map.getZoom());

    return resolution / meterPerPixel;
  }

  render() {
    let { zoom, radius } = this.state

    return (
      <GoogleMap
        ref={(map) => this._map = map}
        onZoomChanged={this.onZoomChange}
        defaultZoom={zoom}
        defaultCenter={{ lat: 44.8125, lng: 20.4612 }}
      >
        {this.props.children}
        <HeatmapLayer
          data={this.state.data}
          options={{ radius: radius, opacity: .4 }}
        />
      </GoogleMap>
    )
  }
}

export const Map = withScriptjs(withGoogleMap(CustomGoogleMap))
