import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home-page/home-page';
import { ModalPicturePage } from '../modal-picture/modal-picture';

/*
  Generated class for the GifView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gif-view',
  templateUrl: 'gif-view.html'
})
export class GifViewPage {
  stepView:number;
  imageFile:string;
  titlePage:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //test if is the first step or other step
    if(this.navParams.get('stepView')==null){
      this.stepView = 0;
      this.titlePage = 'Extraction du bloc';
    }else{
      this.stepView = this.navParams.get('stepView');
      this.titlePage = 'Ouverture du bloc';
    }

    //image in function of step
    switch(this.stepView){
      case 0:
        this.imageFile='./assets/icon/mignon.gif';
      break;
      case 3:
        this.imageFile='./assets/icon/motte.png';
      break;
    }
  }

  validationStep(){
      if(this.stepView==0){
        this.navCtrl.push(ModalPicturePage, {
          stepView: this.stepView+1,
        }).catch(()=> console.log('should I stay or should I go now'))
      }else{
        this.navCtrl.push(GifViewPage, {
          stepView: this.stepView+3,
        }).catch(()=> console.log('should I stay or should I go now'))
      }

  }

  cancelButton(){
    this.navCtrl.push(HomePage, {
    }).catch(()=> console.log('should I stay or should I go now'))
  }

}
