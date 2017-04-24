import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ParcelsTestsPage } from '../parcels-tests/parcels-tests';
import { ConsultationParcelsPage } from '../consultation-parcels/consultation-parcels'
import { ModalPicturePage } from '../modal-picture/modal-picture';

@Component({
  selector: 'page-home-page',
  templateUrl: 'home-page.html'
})
export class HomePage{

  constructor(public navCtrl: NavController, public modalCtrl:ModalController ) {}

  goNotation(){
    this.navCtrl.push(ParcelsTestsPage).catch(()=> console.log('should I stay or should I go now'));
  }

  goConsultation(){
    this.navCtrl.push(ConsultationParcelsPage).catch(()=> console.log('should I stay or should I go now'));
  }

  goResume(){
    let modal = this.modalCtrl.create(ModalPicturePage, { type:"resume" });
    modal.present();
  }
}
