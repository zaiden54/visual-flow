export type UserModelType = {
  id: number;
  username: string;
  email: string;
  name: string;
  roleId: number;
};

export type UserSignUpFormType = {
  username: string;
  email: string;
  password: string;
};

export type UserLoginFormType = Omit<UserSignUpFormType, 'username'>;

export type UserType =
  | (UserModelType & { status: 'logged' })
  | { status: 'loading' }
  | { status: 'guest' };
