import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Notation1Page } from '../pages/notation-1/notation-1';
import { Notation2Page } from '../pages/notation-2/notation-2';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { ModalPicturePage } from '../pages/modal-picture/modal-picture';
import { HomePage } from '../pages/home-page/home-page';

@NgModule({
  declarations: [
    MyApp,
    Notation1Page,
    Notation2Page,
    ItemDetailsPage,
    ListPage,
    ModalPicturePage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Notation1Page,
    Notation2Page,
    ItemDetailsPage,
    ListPage,
    ModalPicturePage,
    HomePage
  ],
  providers: []
})
export class AppModule {}
