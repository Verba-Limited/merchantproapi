import { UserDocument } from "../../modules/User";
// import { UserModel } from "../../modules/User";

declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}