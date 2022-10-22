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