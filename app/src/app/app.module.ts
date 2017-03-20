import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

// Pages
import { CameraPage } from '../pages/camera/camera';
import { DefiningLayerPage } from '../pages/defining-layer/defining-layer';
import { GifViewPage } from '../pages/gif-view/gif-view';
import { HomePage } from '../pages/home-page/home-page';
import { LayerListPage } from '../pages/layer-list/layer-list';
import { ModalPicturePage } from '../pages/modal-picture/modal-picture';
import { Notation1Page } from '../pages/notation-1/notation-1';
import { Notation2Page } from '../pages/notation-2/notation-2';
import { ParcelsTestsPage } from '../pages/parcels-tests/parcels-tests';
import { ResultsPage } from '../pages/results/results';

// Providers
import { NotationService } from '../providers/notation-service';
import { ParcelService } from '../providers/parcel-service';
import { RulerService } from '../providers/ruler-service';
import { FooterComponent } from '../components/footer/footer';

@NgModule({
  declarations: [
    CameraPage,
    DefiningLayerPage,
    GifViewPage,
    HomePage,
    LayerListPage,
    ModalPicturePage,
    Notation1Page,
    MyApp,
    Notation2Page,
    ParcelsTestsPage,
    ResultsPage,
    FooterComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CameraPage,
    DefiningLayerPage,
    GifViewPage,
    HomePage,
    LayerListPage,
    ModalPicturePage,
    MyApp,
    Notation1Page,
    Notation2Page,
    ParcelsTestsPage,
    ResultsPage,
    FooterComponent
  ],
  providers: [NotationService, ParcelService, RulerService, Storage]
})
export class AppModule { }
