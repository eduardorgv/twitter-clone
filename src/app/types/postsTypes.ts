import { iUsers } from "./userTypes";

export interface iPost {
  id: string;
  created_at: Date;
  content: string;
  user_id: string;
  users: iUsers;
}
