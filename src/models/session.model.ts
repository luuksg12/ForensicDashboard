import { EventModel } from "./event.model"
import { SceneModel } from "./scene.model"

export class SessionModel{
    id: string = ""
    description?: string = ""
    participants? : Participant[]
    events?: Array<EventModel> = new Array<EventModel>()
    startTime: Date = new Date()
    stopTime?: Date = new Date()
    scene?: SceneModel
}


export interface Session {
    id: string
    description: string
    startTime: string
    stopTime: any 
    sceneId: string
    participants: Participant[]
    scene: Scene
    events: any[]
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
    type: number
  }
  