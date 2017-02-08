import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toast } from 'ionic-native';

/*
  Generated class for the Notation2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notation-2',
  templateUrl: 'notation-2.html'
})
export class Notation2Page {
  //declaration of field
  items: Array<{title: string, checked: Boolean, code2:number}>;
  title:string;
  code:number;
  code2:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.code = this.navParams.get('code');
    switch(this.code){

      case 1:
      this.title='La plupart des Agrégats obtenus en appliquant une très faible pression mesure...';
      //construction of the list
      this.items = [
        { title: 'Moins de 6 mm', checked: false, code2:1},
        { title: 'Jusqu\'à 7 cm', checked: false, code2:2 }
      ];
      break;

      case 2:
      Toast.show("Le niveau de terre est SQ3", "long", "bottom").subscribe(
        toast => {
            console.log(toast);
        }
      );
      break;

      case 3:
      this.title='Les mottes fermées font généralement plus de 10 cm';
      //construction of the list
      this.items = [
        { title: 'Moins de 30\% des mottes fermées mesurent moins de 7cm', checked: false, code2:1},
        { title: 'Presqu\'aucune motte ne mesure moins de 7 cm', checked: false, code2:2 }
      ];
      break;
    }

  }

  //Methods
  validationStep(){
    if(this.code == 1 && this.code2 == 1){
      Toast.show("Le niveau de terre est SQ1", "long", "bottom").subscribe(
        toast => {
            console.log(toast);
        }
      );
    }else if(this.code==1 && this.code2==2){
      Toast.show("Le niveau de terre est SQ2", "long", "bottom").subscribe(
        toast => {
            console.log(toast);
        }
      );
    }else if(this.code==3 && this.code2==1){
      Toast.show("Le niveau de terre est SQ4", "long", "bottom").subscribe(
        toast => {
            console.log(toast);
        }
      );
    }else if(this.code==3 && this.code2==2){
      Toast.show("Le niveau de terre est SQ5", "long", "bottom").subscribe(
        toast => {
            console.log(toast);
        }
      );
    }

  }

  updateCheckedBox(position, item){
    //declar var
    let cnt: number = 0;

    for(let item of this.items) {
      //if position selected
      if(position==cnt){
        item.checked=true;
        this.code2=item.code2;
      }else{
        item.checked=false;
      }
      cnt++;
    }
  }

  returnButton(){
    this.navCtrl.pop();
  }

}
