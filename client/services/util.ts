import moment from "moment";
import {defaultPosition} from "../settings";

export const meterPerPixel = (zoom: number, latitude: number) => {
  return 156543.03392 * Math.cos(latitude * Math.PI / 180) / Math.pow(2, zoom)
}

export const mapCenter = { lat: 43.8125, lng: 21.4612 }

export const replaceUrl = (params: any) => {
  const split = window.location.hash.split('?')
  const path = split[0]
  const query = split[1]

  const urlSearchParams = new URLSearchParams(query)

  for (let i in params) {
    if (params.hasOwnProperty(i)) {
      urlSearchParams.set(i, params[i])
    }
  }

  window.location.assign(path + '?' + decodeURIComponent(urlSearchParams.toString()))
}

export const getSourceNameFromUrl = () => {
  const split = window.location.hash.split('?')
  const path = split[0]
  const match = path.match(/#\/data\/(.+)/)

  return match ? (match[1] || null) : null
}

export const getLegendStep = (name: string): number => {
  switch (name) {
    case 'medFROST':
    case 'medRX20':
    case 'medTX35':
    case 'medT':
    case 'sclim_mtm':
    case 'sclim_tx35':
      return 5;
    case 'sclim_mrr':
    case 'medP':
      return 100;
    default:
      return 1;
  }
}

export const getGraphDataSettings = (name: string): any => {

  let alpha = 0;
  if (name.search(/p25/) > -1 || name.search(/p90/) > -1) {
    alpha = -.2;
  }

  return {
    borderColor: `rgba(96,125,139, ${1 + alpha})`,
    backgroundColor: `rgba(96,125,139, ${0.4 + alpha})`,
  }
}

export const getLabelsForYear = (year: string) => {
  const result = [];

  var startDate = moment('01-01-' + year, "DD-MM-YYYY");

  for (let i in Array.from(Array(365).keys())) {

    let newDate = startDate.clone().add(i, 'd');

    result.push(newDate.format('DD-MM-YYYY'))
  }

  return result;
}

export const getPositionFromParam = (location: any) => {
  const params: any = new URLSearchParams(location.search)

  let position
  if (params.get('@')) {
    position = params.get('@').split(',')

    return {
      lat: parseFloat(position[0]),
      lng: parseFloat(position[1]),
    }

  }

  return defaultPosition
}
