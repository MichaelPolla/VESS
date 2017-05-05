export class User {
  public firstName: string;
  public lastName: string;
  public userType: UserType;
  public mail: string;
  public idOfag?: string;

  public constructor(init: User) {
    Object.assign(this, init);
  }
}

/* In TypeScript 2.4+, this could be simplified as an enum with string values
 * See : http://stackoverflow.com/a/35257367/1975002
 */
export type UserType = "anonymous" | "ofag";
export const UserType = {
    Anonymous: "anonymous" as UserType,
    Ofag: "ofag" as UserType
};
