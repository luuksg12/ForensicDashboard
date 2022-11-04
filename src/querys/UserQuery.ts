import { HttpHelper } from "../helper/HttpHelper"
import { UserModel, UserModelGui } from "../models/user.model"

export class UserQuery{

    // public static QueryUrl = "https://localhost:7283/api/User"
    public static QueryUrl = "http://145.24.222.175/simulation/user"

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

    static BuildQuery(){
        this.xx.keywords.where.id = "0000"
        return this.xx;
    }

    static GetFilteredUser(){
        var querys = this.BuildQuery()
        var data = HttpHelper.DataCallItems<UserModelGui>(this.QueryUrl, querys)
        return data
    }

    static GetUsers(){
        var data = HttpHelper.DataCallItems<UserModelGui>(this.QueryUrl, {})
        return data;
    }

    UpdateUser(){

    }
}