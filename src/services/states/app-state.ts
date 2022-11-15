import { themeStorageKey, websocketServerKey } from "../../utils/utils";
import { UpdateStream } from "../meiosis";
import { WebsocketService } from "../websocket.service";
import {
  Animation,
  ChangeVisibilityMessage,
  ConsoleLogs,
  DisplayControl,
  GUIMessage,
  InteractiveDisplayState,
  LinkableModel,
  PerformanceFPS,
  RegisteredPlayer,
  SpawnPoint,
  ToggleableObject,
  Scene,
  AnimationControlCommand,
  AnimationControlMessage,
  QuitServerMessage,
  GuiCurrentSpawnPointMessage,
  GuiSceneChangeMessage,
  PlayerQuestionAnswer,
  ResetSessionMessage,
  TrackerModelPair,
  DisplayControlMessage,
  LinkTrackerMessage,
  UnlinkTrackerMessage,
} from "@vpil/shared";

const log = console.log;
const wsService = new WebsocketService();

export interface IAppStateModel {
  app: {
    players: RegisteredPlayer[];
    trackers: string[];
    linkableModels: LinkableModel[];
    toggleableObjects: ToggleableObject[];
    trackerModelPairs: TrackerModelPair[];
    spawnPoints: SpawnPoint[];
    interactiveDisplays: InteractiveDisplayState[];
    questionAnswers: PlayerQuestionAnswer[];
    activeSpawnPoint: string;
    scenes: Scene[];
    activeScene: string;
    animations: Animation[];
    consoleLogs: ConsoleLogs;
    wsService: WebsocketService;
    wsServer: string;
    route: string;
    theme: string;
    note: string;
    dialog: boolean;
    drawer: boolean;
    editLayout: boolean;
    performance: PerformanceFPS;
  };
}

export interface IAppStateActions {
  search: (isSearching: boolean, searchQuery?: string) => void;
  changePage: (route: string) => void;
  changeTheme: (theme: string) => void;
  changeWsServer: (url: string) => void;
  sendWS: (msg: GUIMessage<Object>) => void;
  notify: (note: string) => void;
  toggleDrawer: (drawer: boolean) => void;
  toggleEditLayout: (editLayout: boolean) => void;
  closeDialog: () => void;
  updatePerformance: (performance: PerformanceFPS) => void;
  updatePlayers: (players: RegisteredPlayer[]) => void;
  updateInteractiveDisplays: (interactiveDisplays: InteractiveDisplayState[]) => void;
  updateToggleableObjects: (toggleableObjects: ToggleableObject[]) => void;
  updateTrackerModelPairs: (trackerModelPairs: TrackerModelPair[]) => void;
  updateSpawnPoints: (spawnPoints: SpawnPoint[]) => void;
  updateActiveSpawnPoint: (spawnPoint: string) => void;
  sendActiveSpawnPoint: (spawnPoint: string) => void;
  controlAnimation: (id: string, control: AnimationControlCommand) => void;
  updateAnimations: (animations: Animation[]) => void;
  updateLinkableModels: (linkableModels: LinkableModel[]) => void;
  updateScenes: (scenes: Scene[]) => void;
  updateActiveScene: (scene: string) => void;
  sendActiveScene: (scene: string) => void;
  changeVisibility: (t: ToggleableObject) => void;
  linkTracker: (tmp: TrackerModelPair) => void;
  unlinkTracker: (tmp: TrackerModelPair) => void;
  sendDisplayControl: (d: DisplayControl) => void;
  updateConsoleLogs: (consoleLogs: ConsoleLogs) => void;
  updateQuestionAnswers: (questionAnswers: PlayerQuestionAnswer[]) => void;
  init: () => void;
  resetSession: () => void;
  quitServer: () => void;
}

export interface IAppState {
  initial: IAppStateModel;
  actions: (us: UpdateStream, states: flyd.Stream<IAppStateModel>) => IAppStateActions;
}

