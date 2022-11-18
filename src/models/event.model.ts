import { EvidenceModel } from "./evidence.model"
import { SessionModel } from "./session.model"
import { UserModel } from "./user.model"

export class EventModel{
    id: string = ""
    type: EventType = EventType.Found
    timeStamp: Date = new Date()
    user: UserModel = new UserModel()
    session: SessionModel = new SessionModel()
    session_id: string = ""    
    evidence: EvidenceModel = new EvidenceModel()
    glasses: string = ""
    filter: string = ""
}
export enum EventType {
    Found = 0, 
    Dropped= 1,
    PickedUp = 2
}