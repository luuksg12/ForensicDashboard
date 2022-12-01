export class AccountManager{
    private currentUser = "";

    public Login(userName: string){
        this.currentUser = userName;
    }

    public GetCurrentUser(userName: string){
        return this.currentUser;
    }
}

export const accountManager = new AccountManager();