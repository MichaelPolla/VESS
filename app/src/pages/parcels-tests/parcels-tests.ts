import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, AlertController } from 'ionic-angular';

/*

  Docs :
   - Introduction to lists : https://www.joshmorony.com/an-introduction-to-lists-in-ionic-2/
*/
@Component({
  selector: 'page-parcels-tests',
  templateUrl: 'parcels-tests.html'
})
export class ParcelsTestsPage {

  pageTitle = "Parcelles";
  items: any = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {
    this.getData();
  }

  addItem() {

    let prompt = this.alertCtrl.create({
      title: 'Add Item',
      inputs: [{
        name: 'title'
      }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add',
          handler: data => {
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
      title: 'Edit Note',
      inputs: [{
        name: 'title'
      }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
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