import React from "react"
import {Map} from "../components/Map"
import {KeyboardDatePicker} from "@material-ui/pickers"
import {getGraphDataSettings, getLabelsForYear, getSourceNameFromUrl, replaceUrl} from "../services/util"
import {GraphService} from "../services/GraphService"
import moment from "moment"
import {If} from "react-if"
import {Line} from "react-chartjs-2"
import SideBar from "../components/SideBar"
import styled from "styled-components";
import {defaultLocation} from "../settings";

const options = {
  maintainAspectRatio: false,
  title: {
    display: true,
    text: ''
  },
  legend: {
    display: false,
  },
  elements: {
    point:{
      radius: 1
    }
  },
  interaction: {
    mode: 'index'
  },
  layout: {
    padding: 30
  }
}

const ViewPort = styled.div`
  height: calc(100vh - 64px);
`;

export class GraphPage extends React.Component<any, any> {

  private sideBar: React.RefObject<unknown>;

  constructor(props: any) {
    super(props)

    this.sideBar = React.createRef()
  }

  readonly state = {
    source: getSourceNameFromUrl(),
    created: moment(),
    position: null,
    data: null,
    open: true,
  }

  async componentDidMount() {
    const params: any = new URLSearchParams(this.props.location.search)

    let location
    if (params.get('@')) {
      location = params.get('@').split(',')

      location = {
        lat: location[0],
        lng: location[1],
      }
    } else {
      location = defaultLocation
    }

    let data = await (new GraphService(this.props.match.params.source)).info()

    console.log(data)

    this.setState({
      location: location,
      created: params.get('created') ? moment(params.get('created')) : moment(),
    })
  }

  onClick = async (postion: any) => {
    this.setState({position: postion})

    if (!postion) {
      return
    }

    replaceUrl({
      '@': postion.lat + ',' + postion.lng
    })

    this.getRemoteData()
  }

  onDateChange = async (prop: string, value: any) => {
    let state: any = {}
    state[prop] = value.endOf('month')

    // todo remove
    await this.setState(state)
    await this.getRemoteData()

    let params: any = {}
    params[prop] = value.endOf('month').format('YYYY-MM-DD')
    replaceUrl(params)

    this.getRemoteData()
  }

  getRemoteData = async () => {
    if (!this.state.position) {
      return
    }

    let data = await (new GraphService(this.props.match.params.source)).get(this.state.created.format('YYYY-MM-DD'), this.state.position)

    console.log(data)

    let test: any = {
      labels: getLabelsForYear(this.state.created.format('YYYY')),
      datasets: []
    }

    for (let i in data) {
      let settings = getGraphDataSettings(data[i].name)

      let fill: any = false

      if (data[i].name.search(/p90/) > -1) {
        fill = '-2'
      }

      if (data[i].name.search(/p75/) > -1) {
        fill = '-1'
      }

      if (data[i].name.search(/p50/) > -1) {
        fill = '+1'
      }

      if (data[i].name.search(/p25/) > -1) {
        fill = '+2'
      }

      test.datasets.push(
        {
          label: data[i].name,
          data: data[i].value,
          borderWidth: 1,
          borderColor: settings.borderColor,
          backgroundColor: settings.backgroundColor,
          fill: fill
        }
      )
    }

    this.setState({
      data: test
    })
  }

  render() {
    return <ViewPort>

      <SideBar open={this.state.open} ref={this.sideBar}>
        <KeyboardDatePicker
          margin="normal"
          id="created-picker-dialog"
          label="Prognoza iz"
          format="MM/yyyy"
          views={["month", "year"]}
          value={this.state.created}
          onChange={(param) => this.onDateChange('created', param)}
          // maxDate={createdMax}
          // minDate={createdMin}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <label className="MuiFormLabel-root">Odabir lokacije</label>
        <Map containerElement={<div style={{height: window.innerHeight - 64, width: '100%'}}/>}
             mapElement={<div style={{height: '100%'}}/>}
             zoom={7}
             onClick={this.onClick}
        >
        </Map>
      </SideBar>

      <If condition={this.state.data}>
          <Line
            type='line'
            data={this.state.data}
            height={400}
            options={options}
          />
        </If>
      </ViewPort>
  }
}
