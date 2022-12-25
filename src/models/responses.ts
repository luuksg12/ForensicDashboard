export interface Session {
    id: string
    description: string
    startTime: string
    stopTime: string
    startSceneTime: any
    stopSceneTime: any
    deleted: boolean
    lastmodified: string
    ipaddr: any
    roadmap: any
    evaluation: any
    sceneId: any
    participants: Participant[]
  }
  
  export interface Participant {
    sessionId: string
    userId: string
    deleted: boolean
    lastmodified: string
    user: User
  }
  
  export interface User {
    firstname: string
    lastname: string
    role: number
    addition: any
  }
  