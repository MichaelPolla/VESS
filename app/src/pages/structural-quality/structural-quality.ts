import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import { ZoomableImage } from 'ionic-gallery-modal';

/**
 * Generated class for the StructuralQualityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-structural-quality',
  templateUrl: 'structural-quality.html',
})
export class StructuralQualityPage {
  private photos: any[] = [{url:'assets/pictures/structural_quality.jpg'}];
  public items: Array<{ quality: string, qualityTxt:string, sizeAppearance: string, porosity: String, 
                        appearance1:string, appearance2:string, distinctiveFeaturesImg:string, distrinctiveFeatureTxt:string, 
                        aggreagatesImg:string, aggreagatesTxt:string, color:string}>;
  private list;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {

    this.items = [];
    this.items.push({ quality: "SQ1 Friable", 
                qualityTxt:"Agrégats très friables entre les doigts sur la bêche", 
                sizeAppearance: "Majorité des agrégats <1cm.Le bloc de sol ne tient pas bien surla bêche. Pas de mottes fermées", 
                porosity: "Majorité des agrégats TRES poreux. Racines colonisant l’ensemble du sol, bien présentes à l’intérieur ainsi qu’autour des agrégats", 
                appearance1:"./assets/pictures/pas_motte_fermee.png", 
                appearance2:"./assets/pictures/pas_motte_fermee.png", 
                distinctiveFeaturesImg:"./assets/pictures/pas_motte_fermee.png", 
                distrinctiveFeatureTxt:"Agrégats très finset poreux", 
                aggreagatesImg:"./assets/pictures/aggregat_moins_1cm.png", 
                aggreagatesTxt:"Agrégats constitués d’agrégats plus petits, maintenus ensemble par les racines. Une très faible pression additionnelle suffit pour obtenir des agrégats de taille <0.6mm environ.",
                color:"greenTab"});
    this.items.push({ quality: "SQ2 Intact", 
                qualityTxt:"Agrégats très friables entre les doigts sur la bêche", 
                sizeAppearance: "Majorité des agrégats <1cm.Le bloc de sol ne tient pas bien surla bêche. Pas de mottes fermées", 
                porosity: "Majorité des agrégats TRES poreux. Racines colonisant l’ensemble du sol, bien présentes à l’intérieur ainsi qu’autour des agrégats", 
                appearance1:"./assets/pictures/pas_motte_fermee.png", 
                appearance2:"./assets/pictures/pas_motte_fermee.png", 
                distinctiveFeaturesImg:"./assets/pictures/pas_motte_fermee.png", 
                distrinctiveFeatureTxt:"Agrégats très finset poreux", 
                aggreagatesImg:"./assets/pictures/aggregat_moins_1cm.png", 
                aggreagatesTxt:"Agrégats constitués d’agrégats plus petits, maintenus ensemble par les racines. Une très faible pression additionnelle suffit pour obtenir des agrégats de taille <0.6mm environ.",
                color:"greenTab"});
    this.items.push({ quality: "SQ3 Ferme", 
                qualityTxt:"Agrégats très friables entre les doigts sur la bêche", 
                sizeAppearance: "Majorité des agrégats <1cm.Le bloc de sol ne tient pas bien surla bêche. Pas de mottes fermées", 
                porosity: "Majorité des agrégats TRES poreux. Racines colonisant l’ensemble du sol, bien présentes à l’intérieur ainsi qu’autour des agrégats", 
                appearance1:"./assets/pictures/pas_motte_fermee.png", 
                appearance2:"./assets/pictures/pas_motte_fermee.png", 
                distinctiveFeaturesImg:"./assets/pictures/pas_motte_fermee.png", 
                distrinctiveFeatureTxt:"Agrégats très finset poreux", 
                aggreagatesImg:"./assets/pictures/aggregat_moins_1cm.png", 
                aggreagatesTxt:"Agrégats constitués d’agrégats plus petits, maintenus ensemble par les racines. Une très faible pression additionnelle suffit pour obtenir des agrégats de taille <0.6mm environ.",
                color:"yellowTab"});
    this.items.push({ quality: "SQ4 Compact", 
                qualityTxt:"Agrégats très friables entre les doigts sur la bêche", 
                sizeAppearance: "Majorité des agrégats <1cm.Le bloc de sol ne tient pas bien surla bêche. Pas de mottes fermées", 
                porosity: "Majorité des agrégats TRES poreux. Racines colonisant l’ensemble du sol, bien présentes à l’intérieur ainsi qu’autour des agrégats", 
                appearance1:"./assets/pictures/pas_motte_fermee.png", 
                appearance2:"./assets/pictures/pas_motte_fermee.png", 
                distinctiveFeaturesImg:"./assets/pictures/pas_motte_fermee.png", 
                distrinctiveFeatureTxt:"Agrégats très finset poreux", 
                aggreagatesImg:"./assets/pictures/aggregat_moins_1cm.png", 
                aggreagatesTxt:"Agrégats constitués d’agrégats plus petits, maintenus ensemble par les racines. Une très faible pression additionnelle suffit pour obtenir des agrégats de taille <0.6mm environ.",
                color:"redTab"});
    this.items.push({ quality: "SQ5 Très compact", 
                qualityTxt:"Agrégats très friables entre les doigts sur la bêche", 
                sizeAppearance: "Majorité des agrégats <1cm.Le bloc de sol ne tient pas bien surla bêche. Pas de mottes fermées", 
                porosity: "Majorité des agrégats TRES poreux. Racines colonisant l’ensemble du sol, bien présentes à l’intérieur ainsi qu’autour des agrégats", 
                appearance1:"./assets/pictures/pas_motte_fermee.png", 
                appearance2:"./assets/pictures/pas_motte_fermee.png", 
                distinctiveFeaturesImg:"./assets/pictures/pas_motte_fermee.png", 
                distrinctiveFeatureTxt:"Agrégats très finset poreux", 
                aggreagatesImg:"./assets/pictures/aggregat_moins_1cm.png", 
                aggreagatesTxt:"Agrégats constitués d’agrégats plus petits, maintenus ensemble par les racines. Une très faible pression additionnelle suffit pour obtenir des agrégats de taille <0.6mm environ.",
                color:"redTab"});
    /*this.list = [{
      'title': 'Deck 1', 'cards':
      [
        { 'name': 'Card 1', 'img': 'https://princessdeficit.files.wordpress.com/2013/02/image45.jpg' },
        { 'name': 'Card 2', 'img': 'https://princessdeficit.files.wordpress.com/2013/02/image46.jpg' }
      ]
    },
    {
      'title': 'Deck 2', 'cards':
      [
        { 'name': 'Card 1', 'img': 'https://princessdeficit.files.wordpress.com/2013/02/image47.jpg' },
        { 'name': 'Card 2', 'img': 'https://princessdeficit.files.wordpress.com/2013/02/image48.jpg' }]
    }];*/
  }

  private openModal() {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos,
      initialSlide: 0, // The second image
    });
    modal.present();
  }



}