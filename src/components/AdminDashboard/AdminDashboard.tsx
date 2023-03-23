import React, { useEffect, useState } from "react";
import { RegisterType, StateType, DataType } from "../../utils/types";
import { RECEIPT_API_URL } from "../../utils/apiUrl";
import axios from "axios";
import DownloadCSV from "./DownloadCSV";
import TableRow from "./TableRow";
type PropType = {
  currentUser: RegisterType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};
type ButtonType = {
  All: boolean;
  Processing: boolean;
  Completed: boolean;
};
const AdminDashBoard = ({ setState }: PropType) => {
  const btnArr = ["All", "Processing", "Completed"];
  const [originalData, setOriginalData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [currentlyButton, setCurrentlyButton] = useState<ButtonType>({
    All: false,
    Processing: true,
    Completed: false,
  });

  const fetchData = async () => {
    try {
      const result = await axios.get(`${RECEIPT_API_URL}`);
      setOriginalData(result.data);
      if (currentlyButton.Processing) {
        setFilteredData(
          result.data.filter((item: DataType) => item.status === "In Progress")
        );
      } else if (currentlyButton.Completed) {
        setFilteredData(
          result.data.filter((item: DataType) => item.status === "Completed")
        );
      } else {
        setFilteredData(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSwitchProcessingComplete = async (item: DataType) => {
    try {
      if (item.status === "In Progress") {
        const response = await axios.put(`${RECEIPT_API_URL}${item._id}`, {
          ...item,
          status: "Completed",
        });
        console.log(response.data);
      } else if (item.status === "Completed") {
        const response = await axios.put(`${RECEIPT_API_URL}${item._id}`, {
          ...item,
          status: "In Progress",
        });
        console.log(response.data);
      }
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleShowTaskByStatus = (key: string) => {
    setCurrentlyButton({
      All: false,
      Processing: false,
      Completed: false,
      [key]: true,
    });
  };
  useEffect(() => {
    const showTask = () => {
      let data = originalData;
      if (currentlyButton.Processing) {
        data = data.filter((item) => item.status === "In Progress");
      } else if (currentlyButton.Completed) {
        data = data.filter((item) => item.status === "Completed");
      }
      setFilteredData(data);
    };
    showTask();
  }, [currentlyButton]);

  return (
    <>
      <nav className="admin-nav">
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
        <h1>Travel to Class Expense</h1>
        <DownloadCSV CSVData={filteredData} />
        <div>
          {btnArr.map((btn, index) => (
            <button
              key={`${index}-${btn}`}
              disabled={currentlyButton[btn as keyof typeof currentlyButton]}
              onClick={() => handleShowTaskByStatus(btn)}
              value={btn}
            >
              {btn}
            </button>
          ))}
        </div>
        <button onClick={fetchData}>Refresh</button>
      </nav>
      <main className="admin-main">
        <table cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th>Img Name</th>
              <th>Name on Bank Account</th>
              <th>Account Number</th>
              <th>Sort Code</th>
              <th>Amount</th>
              <th>Status</th>
              <th>showing receipt?</th>
              <th>complete?</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <TableRow
                key={item._id}
                item={item}
                handleSwitchProcessingComplete={handleSwitchProcessingComplete}
              />
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default AdminDashBoard;
