export type UserType = "admin" | "user";

export type User = {
  id: number;
  username: string;
  userType: UserType;
};

export type RawUser = {
  id: number;
  username: string;
  user_type: UserType;
};
