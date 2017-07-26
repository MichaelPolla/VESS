import { StructuralQualityPage } from './../pages/structural-quality/structural-quality';
import { TutorialPage } from './../pages/tutorial/tutorial';
import { Toasts } from './../providers/toasts';
import { Toast } from '@ionic-native/toast';
import { User } from './../models/user';
import { DataService } from './../providers/data-service';
import { AboutPage } from './../pages/about/about';
import { SettingsPage } from './../pages/settings/settings';
import { ParcelsTestsPage } from './../pages/parcels-tests/parcels-tests';
import { TranslateProvider } from './../providers/translate/translate';
import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Pages
import { HomePage } from '../pages/home-page/home-page';


@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user: User;

  // Define the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any, params?: any }>;

  constructor(
    public menu: MenuController,
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    private translate: TranslateProvider,
    private dataService: DataService,
    private toasts: Toasts
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'HOME', component: HomePage },

      { title: 'PARCEL_NOTATION', component: ParcelsTestsPage, params: { isConsultation: false } },
      { title: 'TESTS_CONSULTATION', component: ParcelsTestsPage, params: { isConsultation: true } },
      { title: 'STRUCTURE_QUALITY', component: StructuralQualityPage },
      { title: 'TUTORIAL', component: TutorialPage},
      { title: 'SETTINGS', component: SettingsPage },
      { title: 'ABOUT', component: AboutPage }
    ];

    this.dataService.getUserInfo().then((value) => {
      if (value != null) {
        this.user = value;
        this.translate.setLang(this.user.language);
      } else {
        this.translate.setLang('fr'); // Default language (before the user sets the one s/he prefers).
      }

    });
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    if (page.component == HomePage) {
      // close the menu when clicking a link from the menu
      this.menu.close();
      this.nav.popToRoot();
    } else if(page.component == "notImplemented"){
      this.toasts.showToast("Cette fonctionnalité n'est pas encore disponible.");
    }else {
      // close the menu when clicking a link from the menu
      this.menu.close();
      // navigate to the new page if it is not the current page
      this.nav.push(page.component, page.params);
    }

  }
}
