import React from 'react'
import {Button, createTheme} from "@material-ui/core"
import {ThemeProvider} from '@material-ui/styles';
import {HashRouter, Route, Switch} from "react-router-dom"
import DataView from './pages/DataView'
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateUtils from "@date-io/moment";
import moment from "moment";
import {MainMenu} from "./components/MainMenu";
import styled from "styled-components";
import {GraphPage} from "./pages/GraphPage";
import {PredictionMenu} from "./components/PredictionMenu";
import ClimatologyView from "./pages/ClimatologyView";
import {PwaSupportPage} from "./pages/PwaSupportPage";
import ClimatologyClimTx35 from "./pages/ClimatologyClimTx35";
import ClimatologyClimFrost from "./pages/ClimatologyClimFrost";

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#607D8B',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
})

let deferredPrompt: any;

const InstallBar = styled.div`
  background: red;
  position: fixed;
  height: 40px;
  bottom: 0px;
  width: 100%;
`;

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    if(window.location.hash === '' || window.location.hash === '#/') {
      window.location.assign('/#/data/medT')
    }
  }

  public readonly state = {
    showInstall: false,
    sources: []
  }

  componentDidMount = async () => {
    window.addEventListener('beforeinstallprompt', (e) => {

      // Prevent the mini-infobar from appearing on mobile
      // e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA

      this.setState({
        showInstall: true
      })
    });
  };

  onInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      await deferredPrompt.userChoice;
      deferredPrompt = null;
    }

    this.setState({
      showInstall: false
    })
  }

  onSourceChange = (data: any) => {
    window.location.assign('/#/data/' + data.name);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateUtils} libInstance={moment}>
          <MainMenu menu={<PredictionMenu/>}/>
          <HashRouter>
            <Switch>
              <Route path="/data/:source" exact component={DataView}/>
              <Route path="/graph/:source" exact component={GraphPage}/>
              <Route path="/climatology/sclim_tx35" exact component={ClimatologyClimTx35}/>
              <Route path="/climatology/sclim_frost" exact component={ClimatologyClimFrost}/>
              <Route path="/climatology/:source" exact component={ClimatologyView}/>
              <Route path="/pwa" exact component={PwaSupportPage}/>
            </Switch>
          </HashRouter>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    )
  }
}

export default App
