export interface AuthenticateLogin {
    email?: string, 
    password?: string
}

export interface CreateUser {
    fullname: string
    email: string
    password: string
    role: string
}
  



export interface PostSessionBody {
    description: string
    sceneId: string
    ipaddr: string
    deleted: boolean
  }
  