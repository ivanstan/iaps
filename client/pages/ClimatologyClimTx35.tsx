import React from "react";
import {Map} from "../components/Map";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import {ColorUtil} from "../services/ColorUtil";
import {ClimatologyService} from "../services/ClimatologyService";
import {getLegendStep, mapCenter, meterPerPixel} from "../services/util";
import SideBar from "../components/SideBar";
import {FormControl} from "@material-ui/core";
import {If} from "react-if";
import Legend from "../components/Legend";

export default class ClimatologyClimTx35 extends React.Component<any, any> {

  private readonly sideBar: React.RefObject<any>
  private color: ColorUtil;
  private service: ClimatologyService;

  state: any = {
    position: null,
    source: 'sclim_tx35',
    map: [],
    radius: 0,
    zoom: 8,
    info: {
      maxValue: 30,
      resolution: 16000,
    },
  }

  constructor(props: any) {
    super(props)

    this.sideBar = React.createRef()
    this.service = new ClimatologyService()
    this.color = new ColorUtil(this.state.source, this.state.info.maxValue);
  }

  componentDidMount = async () => {
    await this.onChange()
  }

  onChange = async () => {
    let response: any = (await this.service.getClimatologyMap(this.state.source));

    this.setState({
      radius: this.state.info.resolution / meterPerPixel(this.state.zoom, mapCenter.lat),
      map: response.data
    });

    if (this.state.open && this.state.position !== null) {
      await this.onClick(this.state.position)
    }
  }

  onClick = async (latLng: any) => {
    this.setState({
      position: latLng,
      open: true,
    })
  }

  onZoomChange = (meterPerPixel: number) => {
    const {info} = this.state

    this.setState({
      radius: info?.resolution / meterPerPixel
    })
  }

  render() {
    let step = getLegendStep(this.state.source);

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
              maxIntensity: this.state.info.maxValue,
              gradient: this.color.getGradient(),
            }}
          />
        </Map>

        <SideBar open={this.state.open} ref={this.sideBar}>
          <FormControl fullWidth>

          </FormControl>

          <div style={{flexGrow: 1}}/>

          <If condition={this.state.position}>
            <span className={'current-position'}>
              {`Izabrana lokacija: ${this.state.position?.lat.toFixed(2)}°, ${this.state.position?.lng.toFixed(2)}°`}
            </span>
          </If>

          <Legend maxIntensity={this.state.info.maxValue} gradient={this.color.getGradient()} step={step}/>
        </SideBar>

      </>
    )
  }

}
