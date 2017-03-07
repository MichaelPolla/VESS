import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Results page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {

  noteOf: string;
  note: number;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    this.noteOf = "de la couche"
  }

}
