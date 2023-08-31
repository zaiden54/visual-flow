export type UserModelType = {
  id: number;
  username: string;
  email: string;
};

export type UserSignUpFormType = Omit<UserModelType, 'id'> & { password: string };
export type UserLoginFormType = Omit<UserSignUpFormType, 'username'>;

export type UserType =
  | (UserModelType & { status: 'logged' })
  | { status: 'loading' }
  | { status: 'guest' };
