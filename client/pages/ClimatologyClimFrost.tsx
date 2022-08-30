import React from "react";
import {Map} from "../components/Map";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import {ColorUtil} from "../services/ColorUtil";
import {ClimatologyService} from "../services/ClimatologyService";
import {getLegendStep, mapCenter, meterPerPixel} from "../services/util";
import SideBar from "../components/SideBar";
import {CircularProgress, FormControl} from "@material-ui/core";
import {If} from "react-if";
import Legend from "../components/Legend";
import {Table} from "../components/ClimatologyDetailsTable";

export default class ClimatologyClimFrost extends React.Component<any, any> {

  private readonly sideBar: React.RefObject<any>
  private color: ColorUtil;
  private service: ClimatologyService;

  state: any = {
    loading: true,
    position: null,
    source: 'sclim_frost',
    map: [],
    radius: 0,
    zoom: 8,
    info: {
      maxValue: 350,
      resolution: 17000,
    },
    table: null,
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
      loading: true,
    })

    let result = null;

    if (this.state.position) {
      const result = this.service.getPointMultiple(['clim_frost', 'clim_frsks', 'clim_tn0'], this.state.position).then(results => {
        this.setState({
          loading: false,
          table: results,
        })
      })
    } else {
      this.setState({
        loading: false,
        table: null,
      })
    }
  }

  onZoomChange = (meterPerPixel: number) => {
    const {info} = this.state

    this.setState({
      radius: info?.resolution / meterPerPixel
    })
  }

  render() {
    let step = getLegendStep(this.state.source);
    let { table } = this.state;

    console.log(table);

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
            <If condition={this.state.loading}>
              <CircularProgress style={{margin: 'auto'}}/>
            </If>

            <If condition={table}>
              <Table>
                <thead>
                <tr>
                  <th>°C</th>
                  <th>Srednja vrednost</th>
                  <th>Najverovatnija vrednost (medijana)</th>
                  <th colSpan={2}>Najverovatniji opseg vrednosti</th>
                  <th colSpan={2}>Mogući opseg vrednosti</th>
                </tr>
                <tr>
                  <th/>
                  <th/>
                  <th/>
                  <th>25. percentil</th>
                  <th>75. percentil</th>
                  <th>10. percentil</th>
                  <th>90. percentil</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Broj dana sa Tmin&lt; 0°C</th>
                  </tr>
                  <tr>
                    <th>Mart</th>
                  </tr>
                  <tr>
                    <th>April</th>
                  </tr>
                  <tr>
                    <th>Maj</th>
                  </tr>
                  <tr>
                    <th>Ukupno</th>
                  </tr>
                  <tr/>
                  <tr/>
                  <tr>
                    <th>Datum poslednjeg prolećnog mraza</th>
                  </tr>
                  <tr>
                    <th>Datum prvog jesenjeg mraza</th>
                  </tr>
                  <tr>
                    <th>Dužina bezmraznog perioda</th>
                  </tr>
                  <tr/>
                  <tr/>
                  <tr>
                    <th colSpan={2}/>
                    <th>RIZIK %</th>
                    <th>KATEGORIJA</th>
                    <th/>
                    <th>RIZIK %</th>
                    <th>KATEGORIJA</th>
                  </tr>
                  <tr>
                    <th colSpan={2}>kajsija, breskva</th>
                    <td></td>
                    <td></td>
                    <th>kukuruz</th>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th colSpan={2}>trešnje, višnje, šljive, vinova loza</th>
                    <td></td>
                    <td></td>
                    <th>šećerna repa</th>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th colSpan={2}>jabuke, kruške, dunje</th>
                    <td></td>
                    <td></td>
                    <th>soja</th>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </If>
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
