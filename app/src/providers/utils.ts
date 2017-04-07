import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * A provider for various useful methods.
 * As this provider grows, it should be decomposed into more specific providers (like the "toasts" one). 
 */
@Injectable()
export class Utils {

  constructor() {}

  /**
   * Return the current date, formatted as : dd/mm/yyyy.  
   * Uses DatePipe : https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html
   */
  public getCurrentDate(): string {
          let datePipe = new DatePipe('fr-FR');
          return datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

}
