import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TutorialPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  public items: Array<{ title: string, picture: string, text: String}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [];
    this.items.push({title: "Extraire le bloc", picture: "./assets/gifs/1extraction_bloc.gif", text:"swekfjoief iosjf fijw ofijw ofij weofj wef"});
    this.items.push({title: "Ouverture du bloc en couche", picture: "./assets/gifs/2ouverture_bloc.gif", text:"rww rth fijw ofijw ofthirthj weofj wef"});
    this.items.push({title: "Enlever les parties tassées", picture: "./assets/gifs/3enlever_parties_tassees.gif", text:"thwr hrt fijw ofijw ofij trth wef"});
    this.items.push({title: "Obsercation de l'horizon 1", picture: "./assets/gifs/5observation_horizon.gif", text:"thwr hrt fijw ofijw ofij trth wef"});
    this.items.push({title: "Obsercation de l'horizon 2", picture: "./assets/gifs/6observation_horizon2.gif", text:"thwr hrt fijw ofijw ofij trth wef"});
    this.items.push({title: "Obsercation de l'horizon 3", picture: "./assets/gifs/7observation_horizon3.gif", text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis at diam ac mattis. Aenean nisl neque, scelerisque et velit sit amet, scelerisque auctor quam. Quisque aliquet scelerisque faucibus. Fusce tempus faucibus arcu quis blandit. Donec vitae interdum quam. Duis eget maximus mi. Nulla dapibus tempus turpis quis lacinia. Pellentesque pulvinar, ligula ac lobortis laoreet, lacus nisi sollicitudin nunc, quis ornare mauris velit sit amet nisi. Proin egestas eleifend turpis, in accumsan tellus congue a. Phasellus tristique justo id turpis laoreet vulputate. In d sf dsffvesr owiejv coijvc oej voiwejv oiwejv oiwej voiwej voiwej voije voijwe ovijwe oivj weoivj weoivj woeijv owiejv oiwejv oiwejv oiwejvo weoij weoivj weoijv oi wiejv oiwj voiwej voiwejvoiwej voiwej oiwej voiwej voijwe voijweeoijweov jweoivj owiejv oiwejv e222222222"});
    this.items.push({title: "Motte ouverte", picture: "./assets/gifs/8motte_ouverte.gif", text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis at diam ac mattis. Aenean nisl neque, scelerisque et velit sit amet, scelerisque auctor quam. Quisque aliquet scelerisque faucibus. Fusce tempus faucibus arcu quis blandit. Donec vitae interdum quam. Duis eget maximus mi. Nulla dapibus tempus turpis quis lacinia. Pellentesque pulvinar, ligula ac lobortis laoreet, lacus nisi sollicitudin nunc, quis ornare mauris velit sit amet nisi. Proin egestas eleifend turpis, in accumsan tellus congue a. Phasellus tristique justo id turpis laoreet vulputate. In d sf dsffvesr owiejv coijvc oej voiwejv oiwejv oiwej voiwej voiwej voije voijwe ovijwe oivj weoivj weoivj woeijv owiejv oiwejv oiwejv oiwejvo weoij weoivj weoijv oi wiejv oiwj voiwej voiwejvoiwej voiwej oiwej voiwej voijwe voijweeoijweov jweoivj owiejv oiwejv e222222222"});
    this.items.push({title: "Motte fermée", picture: "./assets/gifs/9motte_fermee.gif", text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis at diam ac mattis. Aenean nisl neque, scelerisque et velit sit amet, scelerisque auctor quam. Quisque aliquet scelerisque faucibus. Fusce tempus faucibus arcu quis blandit. Donec vitae interdum quam. Duis eget maximus mi. Nulla dapibus tempus turpis quis lacinia. Pellentesque pulvinar, ligula ac lobortis laoreet, lacus nisi sollicitudin nunc, quis ornare mauris velit sit amet nisi. Proin egestas eleifend turpis, in accumsan tellus congue a. Phasellus tristique justo id turpis laoreet vulputate. In d sf dsffvesr owiejv coijvc oej voiwejv oiwejv oiwej voiwej voiwej voije voijwe ovijwe oivj weoivj weoivj woeijv owiejv oiwejv oiwejv oiwejvo weoij weoivj weoijv oi wiejv oiwj voiwej voiwejvoiwej voiwej oiwej voiwej voijwe voijweeoijweov jweoivj owiejv oiwejv e222222222"});
  }

}
