import { EvidenceModel } from "./evidence.model"
import { SessionModel } from "./session.model"
import { UserModel } from "./user.model"

export class EventModel{
    id: string = ""
    type: string = ""
    timeStamp: Date = new Date()
    user: UserModel = new UserModel()
    session: SessionModel = new SessionModel()
    session_id: string = ""    
    evidence: EvidenceModel = new EvidenceModel()
    glasses: string = ""
    filter: string = ""
}