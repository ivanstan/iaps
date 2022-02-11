import React from "react";
import {Map} from "../components/Map";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import SideBar from "../components/SideBar";
import {ColorUtil} from "../services/ColorUtil";

export default class ClimatologyView extends React.Component<any, any> {

  private readonly sideBar: React.RefObject<any>
  private color: ColorUtil|null = null;

  state = {
    source: null,
    open: false,
    position: null,
  }

  constructor(props: any) {
    super(props)

    this.sideBar = React.createRef()

    this.onChange()
  }

  componentDidMount = async () => {

  }

  onChange = async () => {
    this.color = new ColorUtil(this.props.match.params.source, 100)
  }

  onZoomChange = (meterPerPixel: number) => {
    const {info} = this.state

    this.setState({
      radius: info.resolution / meterPerPixel
    })
  }

  onClick = () => {

  }

  render() {
    if (!this.color) {
      // todo return loader
      return null
    }

    return (
      <>
        <Map containerElement={<div style={{height: window.innerHeight - 64, width: '100%'}}/>}
             mapElement={<div style={{height: '100%'}}/>}
             onZoomChange={this.onZoomChange}
             onClick={this.onClick}
             position={this.state.position}
        >
          {/*<HeatmapLayer*/}
          {/*  options={{*/}
          {/*    radius: this.state.radius,*/}
          {/*    opacity: .4,*/}
          {/*    data: this.state.data,*/}
          {/*    // maxIntensity: info.maxValue,*/}
          {/*    gradient: this.color.getGradient(),*/}
          {/*  }}*/}
          {/*/>*/}
        </Map>

        <SideBar open={this.state.open} ref={this.sideBar}>

        </SideBar>
      </>
    )
  }
}
