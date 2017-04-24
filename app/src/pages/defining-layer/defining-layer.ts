import { Test, Layer } from './../../models/parcel';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
// Pages
import { GifViewPage } from '../gif-view/gif-view';
import { ParcelsTestsPage } from '../parcels-tests/parcels-tests';
//Providers
import { DataService } from '../../providers/data-service';
import { RulerService } from '../../providers/ruler-service';
import { Toasts } from '../../providers/toasts';


@Component({
  selector: 'page-defining-layer',
  templateUrl: 'defining-layer.html'
})
export class DefiningLayerPage {
  stepView: number;
  imageFile: string;
  nbLayers: number;
  nbLayersOld: number;
  sizeOfParcel: number;
  heightRuler: number;
  totalSize: number;
  thickness:number;
  private currentTest: Test;

  listLayers: Array<{ numLayer: number, sizeLayer: number }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataService: DataService,
    private platform: Platform,
    public rulerService: RulerService,
    private toasts: Toasts,
    public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    this.stepView = this.navParams.get('stepView');
    this.imageFile = this.navParams.get('picture');
    this.currentTest = this.dataService.getCurrentTest();
    console.log(this.currentTest)

    if (!this.platform.is('core')) {
      // Get Height of Ruler in px with :
      // param1: height of image ruler in px
      // param 2: number of px for one centimeter in the image.
      this.rulerService.getHeightStyle(846, 56).then((value: number) => {
        this.heightRuler = value;
      }).catch((error: string) => {
        this.toasts.showToast(error);
      });
    }

    //init nbLayers and listLayers and sizeOfParcel
    this.nbLayers = 1;
    this.thickness = 30;
    this.sizeOfParcel = 0;
    this.nbLayersOld = this.nbLayers;
    this.listLayers = [{ numLayer: 1, sizeLayer: 1 }];
    this.calcTotalSize();

  }

  changeNbLayers(nbLayers) {
    if (nbLayers < this.nbLayersOld) {
      this.listLayers.pop();
    } else {
      this.listLayers.push({ numLayer: nbLayers, sizeLayer: 1 });
    }
    this.nbLayersOld = nbLayers;
    this.calcTotalSize();
  }
  changeSizeLayers() {
    this.calcTotalSize();
  }
  calcTotalSize() {
    this.totalSize = 0;
    for (let layer of this.listLayers) {
      this.totalSize += layer.sizeLayer;
    }
  }

  validationStep() {
    if (this.nbLayers >= 1 && this.nbLayers <= 5) {

      for (var i = 1; i <= this.nbLayers; i++) {
        this.currentTest.layers.push(new Layer(i));
      }

      if(this.thickness == this.totalSize){
        if(this.thickness>=30){
          this.navCtrl.push(GifViewPage, {
            stepView: this.stepView + 1,
            nbLayers: this.nbLayers,
          });
        }else{
          this.showRadioAlert();
        }
      }else{
        this.showAlert("Erreur","La taille totale des couches n'égal pas l'épaisseur entrée, veuillez renseigner correctement les champs");
      }

    } else {
      this.showAlert("Erreur","Veuillez correctement renseigner les champs.");
    }
  }

  showAlert(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showRadioAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Épaisseur de la motte incorrecte');

    alert.addInput({
      type: 'radio',
      label: 'Sol caillouteux',
      value: 'stony',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Sol trop sec',
      value: 'dry',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Sol trop dur',
      value: 'hard',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        switch(data){
          case 'stony':
            this.showAlert('Sol caillouteux', 'Le resultat du test à la bêche sera donc basé sur les tests déjà renseignées.');
            this.navCtrl.push(ParcelsTestsPage, { step: 2 });
          break;
          case 'dry':
            this.showAlert('Sol trop sec', 'Veuillez sortir une nouvelle motte');
            this.navCtrl.push(GifViewPage).catch(()=> console.log('should I stay or should I go now'));
          break;
          case 'hard':
            this.showAlert('Sol trop dur', 'On affecte la notte de 5 à la couche compacte de '+this.thickness+' (cm)');
            //#########################il faudra enregistrer la note ici###################################3
          break;

        }
      }
    });

    alert.present();
  }

}
