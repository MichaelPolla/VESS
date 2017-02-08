import { Component } from '@angular/core';
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

  pageTitle = "Parcels";
  items: any = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

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
    }
  }

  itemClicked() {
    this.pageTitle = "Tests";
  }

}