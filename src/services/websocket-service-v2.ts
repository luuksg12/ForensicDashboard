import { WebsocketBuilder, Websocket, ConstantBackoff } from "websocket-ts";
import { IStore, store } from "./meiosis";
import { IAppStateModel } from "./states/app-state";
import _ from "lodash";
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

export default class WebsocketServiceV2 {
  private ws: Websocket | null = null;
  private store: IStore | null = null;
  private wsServer = "";

  constructor() {}

  public init(): WebsocketServiceV2 {
    console.log("Init wsService");
    this.store = store;
    this.store.states.map((a: IAppStateModel) => {
      if (this.wsServer != a.app.wsServer) {
        this.wsServer = a.app.wsServer;
        this.updateConnection();
      }
    });
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
            store.actions.updatePlayers(playerListMsg.data.playerList);
            break;
          case "performance":
            const performanceMsg = msg as PerformanceMessage;
            store.actions.updatePerformance(performanceMsg.data);
            break;
          case "scene_list":
            const sceneListMsg = msg as SceneListMessage;
            store.actions.updateScenes(sceneListMsg.data.scenes);
            break;
          case "animation_list":
            const animationListMsg = msg as AnimationListMessage;
            store.actions.updateAnimations(animationListMsg.data.animations);
            break;
          case "spawnpoint_list":
            const spawnPointListMsg = msg as SpawnPointListMessage;
            store.actions.updateSpawnPoints(spawnPointListMsg.data.spawnPoints);
            break;
          case "linkablemodel_list":
            const linkableModelListMsg = msg as LinkableModelListMessage;
            store.actions.updateLinkableModels(linkableModelListMsg.data.linkableModels);
            break;
          case "interactivedisplay_list":
            const interactiveDisplayListMsg = msg as InteractiveDisplayStateListMessage;
            store.actions.updateInteractiveDisplays(interactiveDisplayListMsg.data.interactiveDisplays);
            break;
          case "toggleableobject_list":
            const toggleableObjectListMsg = msg as ToggleableObjectListMessage;
            store.actions.updateToggleableObjects(toggleableObjectListMsg.data.toggleableObjects);
            break;
          case "trackermodelpairs_list":
            const tmpMsg = msg as GuiTrackerModelPairListMessage;
            store.actions.updateTrackerModelPairs(tmpMsg.data.trackerModelPairs);
            break;
          case "console_logs":
            const consoleLogsMsg = msg as ConsoleLogsMessage;
            store.actions.updateConsoleLogs(consoleLogsMsg.data);
            break;
          case "current_spawnpoint":
            const currSpawnPointMsg = msg as GuiCurrentSpawnPointMessage;
            store.actions.updateActiveSpawnPoint(currSpawnPointMsg.data.id);
            break;
          case "question_answer_list":
            const qaListMsg = msg as QuestionAnswerListMessage;
            store.actions.updateQuestionAnswers(qaListMsg.data.answers);
            break;
          case "scene_change":
            const sceneChangeMsg = msg as GuiSceneChangeMessage;
            store.actions.updateActiveScene(sceneChangeMsg.data.id);
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
