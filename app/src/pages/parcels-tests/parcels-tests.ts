import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { Parcel, Test, Block } from '../../app/parcel';
// Pages
import { GifViewPage } from '../gif-view/gif-view';
// Providers
import { ParcelService } from '../../providers/parcel-service';
import { Utils } from './../../providers/utils';

/*
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

  private pageTitle: string;
  private listHeader: string;
  private stepNumber: number;
  private stepName: string;
  private listItems: any = [];
  private parcels: Parcel[] = [];
  private selected: number[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public parcelService: ParcelService) { }

  ionViewDidLoad() {
    this.stepNumber = this.navParams.get('step');
    this.selected = this.parcelService.selected;
    this.parcelService.getParcels().then((value) => {
      if (value != null) {
        this.parcels = value;
      }

      let selectedParcel = this.parcels[this.selected[0]];
      let selectedTest = selectedParcel ? selectedParcel.tests[this.selected[1]] : null;
      switch (this.stepNumber) {
        case Steps.Tests:
          this.pageTitle = "Tests";
          this.listHeader = "Parcelle : " + selectedParcel.name;
          this.listItems = selectedParcel.tests;
          break;

        case Steps.Blocks:
          this.pageTitle = "Blocs";
          this.listHeader = "Parcelle : " + selectedParcel.name + " / Test : " + selectedTest.name;
          this.listItems = selectedTest.blocks;
          if (this.navParams.get('blockScore') != null) {
            selectedTest.blocks[this.selected[2]].score = this.navParams.get('blockScore');
          }
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
  manageItem(action: string, item, itemType: number) {
    let title;
    switch (action) {
      case "add":
        title = "Ajouter";
        break;
      case "edit":
        title = "Éditer"
        break;
    }
    // Adding a new Block
    if (action == "add" && itemType == Steps.Blocks) {
      let block = new Block({ name: "Bloc " + (this.parcels[this.selected[0]].tests[this.selected[1]].blocks.length + 1), layers: [] });
      this.parcels[this.selected[0]].tests[this.selected[1]].blocks.push(block);
      this.parcelService.save("parcels", this.parcels);
    }
    // Adding or Editing a Parcel or Test
    else if (action == "add" || action == "edit") {
      let inputsList: any = [{ name: 'name', placeholder: 'Nom' }];
      switch (itemType) {
        case Steps.Parcels:
          inputsList.push({ name: 'ofag', placeholder: 'Identifiant OFAG' });
          break;
        case Steps.Tests:
          inputsList.push({ name: 'date', placeholder: 'Date', value: Utils.getCurrentDatetime('dd/MM/y')});
          break;
      }
      let prompt = this.alertCtrl.create({
        title: title,
        inputs: inputsList,
        buttons: [
          {
            text: 'Annuler'
          },
          {
            text: 'Valider',
            handler: data => {

              if (action == "add") {
                switch (itemType) {
                  case Steps.Parcels:
                    let parcel = new Parcel({ name: data['name'], ofag: data['ofag'], tests: [] });
                    this.parcels.push(parcel);
                    break;
                  case Steps.Tests:
                    let test = new Test({ name: data['name'], date: data['date'], blocks: [] });
                    for (let i = 1; i <= 3; i++) {
                      test.blocks.push(new Block({ name: "Bloc " + i }));
                    }
                    this.parcels[this.selected[0]].tests.push(test);
                    break;
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

    // Deleting
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
    let itemIndex = this.listItems.indexOf(item);
    if (this.stepNumber < Steps.Blocks) {
      this.selected[this.stepNumber] = itemIndex;
      this.parcelService.selected = this.selected;
      this.navCtrl.push(ParcelsTestsPage, { step: this.stepNumber + 1 });
    } else if (this.stepNumber === Steps.Blocks) {
      this.selected[this.stepNumber] = itemIndex;
      this.navCtrl.push(GifViewPage);
    }
  }

  resetStorage() {
    this.storage.clear();
  }
}
