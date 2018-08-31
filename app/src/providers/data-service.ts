import { Test, Parcel, Layer } from './../models/parcel';
import { User } from './../models/user';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

declare var cordova;

@Injectable()
export class DataService {

  private currentLayer: Layer;
  private currentParcel: Parcel;
  private currentTest: Test;
  private data: Parcel[] = [];
  private userData: User;

  constructor(private platform: Platform, public storage: Storage) { }

  /**
   * Get parcels data.
   */
  public getParcels(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (this.data.length > 0) { // data were previously loaded ; simply return them.
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
   * Get the current Layer.
   */
  public getCurrentLayer(): Layer {
    return this.currentLayer;
  }

  /**
   * Set the current Layer.  
   * @param layerIndex Index of the Layer.
   */
  public setCurrentLayer(layerIndex: number) {
    this.currentLayer = this.getCurrentTest().layers[layerIndex];
  }

  /**
   * Get the current Parcel.
   */
  public getCurrentParcel(): Parcel {
    return this.currentParcel;

  }

  /**
   * Set the current Parcel.
   * @param parcelId The parcel id.
   */
  public setCurrentParcel(parcelId: number) {
    this.currentParcel = this.data.find(parcel => parcel.id == parcelId);
  }

  /**
   * Delete a Parcel.
   * @param parcel The Parcel to delete.
   */
  public deleteParcel(parcel: Parcel) {
    let index = this.data.indexOf(parcel);
    if (index > -1) {
      this.data.splice(index, 1);
    }
  }

  /**
   * Get the current Test.
   */
  public getCurrentTest(): Test {
    return this.currentTest;
  }

  /**
   * Set the current Test.
   */
  public setCurrentTest(testId: number): void {
    this.currentTest = this.getCurrentParcel().tests.find(test => test.id == testId);
  }

  /**
   * Delete a test (in the current Parcel)
   * @param test The Test to delete.
   */
  public deleteTest(test: Test): void {
    let index = this.getCurrentParcel().tests.indexOf(test);
    if (index > -1) {
      this.getCurrentParcel().tests.splice(index, 1);
    }
  }

  /**
 * Save data using ionic Storage (key/value pair).
 * @param key Key associated to the value.
 * @param value The value to save.
 */
  public save(key: string, value: any) {
    this.storage.set(key, JSON.stringify(value));
  }

  /**
   * Save parcels data.
   */
  public saveParcels() {
    this.storage.set("parcels", JSON.stringify(this.data));
  }

  /**
 * Get data from Storage.
 * @param key the key associated to the desired values.
 * @returns A Promise (from Storage)
 */
  private load(key: string): Promise<any> {
    return this.storage.get(key).then((value) => {
      if (value != null) {
        switch (key) {
          case 'parcels':
            this.data = JSON.parse(value);
            break;
          case 'user':
            this.userData = JSON.parse(value);
            break;
        }
      }
      else {
        console.log("Nothing stored under key: " + key);
      }
    });
  }

  /**
   * Get the local directory set for the device.  
   * See https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/#where-to-store-files 
   * for the list of all available locations depending of the platform.
   */
  public getLocalDirectory(): string {
    let localDir;
    if (this.platform.is('ios')) {
      localDir = cordova.file.documentsDirectory;
    }else if(this.platform.is('android')){
      localDir = cordova.file.externalDataDirectory;
    }
    else {
      localDir = ""; // Default. Don't use a cordova location as it may not be available (e.g. if running on a regular browser)
    }
    return localDir;
  }
}
