import { Subject } from 'rxjs';

import { useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
import { SockMessageModel } from '../models/sockmessage.model';

export class WebSocketService{
    constructor(){
        var ws = new WebSocket("wss://websocket.cloudkwekerijbloemendaal.com/ws");

        var cacheMessage = new SockMessageModel()

        ws.onopen = (event) => {
            ws.send(JSON.stringify(""));
            messageService.sendMessage(JSON.stringify(""))
        };
    
        ws.onmessage = function (event) {
            const json = JSON.parse(event.data);
            try {
                var numberr = Object.assign(new SockMessageModel(), json)

                if (numberr.id !== cacheMessage.id){
                    cacheMessage = numberr
                    messageService.sendMessage(json)
                }

                // console.log(json)

            // if ((json.event = "data")) {
            //     messageService.sendMessage("honden")
            // }
            } catch (err) {
            console.log(err);
            }
        };
    }
}

const subject = new Subject();

export const messageService = {
    sendMessage: (message: any) => subject.next(message),
    clearMessages: () => subject.next({}),
    getMessage: () => subject.asObservable()
};