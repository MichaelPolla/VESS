import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

/*
  Generated class for the ParcelsTests page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.

  Docs : https://www.joshmorony.com/an-introduction-to-lists-in-ionic-2/
*/
@Component({
  selector: 'page-parcels-tests',
  templateUrl: 'parcels-tests.html'
})
export class ParcelsTestsPage {

  notes: any = [];



  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
      this.notes = [
            'Bread',
            'Milk',
            'Cheese',
            'Snacks',
            'Apples',
            'Bananas',
            'Peanut Butter',
            'Chocolate',
            'Avocada',
            'Vegemite',
            'Muffins',
            'Paper towels'
        ];
  }

  ionViewDidLoad() {
    console.log('Hello ParcelsTestsPage Page');
  }

  addNote(){
 
        let prompt = this.alertCtrl.create({
            title: 'Add Note',
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
                        this.notes.push(data);
                    }
                }
            ]
        });
 
        prompt.present();
    }
 
    editNote(note){
 
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
                        let index = this.notes.indexOf(note);
 
                        if(index > -1){
                          this.notes[index] = data;
                        }
                    }
                }
            ]
        });
 
        prompt.present();       
 
    }
 
    deleteNote(note){
 
        let index = this.notes.indexOf(note);
 
        if(index > -1){
            this.notes.splice(index, 1);
        }
    }

}
