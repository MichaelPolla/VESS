import { ModalPicturePage } from './../modal-picture/modal-picture';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
// Providers
import { TranslateProvider } from './../../providers/translate/translate';

@IonicPage()
@Component({
  selector: 'page-structural-quality',
  templateUrl: 'structural-quality.html',
})
export class StructuralQualityPage {
  private photos: any[] = [{ url: 'assets/pictures/structural_quality.jpg' }];
  public items: Array<{
    quality: string, 
    qualityTxt: string, 
    sizeAppearance: string, 
    porosity: String,
    appearance1: string, 
    appearance2: string, 
    distinctiveFeaturesImg: string, 
    distrinctiveFeatureTxt: string,
    aggreagatesImg: string, 
    aggreagatesTxt: string, 
    color: string
  }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private translate: TranslateProvider) {
  }

  ionViewDidLoad() {

    this.items = [
      {
        quality: this.translate.get('SQ1.QUALITY'),
        qualityTxt: this.translate.get('SQ1.QUALITY_DESCRIPTION'),
        sizeAppearance: this.translate.get('SQ1.SIZE_AND_APPEARANCE'),
        porosity: this.translate.get('SQ1.POROSITY_AND_ROOTS'),
        appearance1: "./assets/pictures/pas_motte_fermee.png",
        appearance2: "./assets/pictures/pas_motte_fermee.png",
        distinctiveFeaturesImg: "./assets/pictures/pas_motte_fermee.png",
        distrinctiveFeatureTxt: this.translate.get('SQ1.DISTINGUISHING_FEATURE'),
        aggreagatesImg: "./assets/pictures/aggregat_moins_1cm.png",
        aggreagatesTxt: this.translate.get('SQ1.APPEARANCE_OF_FRAGMENT'),
        color: "sq1"
      },
      {
        quality: this.translate.get('SQ2.QUALITY'),
        qualityTxt: this.translate.get('SQ2.QUALITY_DESCRIPTION'),
        sizeAppearance: this.translate.get('SQ2.SIZE_AND_APPEARANCE'),
        porosity: this.translate.get('SQ2.POROSITY_AND_ROOTS'),
        appearance1: "./assets/pictures/pas_motte_fermee.png",
        appearance2: "./assets/pictures/pas_motte_fermee.png",
        distinctiveFeaturesImg: "./assets/pictures/pas_motte_fermee.png",
        distrinctiveFeatureTxt: this.translate.get('SQ2.DISTINGUISHING_FEATURE'),
        aggreagatesImg: "./assets/pictures/aggregat_moins_1cm.png",
        aggreagatesTxt: this.translate.get('SQ2.APPEARANCE_OF_FRAGMENT'),
        color: "sq2"
      },
      {
        quality: this.translate.get('SQ3.QUALITY'),
        qualityTxt: this.translate.get('SQ3.QUALITY_DESCRIPTION'),
        sizeAppearance: this.translate.get('SQ3.SIZE_AND_APPEARANCE'),
        porosity: this.translate.get('SQ3.POROSITY_AND_ROOTS'),
        appearance1: "./assets/pictures/pas_motte_fermee.png",
        appearance2: "./assets/pictures/pas_motte_fermee.png",
        distinctiveFeaturesImg: "./assets/pictures/pas_motte_fermee.png",
        distrinctiveFeatureTxt: this.translate.get('SQ3.DISTINGUISHING_FEATURE'),
        aggreagatesImg: "./assets/pictures/aggregat_moins_1cm.png",
        aggreagatesTxt: this.translate.get('SQ3.APPEARANCE_OF_FRAGMENT'),
        color: "sq3"
      },
      {
        quality: this.translate.get('SQ4.QUALITY'),
        qualityTxt: this.translate.get('SQ4.QUALITY_DESCRIPTION'),
        sizeAppearance: this.translate.get('SQ4.SIZE_AND_APPEARANCE'),
        porosity: this.translate.get('SQ4.POROSITY_AND_ROOTS'),
        appearance1: "./assets/pictures/pas_motte_fermee.png",
        appearance2: "./assets/pictures/pas_motte_fermee.png",
        distinctiveFeaturesImg: "./assets/pictures/pas_motte_fermee.png",
        distrinctiveFeatureTxt: this.translate.get('SQ4.DISTINGUISHING_FEATURE'),
        aggreagatesImg: "./assets/pictures/aggregat_moins_1cm.png",
        aggreagatesTxt: this.translate.get('SQ4.APPEARANCE_OF_FRAGMENT'),
        color: "sq4"
      },
      {
        quality: this.translate.get('SQ5.QUALITY'),
        qualityTxt: this.translate.get('SQ5.QUALITY_DESCRIPTION'),
        sizeAppearance: this.translate.get('SQ5.SIZE_AND_APPEARANCE'),
        porosity: this.translate.get('SQ5.POROSITY_AND_ROOTS'),
        appearance1: "./assets/pictures/pas_motte_fermee.png",
        appearance2: "./assets/pictures/pas_motte_fermee.png",
        distinctiveFeaturesImg: "./assets/pictures/pas_motte_fermee.png",
        distrinctiveFeatureTxt: this.translate.get('SQ5.DISTINGUISHING_FEATURE'),
        aggreagatesImg: "./assets/pictures/aggregat_moins_1cm.png",
        aggreagatesTxt: this.translate.get('SQ5.APPEARANCE_OF_FRAGMENT'),
        color: "sq5"
      }
    ];
  }

  protected openModal() {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos,
      initialSlide: 0, // The second image
    });
    modal.present();
  }

  showModalPicture(imgSrc) {
    let pictureModal = this.modalCtrl.create(ModalPicturePage, { imgSrc: imgSrc, type: "picture" });
    pictureModal.present();
  }
}