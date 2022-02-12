import React from "react";
import {Map} from "../components/Map";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import SideBar from "../components/SideBar";
import {ColorUtil} from "../services/ColorUtil";
import {ClimatologyService} from "../services/ClimatologyService";
import {mapCenter, meterPerPixel} from "../services/util";
import {If} from "react-if";
import {ClimatologyDetailsTable} from "../components/ClimatologyDetailsTable";

export default class ClimatologyView extends React.Component<any, any> {

  private readonly sideBar: React.RefObject<any>
  private color: ColorUtil | null = null;
  private service: ClimatologyService;

  state: any = {
    source: null,
    info: null,
    subSource: 'med_jan',
    open: false,
    position: null,
    map: [],
    radius: 14,
    zoom: 8,
    current: null,
  }

  constructor(props: any) {
    super(props)

    this.sideBar = React.createRef()
    this.service = new ClimatologyService()
  }

  componentDidMount = async () => {
    await this.onChange()
  }

  onChange = async () => {
    this.color = new ColorUtil(this.props.match.params.source, 100)

    let response: any = (await this.service.getMap(this.props.match.params.source, this.state.subSource));

    console.log(response)

    this.setState({
      info: response.info,
      radius: response.info.resolution / meterPerPixel(this.state.zoom, mapCenter.lat),
      map: response.data
    });

    if (this.state.open && this.state.position !== null) {
      await this.onClick(this.state.position)
    }
  }

  onZoomChange = (meterPerPixel: number) => {
    const {info} = this.state

    this.setState({
      radius: info?.resolution / meterPerPixel
    })
  }

  onClick = async (latLng: any) => {
    this.setState({
      position: latLng
    })

    if (latLng) {
      let data = await this.service.getPoint(this.props.match.params.source, latLng)

      if (data.value) {
        this.setState({
          current: data
        })
      }
    }
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
          <HeatmapLayer
            options={{
              radius: this.state.radius,
              opacity: .4,
              data: this.state.map,
              gradient: this.color.getGradient(),
            }}
          />
        </Map>

        <SideBar open={this.state.open} ref={this.sideBar}>
          <If condition={Boolean(this.state.current)}>
            <ClimatologyDetailsTable data={this.state.current}/>
          </If>
        </SideBar>
      </>
    )
  }
}
