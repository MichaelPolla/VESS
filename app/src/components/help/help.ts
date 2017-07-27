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
        this.helpContent = this.translate.get('HELP.VERIFICATION.SCORE1');
        break;

      case "help_verif_score2":
      case "help_verif_score3": // same help for score 2 and score 3 verification
        this.helpContent = this.translate.get('HELP.VERIFICATION.SCORE2');
        break;

      case "help_verif_score4":
      case "help_verif_score5": // same help for score 4 and score 5 verification
        this.helpContent = this.translate.get('HELP.VERIFICATION.SCORE4');
        break;

      case "step1":
        this.helpContent = this.translate.get('HELP.NOTATION.STEP1', {
          "video1": this.imageToHtml("./assets/gifs/1extraction_bloc.gif"),
          "video2": this.imageToHtml("./assets/gifs/2ouverture_bloc.gif"),
          "video3": this.imageToHtml("./assets/gifs/5observation_horizon.gif")
        });
        break;

      case "step2_mainly_closed_clods":
        this.helpContent = this.translate.get('HELP.NOTATION.STEP2.MAINLY_CLOSED_CLODS', {
          "video1": this.imageToHtml("./assets/gifs/1extraction_bloc.gif"),
          "video2": this.imageToHtml("./assets/gifs/2ouverture_bloc.gif")
        });
        break;

      case "step2_no_closed_clods":
        this.helpContent = this.translate.get('HELP.NOTATION.STEP2.NO_CLOSED_CLODS', {
          "video": this.imageToHtml("./assets/gifs/5observation_horizon.gif")
        });
        break;

      default:
        this.helpContent = this.translate.get('HELP.UNAVAILABLE');
        break;
    }
  }

  /**
   * Generate the html code to insert an image.
   */
  private imageToHtml(imagePath: string): string {
    return `<p><img src="${imagePath}" style="" /></p>`;
  }
}