export const appStateMgmt = {
  initial: {
    app: {
      players: [],
      trackers: [],
      linkableModels: [],
      spawnPoints: [],
      activeSpawnPoint: "",
      interactiveDisplays: [],
      toggleableObjects: [],
      trackerModelPairs: [],
      questionAnswers: [],
      scenes: [],
      activeScene: "",
      consoleLogs: [],
      animations: [],
      wsService: wsService,
      wsServer: localStorage.getItem(websocketServerKey) || "ws://localhost:3000/gui",
      route: "home",
      theme: localStorage.getItem(themeStorageKey) || "dark",
      note: "",
      drawer: false,
      dialog: false,
      editLayout: false,
      performance: { setting: -1, avg: -1, max: -1, min: -1, rec: -1, sent: -1 },
    },
  },
  actions: (update, _states) => {
    return {
      init: () => {
        wsService.init();
      },
      search: (isSearching: boolean, searchQuery?: string) => update({ app: { isSearching, searchQuery } }),
      changePage: (route: string) => {
        log("Set route " + route);
        update({ app: { route } });
      },
      changeTheme: (theme: string) => {
        log("Set theme " + theme);
        localStorage.setItem(themeStorageKey, theme);
        update({ app: { theme } });
      },
      changeWsServer: (wsServer: string) => {
        log("Set ws server " + wsServer);
        localStorage.setItem(websocketServerKey, wsServer);
        update({ app: { wsServer } });
      },
      notify: (note: string) => {
        log("Set notification");
        update({ app: { note } });
      },
      toggleDrawer: (drawer: boolean) => {
        log(`ToggleDrawer: ${drawer}`);
        update({ app: { drawer } });
      },
      toggleEditLayout: (editLayout: boolean) => {
        log(`toggleEditLayout: ${editLayout}`);
        update({ app: { editLayout } });
      },
      closeDialog: () => {
        log(`closeDialog `);
        update({ app: { dialog: false } });
      },
      updatePerformance: (performance: PerformanceFPS) => {
        update({ app: { performance: performance } });
      },
      updatePlayers: (players: RegisteredPlayer[]) => {
        const trackers = players.map(p => p.trackerIds).flat(1);
        update({ app: { players: players, trackers: trackers } });
      },
      updateInteractiveDisplays: (interactiveDisplays: InteractiveDisplayState[]) => {
        update({ app: { interactiveDisplays: interactiveDisplays } });
      },
      updateToggleableObjects: (toggleableObjects: ToggleableObject[]) => {
        update({ app: { toggleableObjects: toggleableObjects } });
      },
      updateTrackerModelPairs: (trackerModelPairs: TrackerModelPair[]) => {
        update({ app: { trackerModelPairs: trackerModelPairs } });
      },
      updateSpawnPoints: (spawnPoints: SpawnPoint[]) => {
        update({ app: { spawnPoints: spawnPoints } });
      },
      updateActiveSpawnPoint: (spawnPoint: string) => {
        log(`updateActiveSpawnPoint ${spawnPoint}`);
        update({ app: { activeSpawnPoint: spawnPoint } });
      },
      sendActiveSpawnPoint: (spawnPoint: string) => {
        const msg: GuiCurrentSpawnPointMessage = { method: "current_spawnpoint", data: { id: spawnPoint } };
        wsService.send(JSON.stringify(msg));
      },
      updateAnimations: (animations: Animation[]) => {
        update({ app: { animations: animations } });
      },
      updateLinkableModels: (linkableModels: LinkableModel[]) => {
        update({ app: { linkableModels: linkableModels } });
      },
      updateScenes: (scenes: Scene[]) => {
        update({ app: { scenes: scenes } });
      },
      updateActiveScene: (scene: string) => {
        log(`updateActiveScene ${scene}`);
        update({ app: { activeScene: scene } });
      },
      sendActiveScene: (scene: string) => {
        const msg: GuiSceneChangeMessage = { method: "scene_change", data: { id: scene } };
        wsService.send(JSON.stringify(msg));
      },
      controlAnimation: (id: string, command: AnimationControlCommand) => {
        const msg: AnimationControlMessage = { method: "animation_control", data: { id, command } };
        wsService.send(JSON.stringify(msg));
      },
      changeVisibility: (t: ToggleableObject) => {
        const msg: ChangeVisibilityMessage = { method: "change_visibility", data: t };
        wsService.send(JSON.stringify(msg));
      },
      linkTracker: (tmp: TrackerModelPair) => {
        const msg: LinkTrackerMessage = { method: "link_tracker", data: tmp };
        wsService.send(JSON.stringify(msg));
      },
      unlinkTracker: (tmp: TrackerModelPair) => {
        const msg: UnlinkTrackerMessage = { method: "unlink_tracker", data: tmp };
        wsService.send(JSON.stringify(msg));
      },
      sendDisplayControl: (d: DisplayControl) => {
        const msg: DisplayControlMessage = { method: "display_control", data: d };
        wsService.send(JSON.stringify(msg));
      },
      updateConsoleLogs: (consoleLogs: ConsoleLogs) => {
        update({ app: { consoleLogs: consoleLogs } });
      },
      updateQuestionAnswers: (questionAnswers: PlayerQuestionAnswer[]) => {
        update({ app: { questionAnswers: questionAnswers } });
      },
      resetSession: () => {
        const msg: ResetSessionMessage = { method: "reset_session", data: { reason: "Requested from GUI" } };
        wsService.send(JSON.stringify(msg));
      },
      quitServer: () => {
        const msg: QuitServerMessage = { method: "quit_server", data: { reason: "Requested from GUI" } };
        wsService.send(JSON.stringify(msg));
      },
      sendWS: (msg: GUIMessage<Object>) => {
        const msgString = JSON.stringify(msg);
        log(`sendWS ${msgString}`);
        wsService.send(msgString);
      },
    };
  },
} as IAppState;
