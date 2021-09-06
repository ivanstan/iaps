import React from "react"
import { GoogleMap, withGoogleMap } from "react-google-maps"
import { If } from "react-if";
import Marker from "react-google-maps/lib/components/Marker";
import { styles } from "../styles";
import { mapCenter, meterPerPixel } from "../services/util";

interface MapPropsInterface {
  zoom?: number
  onZoomChange?: Function
  onClick?: Function
}

const Position = new google.maps.MarkerImage(
  './marker.png',
  null,
  null,
  new google.maps.Point(15, 15),
  new google.maps.Size(30, 30)
)


class CustomGoogleMap extends React.Component<MapPropsInterface> {

  private _map: any

  public readonly state = {
    position: null
  }

  protected getHtml5Geolocation = (defaultValue: any): Promise<any> => {
    if (!navigator.geolocation) {
      return new Promise(resolve => resolve(defaultValue))
    }

    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition((position => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }), () => {
        resolve(defaultValue)
      })
    })
  }

  onZoomChange = () => {
    const { onZoomChange } = this.props
    const latitude = this._map.getCenter().lat()

    if (onZoomChange) {
      onZoomChange(meterPerPixel(this._map.getZoom(), latitude), this._map.getZoom())
    }
  }

  onClick = async (event: any) => {
    let lat = event.latLng.lat()
    let lng = event.latLng.lng()

    const { onClick } = this.props

    this.setState({ position: { lat: lat, lng: lng } });

    if (onClick) {
      onClick({ lat: lat, lng: lng })
    }
  }

  componentDidMount() {
    this.getHtml5Geolocation(null).then(position => {
      this.setState({ position: position })

      if (this._map) {
        this._map.setState({
          center: position
        });
      }

      const { onClick } = this.props

      if (onClick) {
        onClick(position)
      }
    });
  }

  render() {
    let { zoom, children } = this.props

    return (
      <GoogleMap
        ref={(map) => this._map = map}
        onZoomChanged={this.onZoomChange}
        defaultZoom={zoom || 8}
        defaultCenter={mapCenter}
        onClick={this.onClick}
        options={{
          // styles: styles,
          minZoom: 7,
          restriction: {
            latLngBounds: {
              north: 50,
              south: 38,
              west: 10,
              east: 40
            }
          },
        }}
      >
        {children}
        <If condition={this.state.position}>
          <Marker position={this.state.position} icon={Position}/>
        </If>
      </GoogleMap>
    )
  }
}

export const Map = withGoogleMap(CustomGoogleMap)
