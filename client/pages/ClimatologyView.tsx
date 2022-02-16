import React from "react";
import {Map} from "../components/Map";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import SideBar from "../components/SideBar";
import {ColorUtil} from "../services/ColorUtil";
import {ClimatologyService} from "../services/ClimatologyService";
import {mapCenter, meterPerPixel} from "../services/util";
import {If} from "react-if";
import {ClimatologyDetailsTable} from "../components/ClimatologyDetailsTable";
import {FormControl, MenuItem, Select} from "@material-ui/core";
import {PageLoader} from "../components/PageLoader";

export default class ClimatologyView extends React.Component<any, any> {

  private readonly sideBar: React.RefObject<any>
  private color: ColorUtil | null = null;
  private service: ClimatologyService;

  state: any = {
    source: null,
    info: null,
    subSource: 'avg_year',
    open: false,
    position: null,
    map: [],
    radius: 0,
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

    console.log(info?.resolution);

    this.setState({
      radius: info?.resolution / meterPerPixel
    })
  }

  onClick = async (latLng: any) => {
    this.setState({
      position: latLng,
      open: true,
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

  onSubSourceChange = (event: any) => {
    this.setState({
      subSource: event.target.value,
    },  this.onChange)
  }

  render() {
    if (!this.color) {
      return <PageLoader/>
    }

    return (
      <>
        <If condition={this.state.map.length === 0}>
          <PageLoader/>
        </If>
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
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.subSource}
              label="Age"
              onChange={this.onSubSourceChange}
            >
              <MenuItem value={'avg_year'}>Godina</MenuItem>
              <MenuItem value={'avg_vegetation'}>Vegetacija</MenuItem>
              <MenuItem value={'avg_jan'}>Januar</MenuItem>
              <MenuItem value={'avg_feb'}>Februar</MenuItem>
              <MenuItem value={'avg_mar'}>Mart</MenuItem>
              <MenuItem value={'avg_apr'}>April</MenuItem>
              <MenuItem value={'avg_may'}>Maj</MenuItem>
              <MenuItem value={'avg_jun'}>Jun</MenuItem>
              <MenuItem value={'avg_jul'}>Jul</MenuItem>
              <MenuItem value={'avg_aug'}>Avgust</MenuItem>
              <MenuItem value={'avg_sep'}>Septembar</MenuItem>
              <MenuItem value={'avg_oct'}>Oktobar</MenuItem>
              <MenuItem value={'avg_nov'}>Novembar</MenuItem>
              <MenuItem value={'avg_dec'}>Decembar</MenuItem>

            </Select>
          </FormControl>

          <If condition={Boolean(this.state.current)}>
            <ClimatologyDetailsTable data={this.state.current}/>
          </If>
        </SideBar>
      </>
    )
  }
}
