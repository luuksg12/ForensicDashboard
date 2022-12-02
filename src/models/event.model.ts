import { EvidenceModel } from "./evidence.model"
import { SessionModel } from "./session.model"
import { UserModel } from "./user.model"

export class EventModel{
    id: string = ""
    action?: EventType
    timeStamp: Date = new Date()
    user: UserModel = new UserModel()
    session: SessionModel = new SessionModel()
    session_id: string = ""    
    evidence: EvidenceModel = new EvidenceModel()
    filter?: FilterType
    light?: LightType
}
export enum EventType {
    Found = 0, 
    Dropped= 1,
    PickedUp = 2
}
export enum LightType{
    White =0,
    Violet = 1,
    Blue = 2,
    BlueGreen = 3,
    Green = 4
}
export enum FilterType{
    'Base' = 0,
    '435nm' = 1,
    '476nm' = 2,
    '529nm' = 3,
    '549nm' = 4,
}