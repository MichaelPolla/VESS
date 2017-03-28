import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { Parcel, Test, Block } from '../../app/parcel';
// Pages
import { GifViewPage } from '../gif-view/gif-view';
// Providers
import { ParcelService } from '../../providers/parcel-service';

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

  pageTitle: string;
  stepNumber: number;
  stepName: string;
  listItems: any = [];
  parcels: Parcel[] = [];
  selected: number[];

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
          this.pageTitle = 'Parcelle "' + selectedParcel.name + '" - Tests';
          this.listItems = selectedParcel.tests;
          break;

        case Steps.Blocks:
          this.pageTitle = 'Parcelle "' + selectedParcel.name + '" - Test "' + selectedTest.name + '" - Blocs ';
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
    if (action == "add" || action == "edit") {
      let inputsList: any = [{ name: 'name', placeholder: 'Nom' }];
      switch (itemType) {
        case Steps.Blocks:
          inputsList[0].value = "Bloc ";
          break;
        case Steps.Parcels:
          inputsList.push({ name: 'ofag', placeholder: 'Identifiant OFAG' });
          break;
        case Steps.Tests:
          inputsList.push({ name: 'date', placeholder: 'Date', value: '28-03-2017' });
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
                    let parcel = new Parcel();
                    parcel.name = data['name'];
                    parcel.ofag = data['ofag'];
                    parcel.tests = [];
                    this.parcels.push(parcel);
                    break;
                  case Steps.Tests:
                    let test = new Test();
                    test.name = data['name'];
                    test.date = data['date'];
                    test.blocks = [];
                    this.parcels[this.selected[0]].tests.push(test);
                    break;
                  case Steps.Blocks:
                    let block = new Block();
                    block.name = data['name'];
                    block.layers = [];
                    this.parcels[this.selected[0]].tests[this.selected[1]].blocks.push(block);
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
