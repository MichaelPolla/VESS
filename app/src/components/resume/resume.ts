import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Parcel, Test } from '../../models/parcel';

@Component({
  selector: 'component-resume-view',
  templateUrl: 'resume.html'
})
export class ResumeComponent {

  @Input() resume: Test;

  constructor(public navCtrl: NavController) {
    
  }

  ngOnInit() {
    console.log(this.resume);
  }
}
