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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public parcelService: ParcelService) { }

  ionViewDidLoad() {
    this.stepNumber = this.navParams.get('step');
    if (this.navParams.get('indexes') != null) {
      this.indexes = this.navParams.get('indexes');
    }
    this.parcelService.getParcels().then((value) => {
      if (value != null) {
        this.parcels = value;
      }

      let selectedParcel = this.parcels[this.indexes[0]];
      let selectedTest = selectedParcel ? this.parcels[this.indexes[0]].tests[this.indexes[1]] : null;
      switch (this.stepNumber) {
        case Steps.Tests:
          this.pageTitle = selectedParcel.name;
          this.listItems = selectedParcel.tests;
          break;

        case Steps.Blocks:
          this.pageTitle = selectedParcel.name + " - " + selectedTest.name;
          this.listItems = selectedTest.blocks;
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
   * Add, edit or delete an item.
   * action : the action to do with the item (add, edit or delete)
   * item : the selected item.
   * itemType : the kind of item we edit (parcels, tests, blocks)
   */
  manageItem(action: string, item, itemType: string) {
    let title;
    switch (action) {
      case "add":
        title = "Ajouter";
        break;
      case "edit":
        title = "Éditer"
        break;
    }
    if (action == "add" || action == "edit") {
      let prompt = this.alertCtrl.create({
        title: title,
        inputs: [{
          name: 'name',
          placeholder: 'Nom'
        }],
        buttons: [
          {
            text: 'Annuler'
          },
          {
            text: 'Valider',
            handler: data => {
              if (action == "add") {
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
                this.parcelService.save("parcels", this.parcels);

              } else { // edit
                let index = this.parcels.indexOf(item);
                let parcel = this.parcels[index];

                if (index > -1) {
                  parcel.name = data['name'];
                  this.parcelService.save("parcels", this.parcels);
                }
              }
            }
          }
        ]
      });
      prompt.present();
    }

    // TODO : add deletion confirmation
    else if (action == "delete") {
      let index = this.parcels.indexOf(item);

      if (index > -1) {
        this.parcels.splice(index, 1);
        this.parcelService.save("parcels", this.parcels);
      }
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

  resetStorage() {
    this.storage.clear();
  }
}