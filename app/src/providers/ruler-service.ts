import { Injectable } from '@angular/core';

declare var plugins;
@Injectable()
export class RulerService {

  heightPx: number;
  flag:boolean;

  constructor() { }

  /**
   * Get Height of Ruler in px.
   * imgHeightPx : height of image ruler in px
   * imgCentimeterPerPx : number of px for one centimeter in the image.
   * Return : a Promise (height in px)
   */
  public getHeightStyle(imgHeightPx:number, imgCentimeterPerPx:number){

    return new Promise((resolve: any, reject: any) => {
      plugins.screensize.get(
        (result) => {
          this.heightPx =((result.ydpi)/(2.54*result.densityValue))*(846/56);
          resolve(this.heightPx);
        },
        () => reject("Error with plugins of screensize")
      );

    });
  }
}
