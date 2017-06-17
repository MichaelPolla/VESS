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
  private currentTest: Test;
  private heightRuler: number;
  private nbLayers: number;
  private imageFile: string;
  private listLayers: Layer[];
  private nbLayersOld: number;
  private stepView: number;
  private thickness:number;
  private totalSize: number;

  constructor(
    public alertCtrl: AlertController,
    private dataService: DataService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    public rulerService: RulerService,
    private toasts: Toasts,
    ) { }

  ionViewDidLoad() {
    this.stepView = this.navParams.get('stepView');
    this.imageFile = this.navParams.get('picture');
    this.currentTest = this.dataService.getCurrentTest();
    
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
    this.nbLayers = this.currentTest.layers ? this.currentTest.layers.length : 1;
    this.thickness = this.currentTest.thickness ? this.currentTest.thickness : 30;
    this.nbLayersOld = this.nbLayers;

    this.listLayers = this.currentTest.layers ? this.currentTest.layers:[(new Layer(1,1))];
    this.calcTotalSize();

  }

  changeNbLayers(nbLayers) {
    if (nbLayers < this.nbLayersOld) {
      for(let i=0; i< this.nbLayersOld-nbLayers; i++){
        this.listLayers.pop();
      }
    } else {
      for(let i=0; i< nbLayers-this.nbLayersOld; i++){

        this.listLayers.push(new Layer(this.nbLayersOld+i+1, 1))
      }

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
      this.totalSize += layer.thickness;
    }
  }

  validationStep() {
    if (this.nbLayers >= 1 && this.nbLayers <= 5) {
      if(this.thickness == this.totalSize){
        if(this.thickness>=30){
          this.currentTest.thickness = this.thickness;
          this.dataService.saveParcels();
          this.navCtrl.push(GifViewPage, {
            stepView: this.stepView + 1
          });
        }else{
          this.showRadioAlert();
        }
      }else{
        this.showAlert("Erreur","La taille totale des couches n'égale pas l'épaisseur saisie. Veuillez renseigner correctement les champs");
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
            this.showAlert('Sol caillouteux', 'Le résultat du test à la bêche sera donc basé sur les tests déjà renseignés.');
            this.navCtrl.push(ParcelsTestsPage, { step: 2 });
          break;
          case 'dry':
            this.showAlert('Sol trop sec', 'Veuillez sortir une nouvelle motte');
            this.navCtrl.push(GifViewPage);
          break;
          case 'hard':
            this.showAlert('Sol trop dur', 'On affecte la note de 5 à la couche compacte de '+this.thickness+' (cm)');
            //#########################il faudra enregistrer la note ici###################################3
          break;

        }
      }
    });

    alert.present();
  }

}
