import React from "react";
import {Button, Menu, MenuItem} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";

export function PredictionMenu() {
  const [prognosisMenu, setPrognosisMenu] = React.useState(null)
  const [climatologyMenu, setClimatologyMenu] = React.useState(null)
  const [helpMenu, setHelpMenu] = React.useState(null)

  const prognosisOpen = Boolean(prognosisMenu)
  const climatologyOpen = Boolean(climatologyMenu)
  const helpOpen = Boolean(helpMenu)

  const handleClosePrognosis = () => {
    setPrognosisMenu(null)
  }

  const handleCloseClimatology = () => {
    setClimatologyMenu(null)
  }

  const handleCloseHelp = () => {
    setHelpMenu(null)
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
        <MenuItem component="a" onClick={handleCloseClimatology} href="#/climatology/sclim_mtm">Srednje
          temperature</MenuItem>
        <MenuItem component="a" onClick={handleCloseClimatology} href="#/climatology/sclim_mrr">Padavine</MenuItem>
        <MenuItem component="a" onClick={handleCloseClimatology} href="#/climatology/sclim_tx35">Visoke letnje temperature</MenuItem>
        <MenuItem component="a" onClick={handleCloseClimatology} href="#/climatology/sclim_frost">Prolećni mraz</MenuItem>
      </Menu>

      <Button
        id="basic-button"
        aria-controls={helpOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={helpOpen ? 'true' : undefined}
        onClick={(event: any) => setHelpMenu(event.currentTarget)}
        endIcon={<ExpandMore/>}
      >
        Pomoć
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={helpMenu}
        open={helpOpen}
        onClose={handleCloseHelp}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component="a" onClick={handleCloseHelp} href="#/pwa">Mobilna aplikacija</MenuItem>
      </Menu>
    </>
  )
}
