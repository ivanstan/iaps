import styled from "styled-components";
import React from "react";
import {CircularProgress} from "@material-ui/core";

const Center = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 100px + 32px);
  z-index: 100;
  background: rgba(96, 125, 139, 0.5);
`;

const Inner = styled.div`
  position: relative;
  left: calc(100px - 20px);
  top: calc(100px - 20px);
`;

export class PageLoader extends React.Component<any, any> {
  render() {
    return <Center>
      <Inner>
        <CircularProgress/>
      </Inner>
    </Center>;
  }
}
