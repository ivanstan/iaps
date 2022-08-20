import {settings} from "../settings";

export class ClimatologyService {

  getClimatologyMap = async (source: string) => {
    let data: any = await fetch(settings.api + '/api/source/' + source + '/data');

    data = await data.json();

    let result = []
    for (let i in data) {
      if (!data.hasOwnProperty(i)) {
        continue
      }

      result.push({
        location: new google.maps.LatLng(data[i].latitude, data[i].longitude),
        weight: data[i].value
      })
    }

    return {
      data: result,
      info: data.info,
    }
  }

  getMap = async (source: string, subSource: string) => {
    let data: any = await fetch(settings.api + '/api/climatology/map/' + source + '/' + subSource);

    data = await data.json();

    let result = []
    for (let i in data.data) {
      if (!data.data.hasOwnProperty(i)) {
        continue
      }

      result.push({
        location: new google.maps.LatLng(data.data[i].latitude, data.data[i].longitude),
        weight: data.data[i].value
      })
    }

    return {
      data: result,
      info: data.info,
    }
  }

  async getPoint(source: string, postion: any) {
    let params = new URLSearchParams({
      latitude: postion.lat,
      longitude: postion.lng,
    })

    let data: any = await fetch(settings.api + '/api/climatology/data/' + source + '?' + params.toString());

    return await data.json();
  }
}
