export class Parcel {
  public name: string;
  public ofag?: string;
  public tests?: Test[];

  public constructor(init: Parcel) {
    Object.assign(this, init);
  }
}

export class Test {
  public name?: string;
  public date: string;
  public score?: number;
  public blocks?: Block[];

  public constructor(init: Test) {
    Object.assign(this, init);
  }
}

export class Block {
  public name: string;
  public score?: number;
  public picture?: any;
  public layers?: Layer[];

  public constructor(init: Block) {
    Object.assign(this, init);
  }
}

export class Layer {
  public num: number;
  public score: number;
  public picture: any;

  constructor(num: number) {
    this.num = num;
  }
}