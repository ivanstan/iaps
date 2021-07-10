import React from 'react'
import { createTheme } from "@material-ui/core"
import { ThemeProvider } from "styled-components"
import { HashRouter, Route, Switch } from "react-router-dom"
import DataView from './pages/DataView'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateUtils from "@date-io/moment";
import moment from "moment";

const theme = createTheme({
  palette: {
    primary: {
      main: '#f1f1f1',
    },
  },
  overrides: {
    MuiButton: {
      label: {
        color: "#f1f1f1",
      },
    },
  },
})

class App extends React.Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateUtils} libInstance={moment}>
          <HashRouter>
            <Switch>
              <Route path="/" exact component={DataView}/>
            </Switch>
          </HashRouter>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    )
  }

}

export default App
