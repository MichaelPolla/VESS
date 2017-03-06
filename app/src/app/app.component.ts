import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

// Pages
import { Notation1Page } from '../pages/notation-1/notation-1';
import { HomePage } from '../pages/home-page/home-page';

// Providers
import { ParcelService } from '../providers/parcel-service';


@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public parcelService: ParcelService
  ) {
    this.initializeApp();

    //parcelService.getParcelsStub();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: Notation1Page },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
