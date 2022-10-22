import { EventModel } from "./event.model"
import { SceneModel } from "./scene.model"

export class SessionModel{
    id: string = ""
    description?: string = ""
    superVisor?: string = ""
    events?: Array<EventModel> = new Array<EventModel>()
    date: Date = new Date()
    duration?: Date = new Date()
    scene?: SceneModel
}