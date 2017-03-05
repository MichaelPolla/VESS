export class Parcel {
  name: string;
  tests: Test[];
}

export class Test {
  public name: string;
  public blocks: Block[];
}

export class Block {
  public name: string;
}