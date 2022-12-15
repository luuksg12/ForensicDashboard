import { EvidenceModel } from "./evidence.model"
import { SessionModel } from "./session.model"
import { UserModel } from "./user.model"
import { FilterType, LightType, ActionType } from "./enums"

export class EventModel{
    id: string = ""
    action?: ActionType
    timeStamp: Date = new Date()
    user: UserModel = new UserModel()
    session: SessionModel = new SessionModel()
    session_id: string = ""    
    evidence: EvidenceModel = new EvidenceModel()
    filter?: FilterType
    light?: LightType
}
