import { Injectable } from '@angular/core';

@Injectable()
export class ParcelService {

  getParcels(): any[] {
    return ["Hello 1", "Hello 2"];
  }

}
