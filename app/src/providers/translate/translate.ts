import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';


@Injectable()
export class TranslateProvider {

  constructor(private translate: TranslateService) { }

  /**
   * Gets the string corresponding to the key, in the language currently set.
   */
  public get(key: string): string {
    let result: string;
    this.translate.get(key).subscribe((res: string) => {
      result = res;
    });
    return result;
  }
}
