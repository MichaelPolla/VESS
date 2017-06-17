import { Notation1Page } from './../notation-1/notation-1';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

// Pages
import { CameraPage } from '../camera/camera';
import { DefiningLayerPage } from '../defining-layer/defining-layer';
import { LayerListPage } from '../layer-list/layer-list';
// Providers
import { DataService } from '../../providers/data-service';

@Component({
  selector: 'page-gif-view',
  templateUrl: 'gif-view.html'
})
export class GifViewPage {
  stepView: number;
  imageFile: string;
  title: string;

  constructor(
    private dataService: DataService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private translate: TranslateService) {

    //test if is the first step or other step
    if (this.navParams.get('stepView') == null) {
      this.stepView = 0;
      translate.get('BLOCK_EXTRACTION').subscribe((res: string) => {
        this.title = res;
      });
    } else {
      this.stepView = this.navParams.get('stepView');
      translate.get('BLOCK_OPENING').subscribe((res: string) => {
        this.title = res;
      });
    }

    //image in function of step
    switch (this.stepView) {
      case 0:
        this.imageFile = './assets/gifs/extraction.gif';
        break;
      case 3:
        this.imageFile = './assets/gifs/ouverture.gif';
        break;
    }

  }

  validationStep() {
    if (this.stepView == 0) {
      if (this.platform.is('core')) {
        // Running on desktop
        // Skipping CameraPage as it requires Cordova, unavailable on regular browser
        this.navCtrl.push(DefiningLayerPage, {
          stepView: this.stepView + 2
        })

      } else {
        this.navCtrl.push(CameraPage, {
          stepView: this.stepView + 1
        })
      }
    } else {
      this.dataService.setCurrentLayer(0);
      if (this.platform.is('core')) {
        // Running on desktop
        // Skipping CameraPage as it requires Cordova, unavailable on regular browser
        this.navCtrl.push(Notation1Page)
      } else {
        this.navCtrl.push(CameraPage, { stepView: 5 })
      }
    }
  }

}
