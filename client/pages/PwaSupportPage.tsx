import React from "react";
import {Container} from "@material-ui/core";
import {MoreVert} from "@material-ui/icons";
import styled from "styled-components";

const List = styled.ol`
  li {
    margin: 10px 0;
  }
`

export class PwaSupportPage extends React.Component<any, any> {

  render() {
    return (
      <Container maxWidth="md">
        <h1>Mobilna aplikacija</h1>

        <p>
          IAPS možete koristiti kao progresivnu web aplikaciju (PWA) za brzo web iskustvo na računaru ili mobilnom
          uređaju.
          Možete instalirati IAPS na vas uređaj za brži pristup i dodatne funkcije, kao što je više prostora za
          skladištenje sadržaja i za korišćenje van mreže (offline).
        </p>

        <h2>Instalacija</h2>

        <List>
          <li>Na mobilnom uređaju otvorite <img
            src="//lh3.googleusercontent.com/-20NuyB0WC36P5OvH-HnVwgMQlIRx47n0At3ZLRZuU2UIuXpsDZVhrsFJMW5DQkQVQU=w36-h36"
            width="18" height="18" alt="Chrome" title="Chrome" data-mime-type="image/png"
            data-alt-src="//lh3.googleusercontent.com/-20NuyB0WC36P5OvH-HnVwgMQlIRx47n0At3ZLRZuU2UIuXpsDZVhrsFJMW5DQkQVQU"/> Chrome aplikaciju.
          </li>
          <li>
            Idite na web lokaciju IAPS aplikacije.
          </li>
          <li>
            Dodirnite baner za instalaciju koji će se pojaviti ukoliko aplikacija već nije instalirana na vaš uređaj.

            <img src="images/pwa-banner.png" alt="PWA Banner" style={{display: 'block', margin: '10px auto'}} width={400}/>

            Ili iz menja <MoreVert/> izaberite opciju Install app.

            <img src="images/install.png" alt="Install app" style={{display: 'block', margin: '10px auto',}} width={400}/>
          </li>
          <li>
            Pratite uputstva na ekranu.
            <img src="images/install-confirm.jpg" alt="IAPS mobile icon" style={{display: 'block', margin: '10px auto'}} width={400}/>
          </li>

          <li>
            U meniju mobilnog uređaja pojaviće se ikonica IAPS aplikacije.

            <img src="images/iaps-mobile.jpg" alt="IAPS mobile icon" style={{display: 'block', margin: '10px auto'}}/>
          </li>

        </List>
      </Container>
  )
  }
  }
