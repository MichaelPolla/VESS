import { Notation1Page } from "./../notation-1/notation-1";
import { Component } from "@angular/core";
import { NavController, NavParams, Platform } from "ionic-angular";

// Pages
import { CameraPage } from "../camera/camera";
import { DefiningLayerPage } from "../defining-layer/defining-layer";
// Providers
import { DataService } from "../../providers/data-service";
import { TranslateProvider } from "../../providers/translate/translate";

@Component({
  selector: "page-gif-view",
  templateUrl: "gif-view.html"
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
    private translate: TranslateProvider
  ) {
    //test if is the first step or other step
    if (this.navParams.get("stepView") == null) {
      this.stepView = 0;
      this.title = translate.get("BLOCK_EXTRACTION");
    } else {
      this.stepView = this.navParams.get("stepView");
      this.title = translate.get("BLOCK_OPENING");
    }

    //image in function of step
    switch (this.stepView) {
      case 0:
        this.imageFile = "./assets/gifs/1extraction_bloc.gif";
        break;
      case 3:
        this.imageFile = "./assets/gifs/2ouverture_bloc.gif";
        break;
    }
  }

  validationStep() {
    if (this.stepView == 0) {
      if (this.platform.is("core")) {
        // Running on desktop
        // Skipping CameraPage as it requires Cordova, unavailable on regular browser
        this.navCtrl.push(DefiningLayerPage, {
          stepView: this.stepView + 2
        });
      } else {
        this.navCtrl.push(CameraPage, {
          stepView: this.stepView + 1
        });
      }
    } else {
      this.dataService.setCurrentLayer(0);
      if (this.platform.is("core")) {
        // Running on desktop
        // Skipping CameraPage as it requires Cordova, unavailable on regular browser
        this.navCtrl.push(Notation1Page);
      } else {
        this.navCtrl.push(CameraPage, { stepView: 5 });
      }
    }
  }
}
