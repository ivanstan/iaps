import React from "react";
import { MainMenu } from "../components/MainMenu";
import { Map } from "../components/Map";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import Polygon from "react-google-maps/lib/components/Polygon";
import SideBar from "../components/SideBar";
import Legend from "../components/Legend";
import { KeyboardDatePicker, } from '@material-ui/pickers';
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { If } from "react-if";

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

export default class DataView extends React.Component {

  private sideBar: React.RefObject<any>;

  constructor(props: any) {
    super(props);

    this.sideBar = React.createRef();
  }

  private static RESOLUTION = 12000;

  private static MAX_INTENSITY = 4;

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
  ];

  public state: any = {
    data: [],
    zoom: 8,
    radius: 24,
    state: [],
    legend: [],
    open: false,
    date: new Date(),
    dimenstion: null,
    position: null,
  }

  onDateChange = (date: any) => {
    this.setState({ date: date })
  }

  onDimensionChange = (value: any) => {
    this.setState({ dimenstion: value })
  }

  async componentDidMount() {

    const array: any[] = []
    let data: any = await fetch('./data.json')
    data = await data.json()
    for (let i in data) {
      array.push({
        location: new google.maps.LatLng(data[i].latitude, data[i].longitude),
        weight: data[i].value
      })
    }

    // let state: any = await fetch('/serbia.geojson');
    // state = await state.json()
    // let coords: any = [];
    // state.features[0].geometry.coordinates[0][0].map((coord: any) => coords.push({lat: coord[1], lng: coord[0]}));

    this.setState({
      data: array,
      zoom: 8,
      // state: coords,
    })
  }

  onZoomChange = (meterPerPixel: number) => {
    this.setState({
      radius: DataView.RESOLUTION / meterPerPixel
    })
  }

  onClick = async (postion: any) => {

    let params = new URLSearchParams({
      latitude: postion.lat,
      longitude: postion.lng
    });

    // await fetch(settings.api + 'find?' + params.toString());

    this.setState({ open: true, position: postion });

    this.sideBar.current.open();
  };

  render() {
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
            id="date-picker-dialog"
            label="Date"
            format="MM/yyyy"
            views={["month", "year"]}
            value={this.state.date}
            onChange={this.onDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

          <FormControl>
            <InputLabel id="demo-simple-select-label">Dimension</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.dimenstion}
              onChange={this.onDimensionChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <Legend maxIntensity={DataView.MAX_INTENSITY} gradient={DataView.GRADIENT}/>

          <div style={{ flexGrow: 1 }}/>

          <If condition={this.state.position}>
            <span>{`Current position ${this.state.position?.lat.toFixed(2) } ${this.state.position?.lng.toFixed(2) }`}</span>
          </If>

          <Line
            type="line"
            data={data}
            height={250}
            options={options}
          />

        </SideBar>
      </>
    );
  }
}
