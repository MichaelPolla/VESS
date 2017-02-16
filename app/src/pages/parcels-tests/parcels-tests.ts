import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, NavParams } from 'ionic-angular';

/*

  Docs :
   - Introduction to lists : https://www.joshmorony.com/an-introduction-to-lists-in-ionic-2/
*/

enum Steps {
  Parcels,
  Tests,
  Layers
}

@Component({
  selector: 'page-parcels-tests',
  templateUrl: 'parcels-tests.html'
})
export class ParcelsTestsPage {



  pageTitle:string;
  step:number;
  items:any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage) {
    this.getData();
    this.step = this.navParams.get('step');
    switch(this.step) {
      case Steps.Tests:
        this.pageTitle = "Tests";
        break;
      case Steps.Layers:
        this.pageTitle = "Couches";
        break;
      default:
        this.step = Steps.Parcels;
        this.pageTitle = "Parcelles";
        break;
    }

  }

  addItem() {
    //TODO : adjust depending of the step ("Ajouter parcelle", "Ajouter couche"...)
    let prompt = this.alertCtrl.create({
      title: 'Ajouter un élément',
      inputs: [{
        name: 'title'
      }],
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: 'Ajouter',
          handler: data => {
            console.log("données :" + data);
            this.items.push(data);
            this.setData();
          }
        }
      ]
    });

    prompt.present();
  }

  editItem(item) {

    let prompt = this.alertCtrl.create({
      title: 'Éditer',
      inputs: [{
        name: 'title'
      }],
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: 'Enregistrer',
          handler: data => {
            let index = this.items.indexOf(item);

            if (index > -1) {
              this.items[index] = data;
              this.setData();
            }
          }
        }
      ]
    });

    prompt.present();

  }

  deleteItem(item) {

    let index = this.items.indexOf(item);

    if (index > -1) {
      this.items.splice(index, 1);
      this.setData();
    }
  }

  itemClicked() {
    //TODO : when an item is clicked, update the page to show next step (parcelle -> tests, tests -> couches, etc.)
    //this.pageTitle = "Tests";
    this.navCtrl.push(ParcelsTestsPage, {step: this.step+1});
  }

  setData() {
      this.storage.set('data', this.items);
  }

  getData() {
    this.storage.get('data').then ((data) => {
      if(data != null) {
        this.items = data;
      }
    });
  }

  resetStorage() {
    this.storage.clear();
  }

}