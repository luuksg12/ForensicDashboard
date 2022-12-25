import { AuthenticateLogin } from "../models/request_bodies";
import { User } from "../models/user.model";
import { Http, Method } from "../helper/Http";
import { HOST } from "../Constants";

export const authenticateLogin = async (email: string, password: string) => {
  const body: AuthenticateLogin = { email: email, password: password };
  const response = await Http.request(Method.POST, `${HOST}/user/login`, body);
  if (response.status == 201) {
    const user: User = await response.json();
    return user;
  }
  return false;
};
