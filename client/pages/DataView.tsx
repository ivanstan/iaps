import React from "react"
import {Map} from "../components/Map"
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer"
import SideBar from "../components/SideBar"
import {KeyboardDatePicker,} from '@material-ui/pickers'
import {If} from "react-if"
import {DataSource} from "../services/DataSource"
import moment from "moment";
import Legend from "../components/Legend"
import {
  getLegendStep,
  getPositionFromParam,
  getSourceNameFromUrl,
  mapCenter,
  meterPerPixel,
  replaceUrl
} from "../services/util";
import {ColorUtil} from "../services/ColorUtil";
import styled from "styled-components";

const ColorDot = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 auto 10px;
  border-radius: 15px;
  background-color: ${props => props.color};
`;

export default class DataView extends React.Component<any, any> {

  private readonly sideBar: React.RefObject<any>
  private color: ColorUtil|null;

  constructor(props: any) {
    super(props)

    this.color = null;
    this.sideBar = React.createRef()
  }

  // Todo source from url

  public state: any = {
    source: getSourceNameFromUrl(),
    data: [],
    zoom: 8,
    radius: null,
    legend: [],
    open: false,
    created: moment(),
    target: moment(),
    position: null,
    info: {},
    current: {},
  }

  shouldComponentUpdate = (nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean => {

    if (nextProps.location.pathname !== this.props.location.pathname) {
      return true
    }

    if (nextProps.location.search !== this.props.location.search) {
      return true
    }

    if (nextState.position !== this.state.position) {
      return true
    }

    if (nextState !== this.state) {
      return true
    }

    return false
  };

  static getDerivedStateFromProps(props: any, state: any) {
    const {match} = props

    const params = new URLSearchParams(props.location.search);

    return {
      // target: moment(params.get('target') ? params.get('target') : moment()),
      // created: moment(params.get('created') ? params.get('created') : moment()),
      source: match.params.source
    }
  }

  componentDidMount = async () => {
    await this.dataSourceChange()
  }

  dataSourceChange = async () => {
    const {zoom, source} = this.state

    let dataSource = new DataSource(source)
    const info: any = await dataSource.info()

    let state: any = {
      info: info,
      radius: info.resolution / meterPerPixel(zoom, mapCenter.lat),
      position: getPositionFromParam(this.props.location),
    }

    if (Object.keys(info.available).length > 0) {
      const keys = Object.keys(info.available)

      state['createdMax'] = moment(keys[0])
      state['createdMin'] = moment(keys[keys.length - 1])

      state['created'] = moment(info.available[keys[0]][0].created)
      state['target'] = moment(info.available[keys[0]][0].target)
    }

    this.color = new ColorUtil(info['name'], info['maxValue'])

    await this.setState(state)

    await this.setTargetRestriction()
    await this.getRemoteData()
  }

  componentDidUpdate = async (prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) => {
    const {source} = this.state

    if (source !== prevState.source) {
      await this.dataSourceChange()
    }
  };

  onDateChange = async (prop: string, value: any) => {
    let state: any = {}
    state[prop] = value.endOf('month')

    // todo remove
    await this.setState(state)
    await this.getRemoteData()

    let params: any = {}
    params[prop] = value.endOf('month').format('YYYY-MM-DD')
    replaceUrl(params)

    if (prop === 'created') {
      await this.setTargetRestriction()
    }
  }

  setTargetRestriction = () => {
    const {info, created} = this.state

    if (!info.hasOwnProperty('available')) {
      return
    }

    const range = info.available[created.format('YYYY-MM-DD')]

    const state: any = {}
    state['targetMax'] = moment(range[0].target)
    state['targetMin'] = moment(range[range.length - 1].target)

    this.setState(state)
  }

  getRemoteData = async () => {
    const {created, target, source} = this.state;
    let dataSource = new DataSource(source)

    const array: any[] = []
    let data: any = await dataSource.data(created.format('YYYY-MM-DD'), target.format('YYYY-MM-DD'))

    this.setState({
      data: data,
    })
  }

  onZoomChange = (meterPerPixel: number) => {
    const {info} = this.state

    this.setState({
      radius: info.resolution / meterPerPixel
    })
  }

  onClick = async (postion: any) => {

    if (!postion) {
      return null
    }

    const {created, target, source} = this.state;

    let dataSource = new DataSource(source)
    let data = await dataSource.point(postion, created.format('YYYY-MM-DD'), target.format('YYYY-MM-DD'))

    this.setState({open: true, position: postion, current: data})

    replaceUrl({
      '@': postion.lat + ',' + postion.lng
    })

    if (this.sideBar.current) {
      this.sideBar.current.open()
    }
  }

  render() {
    const {createdMin, createdMax, targetMin, targetMax, current, info} = this.state

    if (!this.color) {
      // todo return loader
      return null
    }

    // @ts-ignore
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
              data: this.state.data,
              maxIntensity: info.maxValue,
              gradient: this.color.getGradient(),
            }}
          />
        </Map>

        <SideBar open={this.state.open} ref={this.sideBar}>

          <KeyboardDatePicker
            margin="normal"
            id="created-picker-dialog"
            label="Prognoza iz"
            format="MM/yyyy"
            views={["month", "year"]}
            value={this.state.created}
            onChange={(param) => this.onDateChange('created', param)}
            maxDate={createdMax}
            minDate={createdMin}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

          <KeyboardDatePicker
            margin="normal"
            id="target-picker-dialog"
            label="Prognoza za"
            format="MM/yyyy"
            views={["month", "year"]}
            value={this.state.target}
            maxDate={targetMax}
            minDate={targetMin}
            onChange={(param) => this.onDateChange('target', param)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

          <div style={{flexGrow: 1}}/>

          <If condition={this.state.current}>
            <div>
              <ColorDot color={this.color.getColor(current.value)}/>
              <div className={'current-value'}>
                {current.value} <If condition={current.value}>{info.unit}</If>
              </div>
            </div>
          </If>

          <div style={{flexGrow: 1}}/>

          <If condition={this.state.position}>
            <span className={'current-position'}>
              {`Izabrana lokacija: ${this.state.position?.lat.toFixed(2)}°, ${this.state.position?.lng.toFixed(2)}°`}
            </span>
          </If>

          <Legend maxIntensity={info.maxValue} gradient={this.color.getGradient()} step={getLegendStep(info.name)}/>
        </SideBar>
      </>
    )
  }
}
