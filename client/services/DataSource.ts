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

    console.log(created)

    let data: any = await fetch(settings.api + '/api/source/' + this._name + '/data?created=' + created + '&target=' + target)

    return await data.json();
  }
}
