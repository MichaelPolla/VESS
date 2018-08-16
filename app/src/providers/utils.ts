import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * A provider for various useful methods.  
 * As this provider grows, it should be decomposed into more specific providers (like the "toasts" one).
 */
@Injectable()
export class Utils {

  constructor() { }

  /**
   * Returns the current date and time, formatted as specified in argument.  
   * Uses DatePipe : https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html.
   * Check this doc to see all the formatting options available.  
   * 
   * Examples : dd/MM/y  => 08/04/2017
   */
  public static getCurrentDatetime(format: string): string {
    let datePipe = new DatePipe('fr-FR');
    return datePipe.transform(new Date(), format);
  }

  /**
   * Returns a filename based on the current date and time, with the extension passed in argument.  
   * Filename example: "20181608_150217.jpg"
   * fileExt : the file extension, prefixed by '.'  (.jpg, .png...)
   */
  public static getDatetimeFilename(fileExt: string): string {
    return this.getCurrentDatetime('yMMdd_HHmmss') + fileExt;
  }

  /**
   * Rounds a number to the precision specified (by default: to nearest whole number).  
   * - number:    the number to round.  
   * - precision: the number of decimals wanted (e.g. 2 will give a number rounded as : x.yz)  
   *   returns : the rounded number.  
   */
  public static round(number: number, precision: number) { 
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(number * multiplier) / multiplier;
  }


}
