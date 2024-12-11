export interface UserData {
  id: string;
  name: string;
  email: string;
  telp_number: string;
  role: string;
  image_url: string;
  is_verified: boolean;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  users: UserData[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  teams_id: number;
  user?: {
    id: string;
    name: string;
  };
}
