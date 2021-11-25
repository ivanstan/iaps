import React from "react"
import {Map} from "../components/Map"
import {KeyboardDatePicker} from "@material-ui/pickers"
import {getGraphDataSettings, getSourceNameFromUrl, replaceUrl} from "../services/util"
import {GraphService} from "../services/GraphService";
import moment from "moment";
import {If} from "react-if";
import {Line} from "react-chartjs-2";

const options = {
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Number of requests in last three days'
  },
  legend: {
    display: false,
  },
  elements: {
    point:{
      radius: 0
    }
  },
}

export class GraphPage extends React.Component<any, any> {

  readonly state = {
    source: getSourceNameFromUrl(),
    created: moment(),
    position: null,
    data: null,
  }

  componentDidMount() {
    const params: any = new URLSearchParams(this.props.location.search);

    let location = null

    if (params.get('@')) {
      location = params.get('@').split(',');

      location = {
        lat: location[0],
        lng: location[1],
      }
    }

    this.setState({
      location: location,
      created: params.get('created') ? moment(params.get('created')) : moment(),
    })
  }

  onClick = async (postion: any) => {
    this.setState({position: postion})

    replaceUrl({
      '@': postion.lat + ',' + postion.lng
    });

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
      return;
    }

    let data = await (new GraphService('medGDD')).get(this.state.created.format('YYYY-MM-DD'), this.state.position)

    let test: any = {
      labels: Array.from(Array(365).keys()),
      datasets: []
    }

    for (let i in data) {
      let settings = getGraphDataSettings(data[i].name);

      let fill: any = false;

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
      );
    }

    this.setState({
      data: test
    })
  }

  render() {
    return <div>

      <div>
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
        <Map containerElement={<div style={{height: window.innerHeight - 64, width: '50%'}}/>}
             mapElement={<div style={{height: '100%'}}/>}
             onClick={this.onClick}
        >
        </Map>
      </div>

      <div>
        <If condition={this.state.data}>
          <Line
            type='line'
            data={this.state.data}
            height={400}
            options={options}
          />
        </If>
      </div>
    </div>
  }
}
