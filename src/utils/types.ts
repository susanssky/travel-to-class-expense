export type RegisterType = LoginType & RestType;
export type LoginType = { username: string; password: string };
export type RestType = {
  _id?: string;
  nameOnBankAccount: string;
  accountNumber: string;
  sortCodeWithDashes: string;
  amount: string;
  [key: string]: string | undefined;
};

export type StateType = {
  action: string;
  user: RegisterType | null;
};

export type ConfigType = {
  isEditMode: { [key: string]: boolean };
  fieldName: { [key: string]: string };
  tips: { [key: string]: string };
};

export type UserType = {
  id?: string;
  [key: string]: string | undefined;
};
export type DataType = {
  [key: string]: string;
};

// PropType
export type PropLoginType = {
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};
export type PropReceiptCardType = {
  item: DataType;
  updatedReceipt: DataType;
  deleteReceipt: (public_id: string, id: string) => Promise<void>;
  editReceipt: (item: DataType) => Promise<void>;
  editTableMode: string | null;
  setEditTabelModel: React.Dispatch<React.SetStateAction<string | null>>;
  setUpdatedReceipt: React.Dispatch<React.SetStateAction<DataType>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
};
export type PropUserDashboardLeftType = {
  enterLeftEditMode: (name: string) => Promise<void>;
  handleTextChange: (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleFileInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  currentUser: RegisterType;
  config: ConfigType;
  fileRef: React.MutableRefObject<HTMLInputElement>;
  imgName: string;
  setImgName: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
};
export type PropUserDashboardType = {
  currentUser: RegisterType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};
export type PropUserDashboardRightType = {
  data: DataType[];
  fetchReceiptsData: () => Promise<void>;
};
