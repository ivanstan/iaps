import React from "react"
import { GoogleMap, withGoogleMap } from "react-google-maps"

interface MapPropsInterface {
  zoom?: number
  onZoomChange?: Function
}

class CustomGoogleMap extends React.Component<MapPropsInterface> {

  private _map: any

  onZoomChange = () => {
    const { onZoomChange } = this.props
    const latitude = this._map.getCenter().lat();

    const meterPerPixel = 156543.03392 * Math.cos(latitude * Math.PI / 180) / Math.pow(2, this._map.getZoom());

    if (onZoomChange) {
      onZoomChange(meterPerPixel, this._map.getZoom())
    }
  };

  render() {
    let { zoom, children } = this.props

    return (
      <GoogleMap
        ref={(map) => this._map = map}
        onZoomChanged={this.onZoomChange}
        defaultZoom={zoom || 8}
        defaultCenter={{ lat: 44.8125, lng: 20.4612 }}
      >
        {children}
      </GoogleMap>
    )
  }
}

export const Map = withGoogleMap(CustomGoogleMap)
