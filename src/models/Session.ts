export interface Session {
    id: string
    sceneId: string
    description: string
    startTime: string
    stopTime: any
    events: any[]
    scene: Scene
    participants: Participant[]
  }
  
  export interface Scene {
    map_name: string
    description: string
    evidences: Evidence[]
  }
  
  export interface Evidence {
    id: string
    type: number
    x: number
    y: number
    z: number
  }
  
  export interface Participant {
    user: User
  }
  
  export interface User {
    id: string
    fullname: string
    role: number
  }