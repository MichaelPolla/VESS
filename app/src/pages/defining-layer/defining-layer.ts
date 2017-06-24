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
import { TranslateProvider } from '../../providers/translate/translate'


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
    private translate: TranslateProvider
    ) { }

  ionViewDidLoad() {
    this.stepView = this.navParams.get('stepView');
    this.imageFile = this.navParams.get('picture');
    this.currentTest = this.dataService.getCurrentTest();
    
    if (!this.platform.is('core')) {
      this.rulerService.getHeightStyle(846, 56).then((value: number) => {
        this.heightRuler = value;
      }).catch((error: string) => {
        this.toasts.showToast(error);
      });
    }

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
        this.showAlert(this.translate.get('ERROR'), this.translate.get('ERROR_SIZE_OF_LAYERS'));
      }

    } else {
      this.showAlert(this.translate.get('ERROR'), this.translate.get('PLEASE_FILL_IN_FIELDS_CORRECTLY'));
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
    alert.setTitle(this.translate.get('BLOCK_SIZE_TOO_SMALL_PLEASE_SPECIFY_WHY'));

    alert.addInput({
      type: 'radio',
      label: this.translate.get('STONY_SOIL'),
      value: 'stony',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: this.translate.get('TOO_DRY_SOIL'),
      value: 'dry',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: this.translate.get('TOO_HARD_SOIL'),
      value: 'hard',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        switch(data){
          case 'stony':
            this.showAlert(this.translate.get('STONY_SOIL'), this.translate.get('STONY_SOIL_NOTATION'));
            this.navCtrl.push(ParcelsTestsPage, { step: 2 });
          break;
          case 'dry':
            this.showAlert(this.translate.get('TOO_DRY_SOIL'), this.translate.get('PLEASE_EXTRACT_A_NEW_BLOCK'));
            this.navCtrl.push(GifViewPage);
          break;
          case 'hard':
            this.showAlert(this.translate.get('TOO_HARD_SOIL'), this.translate.get('TOO_HARD_SOIL_NOTATION', {size: this.thickness}));
            //#########################il faudra enregistrer la note ici###################################3
          break;

        }
      }
    });

    alert.present();
  }

}
