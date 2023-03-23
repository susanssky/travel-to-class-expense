import React, { useState, useEffect } from "react";
import { PropReceiptCardType, DataType } from "../../utils/types";

const ReceiptCard = ({
  item,
  deleteReceipt,
  editReceipt,
  editTableMode,
  setUpdatedReceipt,
  errorMsg,
}: PropReceiptCardType) => {
  const [receipt, setReceipt] = useState<DataType>(item);

  useEffect(() => {
    setUpdatedReceipt(receipt);
  }, [receipt]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReceipt((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const renderTd = (name: string, inputValue: DataType) => {
    return editTableMode === receipt._id ? (
      <input name={name} value={inputValue[name]} onChange={handleChange} />
    ) : (
      receipt[name]
    );
  };

  return (
    <div className="image-container">
      <a href={receipt.url}>
        <img src={receipt.url} alt={receipt.imgOriginalName} width="300" />
      </a>
      <div>
        <table>
          <tbody>
            <tr>
              <td colSpan={2}>{renderTd("imgOriginalName", receipt)}</td>
            </tr>
            <tr>
              <th scope="row">Bank Name</th>
              <td>{renderTd("nameOnBankAccount", receipt)}</td>
            </tr>
            <tr>
              <th scope="row">Account Number</th>
              <td>{renderTd("accountNumber", receipt)}</td>
            </tr>
            <tr>
              <th scope="row">Sort Code</th>
              <td>{renderTd("sortCodeWithDashes", receipt)}</td>
            </tr>
            <tr>
              <th scope="row">Amount</th>
              <td>£{renderTd("amount", receipt)}</td>
            </tr>
          </tbody>
        </table>
        {receipt.status !== "Completed" && (
          <button className="blue-btn" onClick={() => editReceipt(receipt)}>
            {editTableMode ? "Update" : "Edit"}
          </button>
        )}

        {receipt.status !== "Completed" && (
          <button
            className="red-btn"
            onClick={() => deleteReceipt(receipt.public_id, receipt._id)}
          >
            Delete
          </button>
        )}
        <span className="error-msg">{errorMsg}</span>
      </div>
    </div>
  );
};

export default ReceiptCard;
