import React from 'react'
import {AppBar, Button, Drawer, Toolbar, Typography} from '@material-ui/core'
import styled from 'styled-components'

const Menu = styled.div`
  background: #0b3d91
  display: flex
  flex-direction: column
  align-items: baseline
  padding: 15px
`

const Logo = styled.img`
  height: 32px;
  display: inline-block;
  background: #fff;
  border-radius: 16px;
`;

const LogoSecondary = styled.img`
  height: 32px;
  display: inline-block;
  margin-right: 55px;
`;

const Separator = styled.div`
  flex-grow: 1;
`;

export class MainMenu extends React.Component<any, any> {

  public readonly state = {
    open: false,
  }

  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.open
    })
  }

  render() {
    // const menu = (
    //   <>
    //     {/*<Button href={'#/'}>*/}
    //     {/*  Index*/}
    //     {/*</Button>*/}
    //   </>
    // )

    const {menu} = this.props

    return (
      <AppBar position='static' elevation={0}>
        <Toolbar>
          <Logo src={'logo192.png'}/>

          <Button href={'#/'}>
            <Typography variant='h6'>
              IAPS
            </Typography>
          </Button>

          <div className={'d-none d-md-block'}>
            {menu}
          </div>

          <Separator/>

          <LogoSecondary src={'images/fond-za-nauku.png'}/>
        </Toolbar>

        <Drawer
          variant='persistent'
          anchor='top'
          open={this.state.open}
        >
          <Menu onClick={this.toggleMenu}>
            {menu}
          </Menu>
        </Drawer>

      </AppBar>
    )
  }
}
