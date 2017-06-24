import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';


@Injectable()
export class TranslateProvider {

  constructor(private translate: TranslateService) { }

  /**
   * Gets the translated value of a key.
   */
  public get(key: string, interpolateParams?: Object): string {
    let result: string;
    this.translate.get(key, interpolateParams).subscribe((res: string) => {
      result = res;
    });
    return result;
  }
}
