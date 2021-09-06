import React from "react"
import { Map } from "../components/Map"
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer"
import Polygon from "react-google-maps/lib/components/Polygon"
import SideBar from "../components/SideBar"
import { KeyboardDatePicker, } from '@material-ui/pickers'
import { If } from "react-if"
import { DataSource } from "../services/DataSource"
import moment from "moment";
import Legend from "../components/Legend"

const options = {
  maintainAspectRatio: true,
  title: {
    display: true,
    text: 'Number of requests in last three days'
  },
  legend: {
    display: false,
  },
}

let data = {
  labels: [1, 2, 3, 4],
  datasets: [{
    label: 'Requests',
    data: [5, 10, 15, 20],
    borderWidth: 1,
    borderColor: '#25afb4',
    backgroundColor: '#25afb4',
  }]
}

const name = 'medT'

export default class DataView extends React.Component {

  private sideBar: React.RefObject<any>

  constructor(props: any) {
    super(props)

    this.sideBar = React.createRef()
  }

  private static RESOLUTION = 16000

  private static MAX_INTENSITY = 32

  private static GRADIENT = [
    "rgba(102, 255, 0, 0)",
    "rgba(102, 255, 0, 1)",
    "rgba(147, 255, 0, 1)",
    "rgba(193, 255, 0, 1)",
    "rgba(238, 255, 0, 1)",
    "rgba(244, 227, 0, 1)",
    "rgba(249, 198, 0, 1)",
    "rgba(255, 170, 0, 1)",
    "rgba(255, 113, 0, 1)",
    "rgba(255, 57, 0, 1)",
    "rgba(255, 0, 0, 1)"
  ]

  public state: any = {
    data: [],
    zoom: 8,
    radius: 24,
    state: [],
    legend: [],
    open: false,
    created: moment(),
    target: moment(),
    dimension: null,
    position: null,
    info: {},
    current: {},
  }

  async componentDidMount() {
    let dataSource = new DataSource(name)

    const info: any = await dataSource.info()

    let state: any = {
      zoom: 8,
      info: info,
    }

    if (Object.keys(info.available).length > 0) {
      const keys = Object.keys(info.available)

      state['createdMax'] = moment(keys[0])
      state['createdMin'] = moment(keys[keys.length - 1])

      state['created'] = moment(info.available[keys[0]][0].created)
      state['target'] = moment(info.available[keys[0]][0].target)
    }

    this.setState(state)

    await this.setTargetRestriction()
    await this.getRemoteData()

    // let state: any = await fetch('/serbia.geojson')
    // state = await state.json()
    // let coords: any = []
    // state.features[0].geometry.coordinates[0][0].map((coord: any) => coords.push({lat: coord[1], lng: coord[0]}))
  }

  onDateChange = async (prop: string, value: any) => {
    let state: any = {}
    state[prop] = value.endOf('month')

    await this.setState(state)
    await this.getRemoteData()

    if (prop === 'created') {
      await this.setTargetRestriction()
    }
  }

  setTargetRestriction = () => {
    const { info, created } = this.state

    if (!info.hasOwnProperty('available')) {
      return
    }

    const range = info.available[created.format('YYYY-MM-DD')]

    const state: any = {}
    state['targetMax'] = moment(range[0].target)
    state['targetMin'] = moment(range[range.length - 1].target)

    this.setState(state)
  }

  onDimensionChange = async (value: any) => {
    await this.setState({ dimenstion: value })
    await this.getRemoteData()
  }

  getRemoteData = async () => {
    const { created, target } = this.state;
    let dataSource = new DataSource(name)

    const array: any[] = []
    let data: any = await dataSource.data(created.format('YYYY-MM-DD'), target.format('YYYY-MM-DD'))
    for (let i in data) {
      array.push({
        location: new google.maps.LatLng(data[i].latitude, data[i].longitude),
        weight: data[i].value
      })
    }

    this.setState({
      data: array,
    })
  }

  onZoomChange = (meterPerPixel: number) => {
    this.setState({
      radius: DataView.RESOLUTION / meterPerPixel
    })
  }

  onClick = async (postion: any) => {

    if (!postion) {
      return null
    }

    const { created, target } = this.state;

    let dataSource = new DataSource(name)
    let data = await dataSource.point(postion, created.format('YYYY-MM-DD'), target.format('YYYY-MM-DD'))

    this.setState({ open: true, position: postion, current: data })

    this.sideBar.current.open()
  }

  render() {
    const { createdMin, createdMax, targetMin, targetMax, current } = this.state

    // @ts-ignore
    return (
      <>
        <Map containerElement={<div style={{ height: window.innerHeight - 64, width: '100%' }}/>}
             mapElement={<div style={{ height: '100%' }}/>}
             onZoomChange={this.onZoomChange}
             onClick={this.onClick}
        >
          <HeatmapLayer
            options={{
              radius: this.state.radius,
              opacity: .4,
              data: this.state.data,
              maxIntensity: DataView.MAX_INTENSITY,
              gradient: DataView.GRADIENT
            }}
          />
          <Polygon
            path={this.state.state}
            options={{
              strokeColor: '#000',
              strokeWeight: 5
            }}
          />
        </Map>

        <SideBar open={this.state.open} ref={this.sideBar}>

          <KeyboardDatePicker
            margin="normal"
            id="created-picker-dialog"
            label="Created"
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
            label="Target"
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

          {/*<FormControl>*/}
          {/*  <InputLabel id="demo-simple-select-label">Dimension</InputLabel>*/}
          {/*  <Select*/}
          {/*    labelId="demo-simple-select-label"*/}
          {/*    id="demo-simple-select"*/}
          {/*    value={this.state.dimension}*/}
          {/*    onChange={this.onDimensionChange}*/}
          {/*  >*/}
          {/*    <MenuItem value={10}>Ten</MenuItem>*/}
          {/*    <MenuItem value={20}>Twenty</MenuItem>*/}
          {/*    <MenuItem value={30}>Thirty</MenuItem>*/}
          {/*  </Select>*/}
          {/*</FormControl>*/}

          <div style={{ flexGrow: 1 }}/>

          <If condition={this.state.current}>
            <span className={'current-value'}>
              {current.value}
            </span>
          </If>

          <div style={{ flexGrow: 1 }}/>

          <If condition={this.state.position}>
            <span className={'current-position'}>
              {`Current position ${this.state.position?.lat.toFixed(2)} ${this.state.position?.lng.toFixed(2)}`}
            </span>
          </If>

          <Legend maxIntensity={DataView.MAX_INTENSITY} gradient={DataView.GRADIENT} step={5}/>

          {/*<Line*/}
          {/*  type="line"*/}
          {/*  data={data}*/}
          {/*  height={250}*/}
          {/*  options={options}*/}
          {/*/>*/}

        </SideBar>
      </>
    )
  }
}
