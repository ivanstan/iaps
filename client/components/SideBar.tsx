import React from "react"
import { AppBar, Drawer, IconButton, Toolbar, Typography, withStyles } from "@material-ui/core"
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
  overflow-x: hidden;
`;

const drawerWidth = 480;

const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 104px);
`;

const styles: any = (theme: any) => ({
  drawerPaper: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  showMap: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  }
})

class SideBar extends React.Component<any, any> {

  public readonly state = {
    isOpen: false
  }

  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: props.open
    }
  }

  componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any) {
    this.setState({
      isOpen: nextProps.open
    })
  }

  open = (isOpen: boolean = true) => {
    this.setState({ isOpen: isOpen })
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { classes } = this.props

    return <>
      <Drawer
        variant="persistent"
        anchor={'right'}
        open={this.state.isOpen}
        onClose={this.toggle}
        BackdropProps={{ invisible: true }}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Container>
          <AppBar position='static' elevation={0} style={{ background: "transparent" }}>
            <Toolbar style={{ paddingLeft: 10 }}>
              <IconButton onClick={this.toggle}>
                <ChevronRightIcon/>
              </IconButton>
              <Typography className={classes.showMap} onClick={this.toggle}>Show map</Typography>
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

export default withStyles(styles)(SideBar)
