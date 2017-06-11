import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'component-help-view',
  templateUrl: 'help.html'
})
export class HelpComponent {

  helpContent: string;

  @Input() helpId: string;
  constructor(
    public navCtrl: NavController,
    private translate: TranslateService) {}

  ngOnInit() {
    switch (this.helpId) {
      case "apparence_couche":
        this.helpContent = "Cochez la proposition qui se rapproche le plus de votre observation. \
        Pour cela, caractérisez la taille principale des agrégats directement observables après \
        l’extraction du bloc (VIDEO N°VESS 1) et la séparation des couches (VIDEO VESS 2). Puis \
        après avoir rapidement ouvert la couche de sol (VIDEO VESS 5), observez et recherchez la\
        présence d’agrégats* non poreux et de mottes fermées*.";
        break;

      case "pas_motte_fermee":
        this.helpContent = "Cochez la proposition qui se rapproche le plus de votre observation. \
        Pour cela après avoir rapidement ouvert la couche de sol (VIDEO VESS 5), observez la \
        couche de sol et caractérisez la taille principale des agrégats* directement obtenus lors de l’extraction."
        break;

      case "verif_pas_motte_fermee_1cm":
        this.helpContent = "Cochez la ou les proposition(s) qui se rapproche le plus de ce que vous observez.\
         Observez, manipulez, ouvrez les agrégats* de diamètre égal à 1cm environ."

      case "verif_pas_motte_fermee_7cm":
      case "verif_possible_mottes_fermees":
        this.helpContent = "Cochez la ou les proposition(s) qui se rapprochent le plus de votre observation. \
        Pour cela observez, manipulez, ouvrez les agrégats* de diamètre environ égal à 1,5 cm."
        break;

      case "majoritairement_mottes_fermees":
        this.helpContent = "Cochez la ou les proposition(s) qui se rapprochent le plus de votre observation. \
        Pour cela caractérisez la taille principale des agrégats* et mottes* directement observables après \
        l’extraction du bloc (VIDEO VESS 1) et la séparation des couches (VIDEO VESS 2)."
        break;

      case "verif_majoritairement_mottes_fermees": // same for SQ4 and SQ5
        this.helpContent = "Cochez la ou les proposition(s) qui se rapprochent le plus de votre observation. \
         Pour cela observez, manipulez et ouvrez les fragments * de sol issus de mottes fermées de diamètre environ égal à 1,5 cm."
        break;

      default:
        this.helpContent = "Aide non disponible.";
        break;
    }
  }
}
