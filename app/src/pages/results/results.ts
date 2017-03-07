import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
