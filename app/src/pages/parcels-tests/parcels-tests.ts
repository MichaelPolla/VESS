import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { Parcel, Test, Block } from '../../app/parcel';
// Pages
import { GifViewPage } from '../gif-view/gif-view';
// Providers
import { ParcelService } from '../../providers/parcel-service';

/*

  Docs :
   - Introduction to lists : https://www.joshmorony.com/an-introduction-to-lists-in-ionic-2/
* 
* TODOs :
* refactor addItem, editItem and deleteItem ; could be a unique function with action (add, edit, delete) passed in parameter
* itemType: use a kind of enum ? to only allow "parcels", "tests" and "blocks"
*/


enum Steps {
  Parcels,
  Tests,
  Blocks
}

@Component({
  selector: 'page-parcels-tests',
  templateUrl: 'parcels-tests.html',
})
export class ParcelsTestsPage {

  pageTitle: string;
  stepNumber: number;
  stepName: string;
  listItems: any = [];
  parcels: Parcel[] = [];
  indexes: number[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public parcelService: ParcelService) { }

  ionViewDidLoad() {
    this.stepNumber = this.navParams.get('step');
    if (this.navParams.get('indexes') != null) {
      this.indexes = this.navParams.get('indexes');
    }
    this.parcelService.getParcels().then((value) => {
      if (value != null) {
        this.parcels = value;
      }
      switch (this.stepNumber) {
        case Steps.Tests:
          this.pageTitle = "Tests";
          this.listItems = this.parcels[this.indexes[0]].tests;
          break;

        case Steps.Blocks:
          this.pageTitle = "Blocs";
          this.listItems = this.parcels[this.indexes[0]].tests[this.indexes[1]].blocks;
          break;

        default: // Steps.Parcels, hopefully
          this.stepNumber = Steps.Parcels;
          this.pageTitle = "Parcelles";
          this.listItems = this.parcels;
          break;
      }
      this.stepName = Steps[this.stepNumber];
    });
  }

  /**
   * Add a new item from a dialog.  
   */
  addItem() {
    let prompt = this.alertCtrl.create({
      title: 'Ajouter un élément',
      inputs: [{
        name: 'name',
        placeholder: 'Nom'
      }],
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: 'Ajouter',
          handler: data => {
            if (this.stepNumber === Steps.Parcels) {
              let parcel = new Parcel();
              parcel.name = data['name'];
              parcel.tests = [];
              this.parcels.push(parcel);
            }
            else if (this.stepNumber === Steps.Tests) {
              let test = new Test();
              test.name = data['name']
              test.blocks = [];
              this.parcels[this.indexes[0]].tests.push(test);
            } else { // Blocks
              let block = new Block();
              block.name = data['name']
              this.parcels[this.indexes[0]].tests[this.indexes[1]].blocks.push(block);
            }

            this.setData("parcels");
          }
        }
      ]
    });

    prompt.present();
  }

  /**
   * Show a dialog allowing to edit an item. 
   * itemType : the kind of item we edit (parcels, tests, blocks)
   */
  editItem(item, itemType: string) {
    let prompt = this.alertCtrl.create({
      title: 'Éditer',
      inputs: [{
        name: 'name',
        placeholder: 'Nom'
      }],
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: 'Enregistrer',
          handler: data => {
            let index = this.parcels.indexOf(item);
            let parcel = this.parcels[index];

            if (index > -1) {
              parcel.name = data['name'];
              this.setData("parcels");
            }
          }
        }
      ]
    });

    prompt.present();

  }

  /**
   * Delete the selected item. 
   * itemType : the kind of item that is deleted (parcels, tests, blocks).
   */
  deleteItem(item, itemType: string) {

    let index = this.parcels.indexOf(item);

    if (index > -1) {
      this.parcels.splice(index, 1);
      this.setData("parcels");
    }
  }

  itemClicked(item) {
    if (this.stepNumber < Steps.Blocks) {
      let itemIndex = this.listItems.indexOf(item);
      this.indexes[this.stepNumber] = itemIndex;
      this.navCtrl.push(ParcelsTestsPage, { step: this.stepNumber + 1, indexes: this.indexes });
    } else if (this.stepNumber === Steps.Blocks) {
        this.navCtrl.push(GifViewPage);
    }
  }

  /**
   * Set data to storage.  
   * key: the key to which we want to associate the value.
   */
  setData(key: string) {
    this.storage.set(key, JSON.stringify(this.parcels));
  }

  resetStorage() {
    this.storage.clear();
  }

}