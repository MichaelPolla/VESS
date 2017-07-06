import { AboutPage } from './../pages/about/about';
import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http, HttpModule } from '@angular/http';

import { MyApp } from './app.component';

// Ionic Native plugins
import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';
import { Geolocation} from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Toast } from '@ionic-native/toast';
import { InAppBrowser } from '@ionic-native/in-app-browser';

// Pages
import { CameraPage } from '../pages/camera/camera';
import { DefiningLayerPage } from '../pages/defining-layer/defining-layer';
import { ExportPage } from './../pages/export/export';
import { GifViewPage } from '../pages/gif-view/gif-view';
import { HomePage } from '../pages/home-page/home-page';
import { ModalPicturePage } from '../pages/modal-picture/modal-picture';
import { Notation1Page } from '../pages/notation-1/notation-1';
import { Notation2Page } from '../pages/notation-2/notation-2';
import { ParcelsTestsPage } from '../pages/parcels-tests/parcels-tests';
import { ResultsPage } from '../pages/results/results';
import { VerifNotationPage } from '../pages/verif-notation/verif-notation';
import { ConsultationParcelsPage} from '../pages/consultation-parcels/consultation-parcels'
import { SettingsPage } from '../pages/settings/settings';

// Providers
import { DataService } from '../providers/data-service';
import { RulerService } from '../providers/ruler-service';
import { Toasts } from '../providers/toasts';
import { Utils } from '../providers/utils';

// Component
import { FooterComponent } from '../components/footer/footer';
import { HelpComponent } from '../components/help/help';
import { SlidePictureComponent } from '../components/slide-picture/slide-picture';
import { ResumeComponent } from '../components/resume/resume';
import { TranslateProvider } from '../providers/translate/translate';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AboutPage,
    CameraPage,
    DefiningLayerPage,
    GifViewPage,
    ExportPage,
    HomePage,
    ModalPicturePage,
    Notation1Page,
    MyApp,
    Notation2Page,
    ParcelsTestsPage,
    ResultsPage,
    VerifNotationPage,
    FooterComponent,
    HelpComponent,
    SlidePictureComponent,
    ResumeComponent,
    ConsultationParcelsPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AboutPage,
    CameraPage,
    DefiningLayerPage,
    ExportPage,
    GifViewPage,
    HomePage,
    ModalPicturePage,
    MyApp,
    Notation1Page,
    Notation2Page,
    ParcelsTestsPage,
    ResultsPage,
    VerifNotationPage,
    FooterComponent,
    HelpComponent,
    SlidePictureComponent,
    ResumeComponent,
    ConsultationParcelsPage,
    SettingsPage
  ],
  providers: [
    Camera,
    DataService,
    EmailComposer,
    File,
    Geolocation,
    InAppBrowser,
    RulerService, 
    SplashScreen,
    StatusBar,
    Storage, 
    Toast,
    Toasts, 
    Utils,
    TranslateProvider
  ]
})

export class AppModule { }
