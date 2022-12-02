import {EventModel, EventType, FilterType, LightType} from "./event.model"
import { SceneModel } from "./scene.model"
import {EvidenceModel, EvidenceType} from "./evidence.model";
import {UserModel} from "./user.model";

export class SessionModel{
    id: string = ""
    description?: string = ""
    participants? : Participant[] = []
    events?: Event[] = []
    startTime: Date = new Date()
    stopTime?: Date = new Date()
    scene?: SceneModel
}

export interface Event{
    id: string
    action: EventType
    timeStamp: Date
    userId: string
    sessionId: string
    evidenceId: string
    filter: FilterType
    light: LightType
}
export interface Session {
    id: string
    description: string
    startTime: string
    stopTime: any 
    sceneId: string
    participants: Participant[]
    scene: Scene
    events: Event[]
  }

interface User {
    firstname?: string,
    lastname?: string,
    role?: number,
    addition?: string
}

export interface Participant {
    userId: string
    user: User
  }
  
  export interface Scene {
    id: string
    name: string
    description: string
    mapImage: string
    scaleX: number
    scaleY: number
    evidences: Evidence[]
  }
  
  export interface Evidence {
    id: string
    x: number
    y: number
    z: number
    type: EvidenceType
  }
  