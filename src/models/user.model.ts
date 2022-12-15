import { EventModel } from "./event.model";
import { SessionModel } from "./session.model";

export class UserModel {
  id: string = "";
  firstname: string = "";
  lastname: string = "";
  addition: string = "";
  role: string = "";
  // session: SessionModel = new SessionModel();
  // session_id: string = ""
  // event: EventModel = new EventModel()
  // event_id: string = ""

  public constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}

export class UserModelGui extends UserModel {
  online: boolean = false;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  addition: any;
  email: string;
  password: string;
  role: number;
  deleted: boolean;
  lastmodified: string;
}
