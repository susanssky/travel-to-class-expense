import React, { useState, useEffect } from "react";
import { DataType } from "../../utils/types";
type PropsType = {
  item: DataType;
  handleSwitchProcessingComplete: (item: DataType) => Promise<void>;
};

const TableRow = ({ item, handleSwitchProcessingComplete }: PropsType) => {
  const [isShowImg, setIsShowImg] = useState<boolean>(true);
  useEffect(() => {
    if (item.status === "Completed") {
      setIsShowImg(false);
    }
  }, [item.status]);
  return (
    <>
      <tr key={`${item._id}_view`}>
        <td>{item.imgOriginalName}</td>
        <td>{item.nameOnBankAccount}</td>
        <td>{item.accountNumber}</td>
        <td>{item.sortCodeWithDashes}</td>
        <td>{item.amount}</td>
        <td>{item.status}</td>
        <td>
          <button
            className={`${isShowImg ? "blue-btn" : "red-btn"}`}
            onClick={() => setIsShowImg((prev) => !prev)}
          >
            {isShowImg ? "Yes" : "No"}
          </button>
        </td>
        <td>
          <button
            className={`${
              item.status === "In Progress" ? "red-btn" : "blue-btn"
            }`}
            onClick={() => handleSwitchProcessingComplete(item)}
          >
            {item.status === "In Progress" ? "No" : "Yes"}
          </button>
        </td>
      </tr>
      <tr key={`${item._id}_fold`}>
        {isShowImg && (
          <td colSpan={7} className="td-img">
            <img src={item.url} alt={item.imgOriginalName} width="50%" />
          </td>
        )}
      </tr>
    </>
  );
};

export default TableRow;
