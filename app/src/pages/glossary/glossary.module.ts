import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GlossaryPage } from './glossary';

@NgModule({
  declarations: [
    GlossaryPage,
  ],
  imports: [
    IonicPageModule.forChild(GlossaryPage),
  ],
  exports: [
    GlossaryPage
  ]
})
export class GlossaryPageModule {}
