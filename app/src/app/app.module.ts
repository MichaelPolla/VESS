import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

// Pages
import { Notation1Page } from '../pages/notation-1/notation-1';
import { Notation2Page } from '../pages/notation-2/notation-2';
import { ModalPicturePage } from '../pages/modal-picture/modal-picture';
import { HomePage } from '../pages/home-page/home-page';
import { ParcelsTestsPage } from '../pages/parcels-tests/parcels-tests';
import { GifViewPage } from '../pages/gif-view/gif-view';
import { DefiningLayerPage } from '../pages/defining-layer/defining-layer';
import { CameraPage } from '../pages/camera/camera';
import { LayerListPage } from '../pages/layer-list/layer-list';

// Providers
import { ParcelService } from '../providers/parcel-service';
import { RulerService } from '../providers/ruler-service';

@NgModule({
  declarations: [
    CameraPage,
    MyApp,
    LayerListPage,
    Notation1Page,
    Notation2Page,
    ModalPicturePage,
    HomePage,
    ParcelsTestsPage,
    GifViewPage,
    DefiningLayerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CameraPage,
    MyApp,
    LayerListPage,
    Notation1Page,
    Notation2Page,
    ModalPicturePage,
    HomePage,
    ParcelsTestsPage,
    GifViewPage,
    DefiningLayerPage
  ],
  providers: [ParcelService, Storage, RulerService]
})
export class AppModule {}
