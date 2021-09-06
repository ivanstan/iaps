export const meterPerPixel = (zoom: number, latitude: number) => {
  return 156543.03392 * Math.cos(latitude * Math.PI / 180) / Math.pow(2, zoom)
}

export const mapCenter = { lat: 43.8125, lng: 21.4612 }
