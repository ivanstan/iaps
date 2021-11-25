import {settings} from "../settings";

export class GraphService {
  private readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get = async (created: any, position: any) => {
    let params = new URLSearchParams({
      created: created,
      latitude: position.lat,
      longitude: position.lng
    })

    let data: any = await fetch(settings.api + '/api/graph/' + this._name + '/data?' + params.toString())
    data = data.json();

    return data;
  };
}