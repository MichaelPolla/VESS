import { Block, Parcel, Layer } from './../app/parcel';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataService {

  public selected: number[] = [0,0,0,0];
  private data: Parcel[];

  constructor(public storage: Storage) { }

  /**
   * Get parcels data.  
   */
  public getParcels(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (this.data) { // data were previously loaded ; simply return them.
        resolve(this.data);
      } else {  // Must load data first.
        this.load("parcels").then(() => { resolve(this.data) });
      }
    });
  }

  /**
   * Get the current (selected) Block.
   */
  public getCurrentBlock(): Block {
    return this.data[this.selected[0]].tests[this.selected[1]].blocks[this.selected[2]];
  }

  /**
   * Get the current (selected) Layer.
   */
  public getCurrentLayer(): Layer {
        return this.getCurrentBlock().layers[this.selected[3]];
  }

  public getBlockPicture(): any {
    return this.getCurrentBlock().picture;
  }
  /**
   * Set the block picture
   */
  public setBlockPicture(filepath: string) {
    this.getCurrentBlock().picture = filepath;
  }

    /**
   * Save data using ionic Storage (key/value pair).  
   * key : key associated to the value.  
   * value : the value to save. 
   */
  public save(key: string, value: any) {
    this.storage.set(key, JSON.stringify(value));
  }

    /**
   * Get data from Storage.  
   * key : the key associated to the desired values.  
   * Return : a Promise (from Storage)
   */
  private load(key: string): Promise<any> {
    return this.storage.get(key).then((value) => {
      if (value != null) {
        this.data = JSON.parse(value);
      }
      else {
        console.log("Storage empty.");
      }
    });
  }
}
