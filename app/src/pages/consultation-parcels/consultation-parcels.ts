import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, NavParams, ModalController } from 'ionic-angular';

import { Parcel, Test } from '../../models/parcel';
// Pages
import { ModalPicturePage } from '../modal-picture/modal-picture';
// Providers
import { DataService } from '../../providers/data-service';
import { Utils } from '../../providers/utils';

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
  selector: 'page-consultation-parcels',
  templateUrl: 'consultation-parcels.html'
})
export class ConsultationParcelsPage {

  private pageTitle: string;
  private listHeader: string;
  private stepNumber: number;
  private stepName: string;
  private listItems: any = [];
  private parcels: Parcel[] = [];
  private selected: number[];
  private editMode: Boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public dataService: DataService,
    public modalCtrl:ModalController) { }

  ionViewDidLoad() {
    this.editMode=false;
    this.stepNumber = this.navParams.get('step');
    this.selected = this.dataService.selected;
    this.dataService.getParcels().then((value) => {
      if (value != null) {
        this.parcels = value;
      }

      let selectedParcel = this.parcels[this.selected[0]];
      switch (this.stepNumber) {
        case Steps.Tests:
          this.pageTitle = "Tests";
          this.listHeader = "Parcelle : " + selectedParcel.name;
          this.listItems = selectedParcel.tests;
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
  manageItem(event, action: string, item, itemType: number) {
    event.stopPropagation();

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
      let inputsList: any ;
      switch (itemType) {
        case Steps.Parcels:
          inputsList= [{ name: 'name', placeholder: 'Nom' , value : 'Parcelle '}];
          inputsList.push({ name: 'ofag', placeholder: 'Identifiant OFAG'});
          break;
        case Steps.Tests:
          inputsList= [{ name: 'name', placeholder: 'Nom', value: 'Test ' }];
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
                    let test = new Test({ name: data['name'], date: data['date'], layers: [] });
                    this.parcels[this.selected[0]].tests.push(test);
                    break;
                }
                this.dataService.save("parcels", this.parcels);

              } else { // edit

                switch (itemType) {
                  case Steps.Parcels:
                    let indexParcel = this.parcels.indexOf(item);
                    let parcel = this.parcels[indexParcel];
                    if (indexParcel > -1) {
                      parcel.name = data['name'];
                    }
                    break;
                  case Steps.Tests:
                    let indexTest = this.parcels[this.selected[0]].tests.indexOf(item);
                    let test = this.parcels[this.selected[0]].tests[indexTest];
                    if (indexTest > -1) {
                      test.name = data['name'];
                    }
                    break;
                }
                this.dataService.save("parcels", this.parcels);
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
      switch (itemType) {
        case Steps.Parcels:
          let indexParcel = this.parcels.indexOf(item);
          if (indexParcel > -1) {
            this.parcels.splice(indexParcel, 1);
          }
          break;
        case Steps.Tests:
          let indexTest = this.parcels[this.selected[0]].tests.indexOf(item);
          if (indexTest > -1) {
            this.parcels[this.selected[0]].tests.splice(indexTest, 1);
          }
          break;
      }
      this.dataService.save("parcels", this.parcels);
    }
  }

  itemClicked(event, item) {
    event.stopPropagation();
    let itemIndex = this.listItems.indexOf(item);
    if (this.stepNumber < Steps.Tests) {
      this.selected[this.stepNumber] = itemIndex;
      this.dataService.selected = this.selected;
      this.navCtrl.push(ConsultationParcelsPage, { step: this.stepNumber + 1 });
    } else if (this.stepNumber === Steps.Tests) {
      this.selected[this.stepNumber] = itemIndex;
      this.goResume(item);
    }
  }

  resetStorage() {
    this.storage.clear();
  }

  switchEditMode(){
    if(this.editMode){
      this.editMode=false;
    }else{
      this.editMode=true;
    }

  }

  goResume(item){
    let indexTest = this.parcels[this.selected[0]].tests.indexOf(item);
    let test = this.parcels[this.selected[0]].tests[indexTest];

    let modal = this.modalCtrl.create(ModalPicturePage, { type:"resume", resume: test });
    modal.present();
  }
}
