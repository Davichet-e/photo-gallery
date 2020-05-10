import { UserState } from "./modules/users";
import { ImageState } from "./modules/images";
import { AuthState } from "./modules/auth";

export default interface State {
  users: UserState;
  images: ImageState;
  auth: AuthState;
}
