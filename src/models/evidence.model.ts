import { EventModel } from "./event.model"
import { SceneModel } from "./scene.model"

export class EvidenceModel{
    id: string = ""
    x: number = 0
    y: number = 0
    z: number = 0
    type: string = ""
    discovered: boolean = false
    scene: SceneModel = new SceneModel()
    scene_id: string = ""
    event: EventModel = new EventModel()
    event_id: string = ""
}

export enum EvidenceType {
    Gunpowder = 0,
    Sperm = 1, 
    Saliva = 2, 
    Blood = 3,
    Fibers = 4,
    Fingerprint = 5,
}