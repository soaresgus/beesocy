import { ReactNode } from 'react';

export interface IInputs {
  nickname: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: File;
  profileBanner?: File;
  color: string;
  description: string;
}

interface ISignup {
  inputsData: IInputs;
}

export interface ISignupContext extends ISignup {
  handleSetInputsData(inputsData: IInputs): void;
}

export interface ISignupProvider {
  children: ReactNode;
}
