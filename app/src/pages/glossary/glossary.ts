import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-glossary",
  templateUrl: "glossary.html"
})
export class GlossaryPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {}
}
