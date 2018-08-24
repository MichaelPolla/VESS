
import { Test, Layer, Steps } from './../../models/parcel';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';

// Pages
import { CameraPage } from '../camera/camera';
import { GifViewPage } from '../gif-view/gif-view';
import { Notation1Page } from '../notation-1/notation-1';
//Providers
import { DataService } from '../../providers/data-service';
import { RulerService } from '../../providers/ruler-service';
import { Toasts } from '../../providers/toasts';
import { TranslateProvider } from '../../providers/translate/translate'
import { Utils } from '../../providers/utils';

enum SoilState {
  normal = "normal",
  dry = "dry",
  hard = "hard",
  stony = "stony"
}
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
  private thickness: number;
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
    this.currentTest = this.dataService.getCurrentTest();
    this.imageFile = Utils.getPathForImage(this.currentTest.picture);

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

    this.listLayers = this.currentTest.layers ? this.currentTest.layers : [(new Layer(1, 1, 0))];
    this.calcTotalSize();

  }

  changeNbLayers(nbLayers) {

    if (nbLayers < this.nbLayersOld) {
      for (let i = 0; i < this.nbLayersOld - nbLayers; i++) {
        this.listLayers.pop();
      }
    } else {
      for (let i = 0; i < nbLayers - this.nbLayersOld; i++) {
        this.listLayers.push(new Layer(this.nbLayersOld + i + 1, 1, 1));
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
      //set min thickness
      if(layer.num == 1)
        layer.minThickness = 0;
      else
        layer.minThickness = this.totalSize;

      layer.maxThickness = layer.minThickness+layer.thickness;
      this.totalSize += layer.thickness;
    }
  }

  /**
   * Check if all the required values are correctly set 
   * (number of layers, size of layers...).
   * If everything's ok, go to the next step.
   */
  validationStep() {
    if (this.nbLayers >= 1 && this.nbLayers <= 5) {
      if (this.thickness == this.totalSize) {
        this.currentTest.thickness = this.thickness;
        if (this.thickness >= 30) {
          this.currentTest.soilState = 'NORMAL_SOIL';
          this.dataService.setCurrentLayer(0);
          this.saveAndGoToNextStep(SoilState.normal);
        } else {
          this.showRadioAlert();
        }
      } else {
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
      value: SoilState.stony,
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: this.translate.get('TOO_DRY_SOIL'),
      value: SoilState.dry,
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: this.translate.get('TOO_HARD_SOIL'),
      value: SoilState.hard,
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        switch (data) {
          case SoilState.stony:
            this.showAlert(this.translate.get('STONY_SOIL'), this.translate.get('STONY_SOIL_NOTATION', { size: this.thickness }));
            this.currentTest.soilState = 'STONY_SOIL';
            this.saveAndGoToNextStep(SoilState.stony);
            break;
          case SoilState.dry:
            this.showAlert(this.translate.get('TOO_DRY_SOIL'), this.translate.get('PLEASE_EXTRACT_A_NEW_BLOCK'));
            this.currentTest.soilState = 'TOO_DRY_SOIL';            
            this.saveAndGoToNextStep(SoilState.dry);
            break;
          case SoilState.hard:
            this.showAlert(this.translate.get('TOO_HARD_SOIL'), this.translate.get('TOO_HARD_SOIL_NOTATION', { size: this.thickness }));
            this.currentTest.soilState = 'TOO_HARD_SOIL';
            this.saveAndGoToNextStep(SoilState.hard);
            break;

        }
      }
    });

    alert.present();
  }

  /**
    * Save data and go to the next test step, depending of the soil state.
    * @param soilState: The soil state.
    */
  private saveAndGoToNextStep(soilState: SoilState) {
    this.dataService.saveParcels();

    switch (soilState) {
      case SoilState.dry:
      this.currentTest.step = Steps.EXTRACTING_BLOCK;
      this.navCtrl.push(GifViewPage);
        break;
        
      default: // Normal, hard or stony soil
        if (this.platform.is('core')) {
          this.currentTest.step = Steps.NOTATION;
          this.navCtrl.push(Notation1Page);
        } else {
          this.currentTest.step = Steps.PICTURE_LAYER;
          this.navCtrl.push(CameraPage);
        }
    }
  }
}
