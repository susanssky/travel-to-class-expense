import React from "react";
import { PropUserDashboardLeftType } from "../../utils/types";

const UserDashboardLeft = ({
  enterLeftEditMode,
  handleTextChange,
  handleFileInputChange,
  handleSubmit,
  currentUser,
  config,
  fileRef,
  imgName,
  setImgName,
  setState,
  errorMsg,
  setErrorMsg,
}: PropUserDashboardLeftType) => {
  return (
    <div className="left-container">
      <div className="center">
        <button
          onClick={() =>
            setState({
              action: "login",
              user: null,
            })
          }
        >
          Login out
        </button>
      </div>

      <h1>Travel to Class Expense</h1>
      <form className="inputs" onSubmit={handleSubmit}>
        {Object.keys(currentUser).map(
          (key) =>
            key !== "_id" &&
            key !== "isAdmin" &&
            key !== "username" && (
              <div className="input" key={key}>
                <label htmlFor={key} className="label">
                  {config.fieldName[key]}
                  <button
                    type="button"
                    name={key}
                    onClick={() => enterLeftEditMode(key)}
                  >
                    {config.isEditMode[key] ? "Upda​te" : "Edit"}
                  </button>
                  <br />
                  <p className="tips">{config.tips[key]}</p>
                </label>
                {!config.isEditMode[key] && (
                  <p className="userInfo">
                    {key === "amount" && "£"}
                    {currentUser[key]}
                  </p>
                )}
                {config.isEditMode[key] && (
                  <input
                    className="userInput"
                    id={key}
                    name={key}
                    type="text"
                    value={currentUser[key]}
                    onChange={(event) => handleTextChange(key, event)}
                  />
                )}
              </div>
            )
        )}
        <div className="upload-box">
          <label htmlFor="">Upload your receipt.</label>
          <input
            type="file"
            onChange={handleFileInputChange}
            ref={fileRef}
            accept="image/*,.pdf"
          />
          <br />
          <br />
          <label htmlFor="file">
            Make sure you label your receipt BEFORE you upload so we know who it
            belongs to!
            <p className="tips">
              name Surname_type of expenses_go class date(yyyymmdd)
              <br />
              Example: JaneSmith_travel_20221229
            </p>
          </label>

          <div className="inputs">
            <input
              className="upload-input"
              type="text"
              placeholder="JaneSmith_travel_20221229"
              value={imgName}
              onChange={(e) => setImgName(e.target.value.trim())}
            />
          </div>
        </div>
        <span className="error-msg">{errorMsg}</span>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserDashboardLeft;
