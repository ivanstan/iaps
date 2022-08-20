import {Rainbow} from '@indot/rainbowvis';

export class ColorUtil {

  private static GRADIENT = [
    "rgba(102,255,0,0)",
    "#66ff00",
    "#93ff00",
    "#c1ff00",
    "#eeff00",
    "#f4e300",
    "#f9c600",
    "#ffaa00",
    "#ff7100",
    "#ff3900",
    "#ff0000"
  ]
  private _name: string;
  private _maxValue: number;
  public rainbow: any;

  constructor(name: string, maxValue: number) {
    this._name = name;
    this._maxValue = maxValue;

    this.rainbow = new Rainbow().overColors(...this.getGradient().filter(color => color.length <= 7)).withRange(0, this._maxValue);
  }

  getColor(value: number): string {
    if (value) {
      return this.rainbow.getColor(value);
    }

    return "rgba(102,255,0,0)"
  }


  public getGradient() {
    return ColorUtil.GRADIENT;
  }

}