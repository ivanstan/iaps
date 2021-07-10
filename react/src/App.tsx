import React from 'react'
import { createTheme } from "@material-ui/core"
import { ThemeProvider } from '@material-ui/styles';
import { HashRouter, Route, Switch } from "react-router-dom"
import DataView from './pages/DataView'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateUtils from "@date-io/moment";
import moment from "moment";

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#25afb4',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
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
