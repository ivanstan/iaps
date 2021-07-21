import React from "react"
import { AppBar, Drawer, IconButton, Toolbar } from "@material-ui/core"
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styled from "styled-components";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const MiniBar = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  height: 100vh;
  background: #fff;
  width: 64px;
`;

const Container = styled.div`

`;

const Content = styled.div`
  padding: 20px;
  width: 400px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 104px);
`;

export default class SideBar extends React.Component<any, any> {

  public readonly state = {
    isOpen: true
  }

  open = (isOpen: boolean = true) => {
    this.setState({ isOpen: isOpen })
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return <>
      <Drawer
        variant="persistent"
        anchor={'right'}
        open={this.state.isOpen}
        onClose={this.toggle}
        BackdropProps={{ invisible: true }}
      >
        <Container>
          <AppBar position='static' elevation={0} style={{ background: "transparent" }}>
            <Toolbar style={{ paddingLeft: 10 }}>
              <IconButton onClick={this.toggle}>
                <ChevronRightIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Content>
            {this.props.children}
          </Content>
        </Container>
      </Drawer>

      <MiniBar>
        <AppBar position='static' elevation={0} style={{ background: "transparent" }}>
          <Toolbar style={{ paddingLeft: 10 }}>
            <IconButton onClick={this.toggle}>
              <ChevronLeftIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </MiniBar>
    </>
  }
}
