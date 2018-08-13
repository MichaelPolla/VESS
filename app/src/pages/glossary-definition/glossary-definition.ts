import { GlossaryEntry } from '../glossary/glossary';
import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";

// Providers
import { TranslateProvider } from '../../providers/translate/translate';

@Component({
  selector: 'page-glossary-definition',
  templateUrl: 'glossary-definition.html',
})
export class GlossaryDefinitionPage {

  private title: string;
  private glossaryEntry: GlossaryEntry;
  private glossaryEntryDefinition: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  private translate: TranslateProvider) {
  }

  ionViewDidLoad() {
    this.glossaryEntry = this.navParams.get('glossaryEntry');
    this.title = this.translate.get("DEFINITION") + ": " + this.glossaryEntry.value;
    // The glossary entry definition key is made of the entry id followed by _DEFINITION
    this.glossaryEntryDefinition = this.translate.get(this.glossaryEntry.id + "_DEFINITION");
  }

}
