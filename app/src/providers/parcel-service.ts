import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Parcel } from '../app/parcel';

@Injectable()
export class ParcelService {

  data: any;

  constructor(public storage: Storage) {}

  /**
   * Get data from Storage.
   * key : the key associated to the desired values.
   * return : a Promise (from Storage)
   */
    load(key: string): Promise<any> {
    return this.storage.get(key).then((value) => {
      if (value != null) {
        this.data = JSON.parse(value);
      }
      else {
        console.log("Storage empty.");
      }
    });
  }

  public getParcels(): Promise<any> {
    return new Promise((resolve, reject) => {
      if(this.data) {
        console.log("données existantes");
        resolve(this.data);
      } else {
        console.log("données vides");
       this.load("parcels").then(() => { resolve(this.data) });
    }
    });
  }
}
