import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ParcelService {

  private data: any;

  constructor(public storage: Storage) { }

  /**
   * Get parcels data.  
   * Return : a Promise
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
