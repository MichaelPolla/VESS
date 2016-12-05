import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Notation1Page} from '../notation-1/notation-1';

/*
  Generated class for the HomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home-page',
  templateUrl: 'home-page.html'
})
export class HomePage{

  constructor(public navCtrl: NavController) {}


  goNotation(){
    this.navCtrl.push(Notation1Page).catch(()=> console.log('should I stay or should I go now'))
  }
}
