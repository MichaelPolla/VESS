import { Test, Parcel, Layer } from './../models/parcel';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataService {

  public selected: number[] = [0,0,0];
  private data: Parcel[];
  private userData: User;

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
   * Get the user info.
   */
  public getUserInfo(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (this.userData) { // data were previously loaded ; simply return them.
        resolve(this.userData);
      } else {  // Must load data first.
        this.load("user").then(() => { resolve(this.userData) });
      }
    });
  }

  /**
   * Get the current (selected) Test.
   */
  public getCurrentTest(): Test {
    return this.data[this.selected[0]].tests[this.selected[1]];
  }

  /**
   * Get the current (selected) Layer.
   */
  public getCurrentLayer(): Layer {
        return this.getCurrentTest().layers[this.selected[2]];
  }

  public getTestPicture(): any {
    return this.getCurrentTest().picture;
  }
  /**
   * Set the test picture
   */
  public setTestPicture(filepath: string) {
    this.getCurrentTest().picture = filepath;
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
        switch(key){
          case 'parcels':
            this.data = JSON.parse(value);
          break;
          case 'user':
            this.userData = JSON.parse(value);
          break;
        }

      }
      else {
        console.log("Storage empty.");
      }
    });
  }
}
