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
  tests: any = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.items = [new Object({title:'parcel 1'}), 
                  new Object({title:'parcel 2'})];
    this.tests = [new Object({title:'test 1'}), 
                  new Object({title:'test 2'})];
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
            console.log(data['title']);
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