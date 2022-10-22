import { HttpHelper } from "../helper/HttpHelper"
import { SessionModel } from "../models/session.model"
import { UserModel } from "../models/user.model"

export class SessionQuery{

    // public static QueryUrl = "https://localhost:7283/api/Session"
    public static QueryUrl = "http://145.24.222.175/simulation/session"

    public static xx = {

        "keywords":{
    
            "where":{
    
                "id":"0926a1bf-181d-413f-b9c4-b2ea9df9f72d"
    
            },
    
            "include":{
    
                "participants":{
    
                    "select":{
    
                        "id":true
    
                    }
    
                },
                "events":true
            }
        }
    }

    static FilterSession(){
        var data = HttpHelper.DataCallItems<SessionModel>(this.QueryUrl, this.xx)
        return data
    }

    static GetSessions(){
        var data = HttpHelper.DataCallItems<SessionModel>(this.QueryUrl, {})
        return data;
    }

    UpdateUser(){

    }
}