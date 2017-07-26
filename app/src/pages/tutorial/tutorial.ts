import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Providers
import { TranslateProvider } from './../../providers/translate/translate';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  public items: Array<{ title: string, picture: string, text: String}>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private translate: TranslateProvider) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        title: this.translate.get('TUTORIAL.STEP1.TITLE'), 
        picture: "./assets/gifs/1extraction_bloc.gif", 
        text: this.translate.get('TUTORIAL.STEP1.INSTRUCTIONS') 
      },
      {
        title: this.translate.get('TUTORIAL.STEP2.TITLE'), 
        picture: "./assets/gifs/2ouverture_bloc.gif", 
        text: this.translate.get('TUTORIAL.STEP2.INSTRUCTIONS')
      },
      {
        title: this.translate.get('TUTORIAL.STEP3.TITLE'), 
        picture: "./assets/gifs/3enlever_parties_tassees.gif", 
        text: this.translate.get('TUTORIAL.STEP3.INSTRUCTIONS')
      },
      {
        title: this.translate.get('TUTORIAL.STEP4.TITLE'), 
        picture: "./assets/gifs/5observation_horizon.gif", 
        text: this.translate.get('TUTORIAL.STEP4.INSTRUCTIONS')
      },
      {
        title: this.translate.get('TUTORIAL.STEP5.TITLE'),  
        picture: "./assets/gifs/6observation_horizon2.gif", 
        text: this.translate.get('TUTORIAL.STEP5.INSTRUCTIONS')
      },
      {
        title: this.translate.get('TUTORIAL.STEP6.TITLE'), 
        picture: "./assets/gifs/7observation_horizon3.gif", 
        text: this.translate.get('TUTORIAL.STEP6.INSTRUCTIONS')
      },
      {
        title: this.translate.get('TUTORIAL.STEP7.TITLE'), 
        picture: "./assets/gifs/8motte_ouverte.gif", 
        text: this.translate.get('TUTORIAL.STEP7.INSTRUCTIONS')
      },
      {
        title: this.translate.get('TUTORIAL.STEP8.TITLE'), 
        picture: "./assets/gifs/9motte_fermee.gif", 
        text: this.translate.get('TUTORIAL.STEP8.INSTRUCTIONS')
      }
    ];
  }

}
