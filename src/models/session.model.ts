import { ActionType, FilterType, LightType } from "./enums";

import { EvidenceType } from "./enums";

export interface Event {
  id: string;
  action: ActionType;
  timeStamp: Date;
  userId: string;
  sessionId: string;
  evidenceId: string;
  filter: FilterType;
  light: LightType;
}
export interface Session {
  id: string;
  description: string;
  startTime: string;
  stopTime: any;
  sceneId: string;
  participants: Participant[];
  scene: Scene;
  events: Event[];
}

interface User {
  fullname: string;
  role?: number;
}

export interface Participant {
  userId: string;
  user: User;
}

export interface Scene {
  id: string;
  name: string;
  description: string;
  mapImage: string;
  scaleX: number;
  scaleY: number;
  evidences: Evidence[];
}

export interface Evidence {
  id: string;
  x: number;
  y: number;
  z: number;
  type: EvidenceType;
}
