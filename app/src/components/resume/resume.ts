import { Layer } from "./../../models/parcel";
import { Component, Input } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { Test } from "../../models/parcel";
import { ExportPage } from "../../pages/export/export";
import { BrowserTab } from "@ionic-native/browser-tab";

// Providers
import { Utils } from "./../../providers/utils";

export class LayerInfo {
  public img?: string;
  public layer?: Layer;

  public constructor(layer: Layer) {
    this.layer = layer;
  }
}

@Component({
  selector: "component-resume-view",
  templateUrl: "resume.html"
})
export class ResumeComponent {
  @Input()
  resume: Test;

  public imageFileBlock: string;
  public lastNumLayer: number;
  public layerArray: LayerInfo[];
  defaultImage: string;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private browserTab: BrowserTab
  ) {}

  ngOnInit() {
    this.lastNumLayer = this.resume.layers.length;
    this.defaultImage = "./assets/icon/generic-image.png";
    this.imageFileBlock = this.resume.picture
      ? Utils.getPathForImage(this.resume.picture)
      : this.defaultImage;

    this.layerArray = [];
    for (let layer of this.resume.layers) //init all layers before read pictures of layer
      this.layerArray.push(new LayerInfo(layer));
    for (let layer of this.resume.layers) {
      this.layerArray[layer.num - 1].img = layer.picture
        ? Utils.getPathForImage(layer.picture)
        : this.defaultImage;
      this.layerArray = this.layerArray.slice(); // TODO: See if necessary
    }
  }

  openMap(event) {
    event.stopPropagation();

    this.browserTab.isAvailable().then((isAvailable: boolean) => {
      if (isAvailable) {
        this.browserTab.openUrl(
          "http://maps.google.com/maps?q=" +
            this.resume.geolocation.latitude +
            "," +
            this.resume.geolocation.longitude
        );
      }
    });
  }

  exportTest(event) {
    this.navCtrl.push(ExportPage, { test: this.resume });
  }
}
