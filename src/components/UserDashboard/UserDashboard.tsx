import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import {
  PropUserDashboardType,
  ConfigType,
  DataType,
  RegisterType,
} from "../../utils/types";
import { itialConfig } from "../../utils/initialConfig";
import UserDashboardLeft from "./UserDashboardLeft";
import UserDashboardRight from "./UserDashboardRight";
import {
  RECEIPT_API_URL,
  USER_API_URL,
  CLODUINARY_API_URL,
} from "../../utils/apiUrl";

const UserDashboard = ({ currentUser, setState }: PropUserDashboardType) => {
  const [config, setConfig] = useState<ConfigType>(itialConfig);
  const [img, setImg] = useState<null | File>(null);
  const [imgName, setImgName] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null!);
  const [data, setData] = useState<DataType[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // UserDashboardLeft
  const enterLeftEditMode = async (name: string) => {
    // console.log(config.isEditMode[name]);
    setConfig((prev) => ({
      ...prev,
      isEditMode: {
        ...prev.isEditMode,
        [name]: !prev.isEditMode[name],
      },
    }));
    // console.log(config.isEditMode[name]);
    if (config.isEditMode[name]) {
      try {
        const response = await axios.put(`${USER_API_URL}${currentUser._id}`, {
          [name]: currentUser[name],
        });
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleTextChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: event.target.value,
      } as RegisterType,
    }));
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files.item(0);
    if (file) {
      setImg(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!Object.values(config.isEditMode).every((value) => !value)) {
      setErrorMsg("Please click Upload button on the field");
      return;
    }
    if (!img || !imgName) {
      setErrorMsg("Please upload the imae and write the label");
      return;
    }

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "uploads");

    try {
      const response = await axios.post(`${CLODUINARY_API_URL}`, formData);
      console.log(response.data);

      const { secure_url, public_id, format } = response.data;
      const result = await axios.post(`${RECEIPT_API_URL}upload`, {
        secure_url,
        original_filename: imgName,
        public_id,
        format,
        username: currentUser.username,
        nameOnBankAccount: currentUser.nameOnBankAccount,
        accountNumber: currentUser.accountNumber,
        sortCodeWithDashes: currentUser.sortCodeWithDashes,
        amount: currentUser.amount,
      });
      console.log(result.data);
      setImgName("");
      setErrorMsg("");
      fileRef.current.value = "";
      fetchReceiptsData();
    } catch (error) {
      setErrorMsg("");
      console.error(error);
    }
  };

  // UserDashboarfRight
  const fetchReceiptsData = useCallback(async () => {
    try {
      const result = await axios.get(
        `${RECEIPT_API_URL}user/${currentUser.username}`
      );
      console.log(result.data);
      setData(result.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="App-header">
      <UserDashboardLeft
        enterLeftEditMode={enterLeftEditMode}
        handleTextChange={handleTextChange}
        handleFileInputChange={handleFileInputChange}
        handleSubmit={handleSubmit}
        currentUser={currentUser}
        config={config}
        fileRef={fileRef}
        imgName={imgName}
        setImgName={setImgName}
        setState={setState}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
      />
      <UserDashboardRight data={data} fetchReceiptsData={fetchReceiptsData} />
    </div>
  );
};

export default UserDashboard;
