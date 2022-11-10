import { scan, stream } from "flyd";
import { appStateMgmt, IAppStateActions, IAppStateModel } from "./states/app-state";
import { merge } from "./utils/mergerino";

export interface IStore {
  actions: IAppStateActions;
  states: flyd.Stream<IAppStateModel>;
}

export type ModelUpdateFunction = Partial<IAppStateModel> | ((model: Partial<IAppStateModel>) => Partial<IAppStateModel>);

export type UpdateStream = flyd.Stream<Partial<ModelUpdateFunction>>;

const app = {
  initial: appStateMgmt.initial,
  actions: (update: UpdateStream, states: flyd.Stream<IAppStateModel>) => appStateMgmt.actions(update, states),
};

const update = stream<ModelUpdateFunction>();
const states = scan(merge, app.initial, update);
const actions = app.actions(update, states);
export const store: IStore = {
  actions,
  states,
};
