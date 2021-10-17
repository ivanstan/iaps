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

  window.location.assign(path + '?' + urlSearchParams.toString())
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
      return 5;
    case 'medP':
      return 100;
    default:
      return 1;
  }
}
