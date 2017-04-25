export class User {
  public firstName: string;
  public lastName: string;
  public userType: string;
  public mail: string;
  public idOfag?: string;

  public constructor(init: User) {
    Object.assign(this, init);
  }
}
