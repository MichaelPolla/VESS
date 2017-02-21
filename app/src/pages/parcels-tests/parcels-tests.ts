import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, NavParams } from 'ionic-angular';

/*

  Docs :
   - Introduction to lists : https://www.joshmorony.com/an-introduction-to-lists-in-ionic-2/
* 
* TODOs :
* itemType: use a kind of enum ? to only allow "parcels", "tests" and "layers"
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

  pageTitle: string;
  stepNumber: number;
  stepName: string;
  items: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage) {
    this.stepNumber = this.navParams.get('step');
    switch (this.stepNumber) {
      case Steps.Tests:
        this.pageTitle = "Tests";
        break;
      case Steps.Layers:
        this.pageTitle = "Couches";
        break;
      default:
        this.stepNumber = Steps.Parcels;
        this.pageTitle = "Parcelles";
        break;
    }
    this.stepName = Steps[this.stepNumber];
    this.getData(this.stepName);
  }

  /**
   * Add a new item from a dialog.  
   * itemType : the kind of item we want to add (parcels, tests, layers)
   */
  addItem(itemType: string) {
    //TODO : adjust depending of the step ("Ajouter parcelle", "Ajouter couche"...)
    let prompt = this.alertCtrl.create({
      title: 'Ajouter un élément',
      inputs: [{
        name: 'title',
        placeholder: 'Nom'
      }],
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: 'Ajouter',
          handler: data => {
            this.items.push(data);
            this.setData(itemType);
          }
        }
      ]
    });

    prompt.present();
  }

  /**
   * Show a dialog allowing to edit an item. 
   * itemType : the kind of item we edit (parcels, tests, layers)
   */
  editItem(item, itemType: string) {
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
              this.setData(itemType);
            }
          }
        }
      ]
    });

    prompt.present();

  }

  /**
   * Delete the selected item. 
   * itemType : the kind of item that is deleted (parcels, tests, layers).
   */
  deleteItem(item, itemType: string) {

    let index = this.items.indexOf(item);

    if (index > -1) {
      this.items.splice(index, 1);
      this.setData(itemType);
    }
  }

  itemClicked() {
    //TODO : don't increment stepNumber if already at last step
    this.navCtrl.push(ParcelsTestsPage, { step: this.stepNumber + 1 });
  }

  /**
   * Set data to storage.  
   * key: the key to which we want to associate the value.
   */
  setData(key: string) {
    this.storage.set(key, this.items);
  }

  /**
   * Get data from storage.  
   * key: the key from which we want to retrieve the value.
   */
  getData(key: string) {
    this.storage.get(key).then((data) => {
      if (data != null) {
        this.items = data;
      }
    });
  }

  resetStorage() {
    this.storage.clear();
  }

}