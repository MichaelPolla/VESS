import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Injectable, PipeTransform } from '@angular/core';


/**
 * Simplifies calls to TranslateService. Shows a message when a translation is missing.
 */
@Injectable()
export class TranslateProvider {

  constructor(private translate: TranslateService) { }

  /**
   * Gets the translated value of a key.
   * If the key isn't found in the translation file, the key is returned instead.
   */
  public get(key: string, interpolateParams?: Object): string {
    let result: string;
    this.translate.get(key, interpolateParams).subscribe((res: string) => {
      result = (res !== "" && res !== key) ? res : this.get("MISSING_TEXT", { key: key});
    });
    return result;
  }

  /**
   * Sets the language to use.
   */
  public setLang(lang: string) {
    this.translate.setDefaultLang(lang);
  }
}

/**
 * Custom TranslatePipe. Shows a message when a translation is missing.
 * A translation is considered missing if the key isn't found or is an empty string ("").
 * 
 * We don't use the MissingTranslationHandler provided by ngx-translate, as (07.2017) :
 * - if a translation doesn't exist for the desired language but exists for the default language, it takes this one,
 * - it takes empty strings as valid translations => results in blank spaces in app.
 * 
 * In our case, we want to make it obvious that a translation is missing, so it can be quickly fixed.
 */
export class CustomTranslatePipe extends TranslatePipe implements PipeTransform {
  transform(key: any, args: any[]): string {
    let result = super.transform(key, args);
    
    return (result !== "" && result !== key) ? result : super.transform("MISSING_TEXT", {key: key});
  }
}




