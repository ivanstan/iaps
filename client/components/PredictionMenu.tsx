import React from "react";
import {Button, Menu, MenuItem} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";

export function PredictionMenu() {
  const [prognosisMenu, setPrognosisMenu] = React.useState(null)
  const [climatologyMenu, setClimatologyMenu] = React.useState(null)

  const prognosisOpen = Boolean(prognosisMenu)
  const climatologyOpen = Boolean(climatologyMenu)

  const handleClosePrognosis = () => {
    setPrognosisMenu(null)
  }

  const handleCloseClimatology = () => {
    setClimatologyMenu(null)
  }

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={prognosisOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={prognosisOpen ? 'true' : undefined}
        onClick={(event: any) => setPrognosisMenu(event.currentTarget)}
        endIcon={<ExpandMore/>}
      >
        Prognoze
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={prognosisMenu}
        open={prognosisOpen}
        onClose={handleClosePrognosis}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component="a" onClick={handleClosePrognosis} href="#/data/medP">Mesečne padavine</MenuItem>
        <MenuItem component="a" onClick={handleClosePrognosis} href="#/data/medT">Mesečne temperature</MenuItem>
        <MenuItem component="a" onClick={handleClosePrognosis} href="#/data/medFROST">Rizici od mraza</MenuItem>
        <MenuItem component="a" onClick={handleClosePrognosis} href="#/data/medRX20">Rizici od velike količine padavina</MenuItem>
        <MenuItem component="a" onClick={handleClosePrognosis} href="#/data/medTX35">Rizici od visokih temperatura</MenuItem>
        <MenuItem component="a" onClick={handleClosePrognosis} href="#/graph/medGDD">Sume temperatura</MenuItem>
      </Menu>

      <Button
        id="basic-button"
        aria-controls={climatologyOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={climatologyOpen ? 'true' : undefined}
        onClick={(event: any) => setClimatologyMenu(event.currentTarget)}
        endIcon={<ExpandMore/>}
      >
        Klimatologija
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={climatologyMenu}
        open={climatologyOpen}
        onClose={handleCloseClimatology}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component="a" onClick={handleCloseClimatology} href="#/climatology/sclim_mtm">Srednje temperature</MenuItem>
        <MenuItem component="a" onClick={handleCloseClimatology} href="#/climatology/sclim_mrr">Padavine</MenuItem>
      </Menu>
    </>
  )
}
