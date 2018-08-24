import { Component } from "@angular/core";
import { NavController, NavParams, Platform } from "ionic-angular";

import { Test, Steps } from "../../models/parcel";
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
  public description: string;
  stepView: number;
  imageFile: string;
  title: string;
  private currentTest: Test;

  constructor(
    private dataService: DataService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private translate: TranslateProvider
  ) {}

  ionViewDidLoad() {
    this.currentTest = this.dataService.getCurrentTest();
    switch (this.currentTest.step) {
      case Steps.EXTRACTING_BLOCK:
        this.title = this.translate.get("BLOCK_EXTRACTION");
        this.imageFile = "./assets/gifs/1extraction_bloc.gif";
        break;
      case Steps.OPENING_BLOCK:
        this.title = this.translate.get("BLOCK_OPENING");
        this.imageFile = "./assets/gifs/2ouverture_bloc.gif";
        this.description = this.translate.get("BLOCK_OPENING_DESCRIPTION");
        break;
    }
  }

  /**
   * Called when the user press the "Next" button.
   * Set the next step for the test.
   * If running on desktop it skips the CameraPage as it requires Cordova, unavailable on regular browser.
   */
  validationStep() {
    switch(this.currentTest.step) {
      case Steps.EXTRACTING_BLOCK:
        if (this.platform.is("core")) {
          this.currentTest.step = Steps.OPENING_BLOCK;
          this.navCtrl.push(GifViewPage);
        } else {
          this.currentTest.step = Steps.PICTURE_EXTRACTED_BLOCK;
          this.navCtrl.push(CameraPage);
        }
      break;
      case Steps.OPENING_BLOCK:
      this.currentTest.step = Steps.DEFINING_LAYERS;
      this.navCtrl.push(DefiningLayerPage);
    }
  }
}
