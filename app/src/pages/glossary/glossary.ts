import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

// Pages
import { GlossaryDefinitionPage } from "./../glossary-definition/glossary-definition";

// Providers
import { TranslateProvider } from "../../providers/translate/translate";

export interface GlossaryEntry {
  id: string;
  value?: string;
}

@Component({
  selector: "page-glossary",
  templateUrl: "glossary.html"
})
export class GlossaryPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateProvider
  ) {}

  glossaryEntries: GlossaryEntry[] = [
    { id: "AGGREGATE" },
    { id: "ANOXIA" },
    { id: "CLOD" },
    { id: "CRACK" },
    { id: "POROSITY_VISIBLE_TO_EYE" },
    { id: "SOIL_FRAGMENT" },
    { id: "VISIBLE_COARSE_PORE" }
  ];

  ionViewDidLoad() {
    // Set the values (= localized texts) of the glossary entries
    for (let glossaryEntry of this.glossaryEntries) {
      glossaryEntry.value = this.translate.get(glossaryEntry.id);
    }
    // Sort glossary alphabetically
    this.glossaryEntries.sort((a, b) => a.value.localeCompare(b.value));

   }

  itemSelected(item: GlossaryEntry) {
    console.log(item.id);
    this.navCtrl.push(GlossaryDefinitionPage, { glossaryEntry: item });
  }
}
