export class Geoloc {
  public accuracy?: number;
  public altitude?: number;
  public altitudeAccuracy?: number;
  public latitude?: number;
  public longitude?:number;
  public heading?:number;



  public constructor(coord: Coordinates) {
    this.accuracy = coord.accuracy;
    this.altitude = coord.altitude;
    this.altitudeAccuracy = coord.altitudeAccuracy;
    this.latitude = coord.latitude;
    this.longitude = coord.longitude;
    this.heading = coord.heading;
  }
  
}