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

    return await data.json();
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
