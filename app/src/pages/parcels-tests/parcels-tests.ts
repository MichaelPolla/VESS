import { UserType } from './../../models/user';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { Parcel, Test } from '../../models/parcel';
import { User } from '../../models/user';
// Pages
import { GifViewPage } from '../gif-view/gif-view';
// Providers
import { DataService } from '../../providers/data-service';
import { Utils } from '../../providers/utils';

/*
* TODOs :
* itemType: use a kind of enum ? to only allow "parcels", "tests" and "blocks"
*/


enum Steps {
  Parcels,
  Tests
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
  private user: User;
  private currentParcel: Parcel;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public dataService: DataService) { }

  ionViewDidLoad() {
    this.stepNumber = this.navParams.get('step');
    this.dataService.getParcels().then((value) => {
      if (value != null) {
        this.parcels = value;
        this.currentParcel = this.dataService.getCurrentParcel();
      }


      switch (this.stepNumber) {
        case Steps.Tests:
          this.pageTitle = "Tests";
          this.listHeader = "Parcelle : " + this.currentParcel.name;
          this.listItems = this.currentParcel.tests;
          break;

        default: // Steps.Parcels, hopefully
          this.stepNumber = Steps.Parcels;
          this.pageTitle = "Parcelles";
          this.listItems = this.parcels;
          break;
      }
      this.stepName = Steps[this.stepNumber];
    });

    //Todo : should not create a new user here if non-existent
    if (!this.user) {
      this.dataService.getUserInfo().then((value) => {
        if (value != null) {
          this.user = value;
        } else {
          this.user = new User({ firstName: "", lastName: "", userType: UserType.Anonymous, mail: "", idOfag: "" });
        }
      });
    }

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

    // Adding or Editing a Parcel or Test
    if (action == "add" || action == "edit") {
      let inputsList: any;
      switch (itemType) {
        case Steps.Parcels:
          inputsList = [{ name: 'name', placeholder: 'Nom', value: 'Parcelle ' }];
          inputsList.push({ name: 'ofag', placeholder: 'Identifiant OFAG', value: this.user.idOfag });
          break;
        case Steps.Tests:
          inputsList = [{ name: 'name', placeholder: 'Nom', value: 'Test ' }];
          inputsList.push({ name: 'date', placeholder: 'Date', value: Utils.getCurrentDatetime('dd/MM/y') });
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
                    let test = new Test({ name: data['name'], date: data['date'], layers: [] });
                    let parcelIndex = this.parcels.indexOf(this.dataService.getCurrentParcel());
                    console.log(parcelIndex);
                    this.parcels[parcelIndex].tests.push(test);
                    break;
                }
                this.dataService.save("parcels", this.parcels);

              } else { // edit
                let index = this.parcels.indexOf(item);
                let parcel = this.parcels[index];

                if (index > -1) {
                  parcel.name = data['name'];
                  this.dataService.save("parcels", this.parcels);
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
        this.dataService.save("parcels", this.parcels);
      }
    }
  }

  itemClicked(item) {
    let itemIndex = this.listItems.indexOf(item);
    switch (this.stepNumber) {
      case Steps.Parcels:
        this.dataService.setCurrentParcel(itemIndex);
        this.navCtrl.push(ParcelsTestsPage, { step: this.stepNumber + 1 });
        break;
      case Steps.Tests:
        this.dataService.setCurrentTest(itemIndex);
        this.navCtrl.push(GifViewPage);
        break
    }
  }

  resetStorage() {
    this.storage.clear();
  }
}
