export interface IError {
  response: {
    data: {
      message: string;
      status: string;
    };
  };
}

export interface IContact {
  id: number;
  email: string;
  name: string;
  password: string;
  picture: string;
}

export interface ILoginResponse {
  status: string;
  contact: IContact;
}

export interface ISearchResponse {
  status: string;
  contacts: IContact[];
}

export type ValidateStatuses =
  | ""
  | "validating"
  | "error"
  | "success"
  | "warning"
  | undefined;
