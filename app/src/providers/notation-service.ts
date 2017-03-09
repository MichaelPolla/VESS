import { Injectable } from '@angular/core';

  export class Layer { // Todo: should move elsewhere
    num: number;
    score: number;
    picture: any;

    constructor(num: number) {
      this.num = num;
    }
  }

@Injectable()
export class NotationService {

  layers: Layer[];
  actualLayer: Layer;
  constructor() {}

  /**
   * Set a new array of Layer used for the current test.  
   * num: the number of layers (usually between 2 and 4).
   */
  setLayers(num: number) {
    this.layers = []; // Reset the array of Layer
    for (var i = 1; i <= num; i++) {
      this.layers.push(new Layer(i));
    }
  }

  /**
   * Set the actual layer.
   * index: the index of the layer, in this.layers.
   */
  setActualLayer(index: number) {
    this.actualLayer = this.layers[index];
  }

}


