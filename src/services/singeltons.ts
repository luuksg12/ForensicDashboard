import { WebsocketService } from "./websocket.service";
import {AccountManager} from "../manager/AccountManager";

export const accountManager = new AccountManager();
export const websocketService = new WebsocketService();