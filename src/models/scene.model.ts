import { EvidenceModel } from "./evidence.model"
import { SessionModel } from "./session.model"

export class SceneModel{
    id: string = ""
    name: string = ""
    description: string = ""
    session?: SessionModel = new SessionModel()
    session_id: string = ""
    evidences: Array<EvidenceModel> = new Array<EvidenceModel>()
}