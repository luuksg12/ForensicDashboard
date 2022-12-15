import { AuthenticateLogin } from "../models/request_bodies";
import { User } from "../models/user.model";
import { Http } from "../helper/Http";

export const authenticateLogin = async (email: string, password: string) => {
  const body: AuthenticateLogin = { email: email, password: password };
  const response = await Http.request("POST", "http://localhost:8010/proxy/simulation/user/login", body);
  if (response.status == 201) {
    const user: User = await response.json();
    return user;
  }
  return false;
};
