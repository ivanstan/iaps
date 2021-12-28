import React from "react";
import {Button, Menu, MenuItem} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";

export function PredictionMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMore/>}
      >
        Prognoze
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component="a" onClick={handleClose} href="#/data/medP">Mesečne padavine</MenuItem>
        <MenuItem component="a" onClick={handleClose} href="#/data/medT">Mesečne temperature</MenuItem>
        <MenuItem component="a" onClick={handleClose} href="#/data/medFROST">Rizici od mraza</MenuItem>
        <MenuItem component="a" onClick={handleClose} href="#/data/medRX20">Rizici od velike količine padavina</MenuItem>
        <MenuItem component="a" onClick={handleClose} href="#/data/medTX35">Rizici od visokih temperatura</MenuItem>
        <MenuItem component="a" onClick={handleClose} href="#/graph/medGDD">Sume temperatura</MenuItem>
      </Menu>
    </>
  );
}
