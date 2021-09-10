import React from "react"
import { FormControl, MenuItem, Select } from "@material-ui/core"
import { DataSource } from "../services/DataSource"
import { getSourceNameFromUrl } from "../services/util";

export class SourceSelect extends React.Component<any, any> {

  readonly state = {
    sources: [],
    value: '',
  }

  onSourceChange = (event: any) => {
    const { onChange } = this.props

    this.setState({
      value: event.target.value,
    })

    if (onChange) {
      onChange(event.target.value)
    }
  }

  componentDidMount = async () => {
    const sources = await DataSource.list()

    let value = sources[0] || null

    let sourceNameFromUrl = getSourceNameFromUrl();
    if (sourceNameFromUrl) {
      for(let i in sources) {
        if (sources[i].name === sourceNameFromUrl) {
          value = sources[i]
        }
      }
    }

    this.setState({ sources: sources, value: value })
  }

  render() {
    const { sources, value } = this.state

    return (
      <>
        <FormControl>
          <Select
            onChange={this.onSourceChange}
            value={value}
          >
            {this.state.sources.map((item: any, index: number) => (
              <MenuItem value={item} key={index}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    )
  }
}
