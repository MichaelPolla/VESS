import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateProvider } from './../../providers/translate/translate';

@Component({
  selector: 'component-help-view',
  templateUrl: 'help.html'
})
export class HelpComponent {

  helpContent: string;

  @Input() helpId: string;
  constructor(
    public navCtrl: NavController,
    private translate: TranslateProvider
  ) { }

  ngOnInit() {
    switch (this.helpId) {
      case "help_verif_score1":
        this.helpContent = this.translate.get('HELP_VERIF_SCORE1');
        break;

      case "help_verif_score2":
      case "help_verif_score3": // same help for score 2 and score 3 verification
        this.helpContent = this.translate.get('HELP_VERIF_SCORE2');
        break;

      case "help_verif_score4":
      case "help_verif_score5": // same help for score 4 and score 5 verification
        this.helpContent = this.translate.get('HELP_VERIF_SCORE4');
        break;

      case "layer_appearance":
        this.helpContent = this.translate.get('HELP_LAYER_APPEARANCE');
        break;

      case "step2_mainly_closed_clods":
        this.helpContent = this.translate.get('HELP_NOTATION_STEP2_MAINLY_CLOSED_CLODS');
        break;

      case "step2_no_closed_clods":
        this.helpContent = this.translate.get('HELP_NOTATION_STEP2_NO_CLOSED_CLODS');
        break;

      default:
        this.helpContent = this.translate.get('HELP_UNAVAILABLE');
        break;
    }
  }
}
