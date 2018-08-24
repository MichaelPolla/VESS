import { Geoloc } from './geoloc';
import { User } from './user';

export class Parcel {
  public id: number;
  public name: string;
  public ofag?: string;
  public tests?: Test[];

  public constructor(init: Parcel) {
    Object.assign(this, init);
  }
}

export enum Steps {
  EXTRACTING_BLOCK,
  PICTURE_EXTRACTED_BLOCK,
  OPENING_BLOCK,
  DEFINING_LAYERS,
  PICTURE_LAYER,
  NOTATION
}

export class Test {
  public id: number;
  public name?: string;
  public date: string;
  public step?: Steps = Steps.EXTRACTING_BLOCK;
  public score?: number;
  public picture?: string;
  public geolocation?: Geoloc;
  public thickness?: number;
  public user?: User;
  public isCompleted?: Boolean = false;
  public comment?: string;
  public layers?: Layer[];
  public state?: string;

  public constructor(init: Test) {
    Object.assign(this, init);
  }
}

export class Layer {
  public id?: number;
  public num: number;
  public score: number;
  public picture?: string;
  public thickness: number;
  public minThickness: number;
  public maxThickness : number;
  public comment?: string;

  constructor(num: number, thickness: number, minThickness:number) {
    this.num = num;
    this.thickness = thickness;
    this.minThickness = minThickness;
  }
}
