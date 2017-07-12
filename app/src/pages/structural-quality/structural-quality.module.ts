import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StructuralQualityPage } from './structural-quality';

@NgModule({
  declarations: [
    StructuralQualityPage,
  ],
  imports: [
    IonicPageModule.forChild(StructuralQualityPage),
  ],
  exports: [
    StructuralQualityPage
  ]
})
export class StructuralQualityPageModule {}
