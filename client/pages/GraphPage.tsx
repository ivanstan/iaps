import React from "react"
import {Map} from "../components/Map"
import {KeyboardDatePicker} from "@material-ui/pickers"
import {getSourceNameFromUrl, replaceUrl} from "../services/util"
import {GraphService} from "../services/GraphService";
import moment from "moment";

export class GraphPage extends React.Component<any, any> {

  readonly state = {
    source: getSourceNameFromUrl(),
    created: moment(),
    position: null,
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);

    this.setState({
      created: moment(params.get('created'))
    })
  }

  onClick = async (postion: any) => {
    this.setState({position: postion})
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

    console.log(this.state)

    let data = await (new GraphService('medGDD')).get(this.state.created.format('YYYY-MM-DD'), this.state.position)

    console.log(data)
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


    </div>
  }
}
