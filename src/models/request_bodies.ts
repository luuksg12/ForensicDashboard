export interface AuthenticateLogin {
    email?: string, 
    password?: string
}

export interface CreateUser {
    firstname: string
    lastname: string
    addition: any
    email: string
    password: string
    role: string
  }
  