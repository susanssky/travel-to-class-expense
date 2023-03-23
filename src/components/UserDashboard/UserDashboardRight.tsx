import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataType, PropUserDashboardRightType } from "../../utils/types";
import { RECEIPT_API_URL } from "../../utils/apiUrl";
import ReceiptCard from "./ReceiptCard";

const UserDashboardRight = ({
  data,
  fetchReceiptsData,
}: PropUserDashboardRightType) => {
  const [editTableMode, setEditTabelModel] = useState<string | null>(null);
  const [updatedReceipt, setUpdatedReceipt] = useState<DataType>({});
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    fetchReceiptsData();
  }, []);

  const editReceipt = async (receipt: DataType) => {
    try {
      if (!editTableMode) {
        setEditTabelModel(receipt._id);
        setUpdatedReceipt(receipt);
      }

      console.log(!Object.values(receipt).every((value) => value !== ""));
      if (!Object.values(receipt).every((value) => value !== "")) {
        setErrorMsg("Don't empty value");
        return;
      }

      if (editTableMode) {
        const result = await axios.put(
          `${RECEIPT_API_URL}${updatedReceipt._id}`,
          updatedReceipt
        );
        fetchReceiptsData();
        setEditTabelModel(null);
        setUpdatedReceipt({});
        setErrorMsg("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReceipt = async (public_id: string, id: string) => {
    try {
      const result = await axios.delete(`${RECEIPT_API_URL}${id}`, {
        data: { public_id },
      });
      fetchReceiptsData();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="right-container">
      {data.map((item) => (
        <ReceiptCard
          key={item._id}
          item={item}
          deleteReceipt={deleteReceipt}
          editReceipt={editReceipt}
          editTableMode={editTableMode}
          setEditTabelModel={setEditTabelModel}
          updatedReceipt={updatedReceipt}
          setUpdatedReceipt={setUpdatedReceipt}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />
      ))}
    </div>
  );
};

export default UserDashboardRight;
