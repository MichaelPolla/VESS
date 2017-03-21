import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Toast } from 'ionic-native';
import { ModalPicturePage } from '../modal-picture/modal-picture';
import { LayerListPage } from '../layer-list/layer-list';
import { Notation1Page } from '../notation-1/notation-1';
//service
import { RulerService } from '../../providers/ruler-service';

/*
  Generated class for the VerifNotation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-verif-notation',
  templateUrl: 'verif-notation.html'
})
export class VerifNotationPage {
  //declaration of field
  heightRuler: number;
  score: number;
  items: Array<{ title: string, checked: Boolean, imgSrc?:string, code: number }>;
  criterias: Array<{ title:string, array :Array<{ title: string, checked: Boolean, imgSrc?:string, code: number }>}>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public rulerService: RulerService ) {}

  ionViewDidLoad() {


    // Get Height of Ruler in px with :
    // param1: height of image ruler in px
    // param 2: number of px for one centimeter in the image.
    this.rulerService.getHeightStyle(846, 56).then((value: number) => {
      this.heightRuler = value;
    }).catch((error: string) => {
      Toast.show(error, "long", "bottom").subscribe(toast => { console.log(toast); });
    });

    if (this.navParams.get('score') != null) {
      this.score = this.navParams.get('score');

      switch (this.score) {

        case 1:
          this.items = [
            { title: 'Très poreux, grumeleux (photo A)', checked: false, imgSrc: './assets/pictures/a-2.png', code: 1 },
            { title: 'Se séparent spontanément ou après une très pression', checked: false, code: 2 },
            { title: 'Sont maintenus entre eux par de nombreuses racines (photo B)', checked: false, imgSrc: './assets/pictures/b-1.png', code: 3 }
          ];
          this.criterias = [{title : 'Les agrégats d’environ 1cm sont :', array:this.items}];

          break;

        case 2:
          this.items = [
            { title: 'Poreux et arrondis (photo C)', checked: false, code: 1 },
            { title: 'Se séparent spontanément ou après une très faible pression', checked: false, code: 2 },
            { title: 'Contiennent des racines (photo D)', checked: false, code: 3 }
          ];
          this.criterias = [{title :'Les agrégats d’environ 1cm sont :', array:this.items}];
          break;
        case 3:
          this.items = [
            { title: 'Majoritairement poreux et arrondis (photo C)', checked: false, code: 1 },
            { title: 'Relativement facile à rompre', checked: false, code: 2 },
            { title: 'Contiennent des racines (photo D)', checked: false, code: 3 }
          ];
          this.criterias = [{title :'Les agrégats d’environ 1cm sont :', array:this.items}];
          this.criterias.push({title :'Présence possible de fragments* de sol non poreux, ne contenant pas ou peu de racines (photo E)', array: [{ title: 'Oui', checked: false, code: 1 }]});
          break;
        case 4:
          this.items = [
            { title: 'Non poreux, de forme cubique, aux bords anguleux', checked: false, code: 1 },
            { title: 'Contiennent très peu de racines', checked: false, code: 2 }
          ];
          this.criterias = [{title :'Les fragments de sol d’environ 1 cm sont :', array:this.items}];
          this.criterias.push({title :'Les racines se situent principalement autour des mottes ou au sein des pores grossiers visibles', array:[{ title: 'Oui', checked: false, code: 1 }]});
          break;
        case 5:
          this.items = [
            { title: 'Difficiles à obtenir ( sol compact)', checked: false, code: 1 },
            { title: 'Contiennent très peu ou pas de racines', checked: false, code: 2 }
          ];
          this.criterias = [{title :'Les fragments de sol d’environ 1 cm sont :', array:this.items}];
          this.criterias.push({title :'Les racines se situent autour principalement des mottes ou au sein des pores grossiers visibles', array:[{ title: 'Oui', checked: false, code: 1 }]});
          this.criterias.push({title :'Anoxie possible, couleur gris-bleu (odeur d’œuf pourri)', array:[{ title: 'Oui', checked: false, code: 1 }]});
          break;
      }
    }
  }

  showModal(item_index) {
    let imgSrc = this.items[item_index].imgSrc; // TODO: pass this parameter to the modal so it can be used to show the picture.
    let testModal = this.modalCtrl.create(ModalPicturePage, { imgSrc: imgSrc });
    testModal.present();
  }


  validationStep(){
    //cnt nb check and nb criteria
    let cntCriteria=0;
    let cntChecked=0;
    for (let criteria of this.criterias) {
      for (let item of criteria.array){
        cntCriteria+=1;
        if(item.checked==true){
          cntChecked+=1;
        }
      }
    }

    //Condition of criteria
    if(((cntChecked >= 2) && (cntCriteria==3)) || ((cntChecked >=3) && (cntCriteria==4))){//Notation ok
      this.navCtrl.push(LayerListPage, {
        score: this.score
      });
    }else if(cntChecked == 0){//Return to decision tree on wrong result
      this.navCtrl.push(Notation1Page);
    }else{//suggest to return to decision tree or valid notation
      console.log("Suggere de valider ou de retour arbre de decision")
    }
  }

}
