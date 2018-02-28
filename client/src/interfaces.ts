export interface User {
  _id:any,
  username:string,
  name: string,
  password: string,
  img:string,
  location: Object,
  trips: Array<any>,
  created_at: Date,
  updated_at: Date
}