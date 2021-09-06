import { settings } from "../settings";

export class DataSource {
  private readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }

  info = async () => {
    let data: any = await fetch(settings.api + '/api/source/' + this._name + '/info');

    return await data.json();
  }

  data = async (created: string, target: string) => {
    let data: any = await fetch(settings.api + '/api/source/' + this._name + '/data?created=' + created + '&target=' + target)

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

    return result;
  }

  point = async (postion: any, created: string, target: string) => {
    let params = new URLSearchParams({
      latitude: postion.lat,
      longitude: postion.lng,
      created: created,
      target: target
    })

    let data: any = await fetch(settings.api + '/api/source/' + this._name + '/point?' + params.toString())

    return await data.json();
  };
}
