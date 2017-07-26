import { ModalPicturePage } from './../modal-picture/modal-picture';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';

@IonicPage()
@Component({
  selector: 'page-structural-quality',
  templateUrl: 'structural-quality.html',
})
export class StructuralQualityPage {
  private photos: any[] = [{ url: 'assets/pictures/structural_quality.jpg' }];
  public items: Array<{
    quality: string, qualityTxt: string, sizeAppearance: string, porosity: String,
    appearance1: string, appearance2: string, distinctiveFeaturesImg: string, distrinctiveFeatureTxt: string,
    aggreagatesImg: string, aggreagatesTxt: string, color: string
  }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {

    this.items = [];
    this.items.push({
      quality: "SQ1 Friable",
      qualityTxt: "Agrégats très friables entre les doigts sur la bêche",
      sizeAppearance: "Majorité des agrégats <1cm.Le bloc de sol ne tient pas bien surla bêche. Pas de mottes fermées",
      porosity: "Majorité des agrégats TRES poreux. Racines colonisant l’ensemble du sol, bien présentes à l’intérieur ainsi qu’autour des agrégats",
      appearance1: "./assets/pictures/pas_motte_fermee.png",
      appearance2: "./assets/pictures/pas_motte_fermee.png",
      distinctiveFeaturesImg: "./assets/pictures/pas_motte_fermee.png",
      distrinctiveFeatureTxt: "Agrégats très finset poreux",
      aggreagatesImg: "./assets/pictures/aggregat_moins_1cm.png",
      aggreagatesTxt: "Agrégats constitués d’agrégats plus petits, maintenus ensemble par les racines. Une très faible pression additionnelle suffit pour obtenir des agrégats de taille <0.6mm environ.",
      color: "sq1"
    });
    this.items.push({
      quality: "SQ2 Intact",
      qualityTxt: "Agrégats très friables entre les doigts sur la bêche",
      sizeAppearance: "Majorité des agrégats <1cm.Le bloc de sol ne tient pas bien surla bêche. Pas de mottes fermées",
      porosity: "Majorité des agrégats TRES poreux. Racines colonisant l’ensemble du sol, bien présentes à l’intérieur ainsi qu’autour des agrégats",
      appearance1: "./assets/pictures/pas_motte_fermee.png",
      appearance2: "./assets/pictures/pas_motte_fermee.png",
      distinctiveFeaturesImg: "./assets/pictures/pas_motte_fermee.png",
      distrinctiveFeatureTxt: "Agrégats très finset poreux",
      aggreagatesImg: "./assets/pictures/aggregat_moins_1cm.png",
      aggreagatesTxt: "Agrégats constitués d’agrégats plus petits, maintenus ensemble par les racines. Une très faible pression additionnelle suffit pour obtenir des agrégats de taille <0.6mm environ.",
      color: "sq2"
    });
    this.items.push({
      quality: "SQ3 Ferme",
      qualityTxt: "Agrégats très friables entre les doigts sur la bêche",
      sizeAppearance: "Majorité des agrégats <1cm.Le bloc de sol ne tient pas bien surla bêche. Pas de mottes fermées",
      porosity: "Majorité des agrégats TRES poreux. Racines colonisant l’ensemble du sol, bien présentes à l’intérieur ainsi qu’autour des agrégats",
      appearance1: "./assets/pictures/pas_motte_fermee.png",
      appearance2: "./assets/pictures/pas_motte_fermee.png",
      distinctiveFeaturesImg: "./assets/pictures/pas_motte_fermee.png",
      distrinctiveFeatureTxt: "Agrégats très finset poreux",
      aggreagatesImg: "./assets/pictures/aggregat_moins_1cm.png",
      aggreagatesTxt: "Agrégats constitués d’agrégats plus petits, maintenus ensemble par les racines. Une très faible pression additionnelle suffit pour obtenir des agrégats de taille <0.6mm environ.",
      color: "sq3"
    });
    this.items.push({
      quality: "SQ4 Compact",
      qualityTxt: "Agrégats très friables entre les doigts sur la bêche",
      sizeAppearance: "Majorité des agrégats <1cm.Le bloc de sol ne tient pas bien surla bêche. Pas de mottes fermées",
      porosity: "Majorité des agrégats TRES poreux. Racines colonisant l’ensemble du sol, bien présentes à l’intérieur ainsi qu’autour des agrégats",
      appearance1: "./assets/pictures/pas_motte_fermee.png",
      appearance2: "./assets/pictures/pas_motte_fermee.png",
      distinctiveFeaturesImg: "./assets/pictures/pas_motte_fermee.png",
      distrinctiveFeatureTxt: "Agrégats très finset poreux",
      aggreagatesImg: "./assets/pictures/aggregat_moins_1cm.png",
      aggreagatesTxt: "Agrégats constitués d’agrégats plus petits, maintenus ensemble par les racines. Une très faible pression additionnelle suffit pour obtenir des agrégats de taille <0.6mm environ.",
      color: "sq4"
    });
    this.items.push({
      quality: "SQ5 Très compact",
      qualityTxt: "Agrégats très friables entre les doigts sur la bêche",
      sizeAppearance: "Majorité des agrégats <1cm.Le bloc de sol ne tient pas bien surla bêche. Pas de mottes fermées",
      porosity: "Majorité des agrégats TRES poreux. Racines colonisant l’ensemble du sol, bien présentes à l’intérieur ainsi qu’autour des agrégats",
      appearance1: "./assets/pictures/pas_motte_fermee.png",
      appearance2: "./assets/pictures/pas_motte_fermee.png",
      distinctiveFeaturesImg: "./assets/pictures/pas_motte_fermee.png",
      distrinctiveFeatureTxt: "Agrégats très finset poreux",
      aggreagatesImg: "./assets/pictures/aggregat_moins_1cm.png",
      aggreagatesTxt: "Agrégats constitués d’agrégats plus petits, maintenus ensemble par les racines. Une très faible pression additionnelle suffit pour obtenir des agrégats de taille <0.6mm environ.",
      color: "sq5"
    });
  }

  showModalPicture(imgSrc) {
    let pictureModal = this.modalCtrl.create(ModalPicturePage, { imgSrc: imgSrc, type: "picture" });
    pictureModal.present();
  }
}