import { HttpHelper } from "../helper/HttpHelper"
import { UserModel, UserModelGui } from "../models/user.model"

export class SceneQuery{

    public static QueryUrl = "https://localhost:7283/api/Scene"

    static GetFilteredScene(){
        var data = HttpHelper.DataCallItems<UserModelGui>(this.QueryUrl, {})
        return data
    }

    static GetScene(){
        var data = HttpHelper.DataCallItems<UserModel>(this.QueryUrl, {})
        return data;
    }

    UpdateUser(){

    }
}