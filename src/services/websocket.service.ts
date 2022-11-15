import { WebsocketBuilder, Websocket, ConstantBackoff } from "websocket-ts";
import {
    AnimationListMessage,
    ConsoleLogsMessage,
    GuiCurrentSpawnPointMessage,
    GUIMessage,
    GuiSceneChangeMessage,
    GuiTrackerModelPairListMessage,
    InteractiveDisplayStateListMessage,
    LinkableModelListMessage,
    PerformanceMessage,
    QuestionAnswerListMessage,
    RegisteredPlayerListMessage,
    SceneListMessage,
    SpawnPointListMessage,
    ToggleableObjectListMessage,
} from "@vpil/shared";
import {IAppStateModel} from "@vpil/gui/src/services/states/app-state";

export class WebsocketService{
    private ws: Websocket | null = null;
    private wsServer = "";

    constructor() {
        this.wsServer = "ws://localhost:3000/gui";
        this.updateConnection();
    }

    public init(): WebsocketService {
        console.log("Init wsService");
        return this;
    }

    private updateConnection() {
        if (this.ws) this.ws.close();
        this.ws = new WebsocketBuilder(this.wsServer)
            .withBackoff(new ConstantBackoff(3000))
            .onOpen((i, ev) => {
                console.log("opened");
            })
            .onClose((i, ev) => {
                console.log("closed");
            })
            .onError((i, ev) => {
                console.log("error");
            })
            .onMessage((i: Websocket, ev: MessageEvent<string>) => {
                const msg = JSON.parse(ev.data) as GUIMessage<Object>;
                switch (msg.method) {
                    case "player_list":
                        const playerListMsg = msg as RegisteredPlayerListMessage;
                        console.log(playerListMsg);
                        break;
                    case "performance":
                        const performanceMsg = msg as PerformanceMessage;
                        break;
                    case "scene_list":
                        const sceneListMsg = msg as SceneListMessage;
                        console.log(sceneListMsg);
                        break;
                    case "animation_list":
                        const animationListMsg = msg as AnimationListMessage;
                        console.log(animationListMsg);
                        break;
                    case "spawnpoint_list":
                        const spawnPointListMsg = msg as SpawnPointListMessage;
                        console.log(spawnPointListMsg);
                        break;
                    case "linkablemodel_list":
                        const linkableModelListMsg = msg as LinkableModelListMessage;
                        console.log(linkableModelListMsg);
                        break;
                    case "interactivedisplay_list":
                        const interactiveDisplayListMsg = msg as InteractiveDisplayStateListMessage;
                        console.log(interactiveDisplayListMsg);
                        break;
                    case "toggleableobject_list":
                        const toggleableObjectListMsg = msg as ToggleableObjectListMessage;
                        console.log(toggleableObjectListMsg);
                        break;
                    case "trackermodelpairs_list":
                        const tmpMsg = msg as GuiTrackerModelPairListMessage;
                        console.log(tmpMsg);
                        break;
                    case "console_logs":
                        const consoleLogsMsg = msg as ConsoleLogsMessage;
                        console.log(consoleLogsMsg);
                        break;
                    case "current_spawnpoint":
                        const currSpawnPointMsg = msg as GuiCurrentSpawnPointMessage;
                        console.log(currSpawnPointMsg);
                        break;
                    case "question_answer_list":
                        const qaListMsg = msg as QuestionAnswerListMessage;
                        console.log(qaListMsg);
                        break;
                    case "scene_change":
                        const sceneChangeMsg = msg as GuiSceneChangeMessage;
                        console.log(sceneChangeMsg);
                        break;
                    default:
                        break;
                }
            })
            .onRetry((i, ev) => {
                console.log("retry");
            })
            .build();
    }

    public send(data: any) {
        if (!this.ws) {
            return console.warn(`Could not send message, no WS connection!`);
        }
        this.ws.send(data);
    }
}