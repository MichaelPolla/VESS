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
  public items: Array<{ title: string, picture: string, text: String }>;
  private list;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {


    this.list = [{
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
    }];
  }

  private openModal() {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos,
      initialSlide: 0, // The second image
    });
    modal.present();
  }



}