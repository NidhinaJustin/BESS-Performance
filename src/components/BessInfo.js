import React, { useState, useEffect, useCallback } from "react";
import TableContent from "./TableContent";
import { batteries } from "./DataTableConstants";
import Pagination from "./Pagination";

export default function BessInfo() {
  const [batteryList, setBatteryList] = useState(batteries);
  const [searchKey, setSearchKey] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [sortByHealth, setSortByHealth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const handleInputChange = (e) => {
    setSearchKey(e.target.value);
  };
  
  const handlePaginateData = useCallback ((data) => {
    const indexOfLastUser = currentPage * postsPerPage;
    const indexOfFirstUser = indexOfLastUser - postsPerPage;
    data = data.slice(indexOfFirstUser, indexOfLastUser);
    setBatteryList(data);
  },[postsPerPage, currentPage]);

  useEffect(() => {
    let data = [...batteries];


    if (sortByHealth !== "") {
      data = batteries.filter(
        (item) =>
          item.health ===
          sortByHealth.charAt(0).toUpperCase() + sortByHealth.slice(1)
      );
    }
    if (searchKey !== "") {
      data = data?.filter((item) =>
        item?.name.toLowerCase().includes(searchKey.toLowerCase())
      );
    }
    handlePaginateData(data);
  }, [searchKey, sortByHealth, handlePaginateData]);
  
  // Function to update a random battery's health to trigger notifications.
  const updateRandomBatteryHealth = () => {
    const healthOptions = ["Poor", "Fair", "Good"];
    const updatedBatteries = [...batteryList];

    const randomIndex = Math.floor(Math.random() * updatedBatteries.length);

    const randomHealth =
      healthOptions[Math.floor(Math.random() * healthOptions.length)];
    const batteryName = updatedBatteries[randomIndex].name;
    const newNotification = `Health of ${batteryName} changed to ${randomHealth}`;

    updatedBatteries[randomIndex] = {
      ...updatedBatteries[randomIndex],
      health: randomHealth,
    };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
    setBatteryList(updatedBatteries);
  };


  // Trigger the notifications
  useEffect(() => {
    const intervalId = setInterval(updateRandomBatteryHealth, 3000);

    return () => clearInterval(intervalId);
  }, [batteryList]);


  const handleClickNotifications = () => {
    setIsOpenNotification(!isOpenNotification);
  };
  const handleSelectCheckbox = (e) => {
    setSortByHealth(e.target.value);
  };
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleResetSelection = (e) => {
    e.preventDefault();
    setSortByHealth("");
  };

return (
  <>
    <div className="center-container">
      <div className="w-full md:w-1/3">
        <div className="labelAlignment">
          <label>Search users</label>
          <input
            className="w-1/2 border rounded p-2 ml-2"
            type="text"
            name="searchKey"
            value={searchKey}
            onChange={handleInputChange}
            placeholder="Search batteries..."
          />
        </div>
      </div>

      <div className="w-full md:w-1/3">
        <div className="flex justify-center items-center mt-1">
          <label className="mr-1">Sort by health :</label>
          <div>
            <label className="mr-4">
              <input
                className="accent-green-500 mr-1"
                type="radio"
                checked={sortByHealth === "fair"}
                name="sortByHealth"
                value="fair"
                onChange={handleSelectCheckbox}
              />
              Fair
            </label>
            <label className="mr-4">
              <input
                className="accent-orange-500 mr-1"
                type="radio"
                checked={sortByHealth === "good"}
                name="sortByHealth"
                value="good"
                onChange={handleSelectCheckbox}
              />
              Good
            </label>
            <label>
              <input
                className="accent-red-500 mr-1"
                type="radio"
                checked={sortByHealth === "poor"}
                name="sortByHealth"
                value="poor"
                onChange={handleSelectCheckbox}
              />
              Poor
            </label>
            {sortByHealth !== "" && (
              <button
                className="ml-4 bg-gray-500 text-white rounded p-1"
                onClick={handleResetSelection}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/4">
        <div
          style={{ cursor: "pointer" }}
          onClick={handleClickNotifications}
          className="labelAlignment"
        >
          <i title="Notifications" className="material-icons float-right">
            notifications_active
          </i>
          {notifications.length>0 && <label>
            <b>{notifications.length }</b>
          </label>
          }
        </div>
        {isOpenNotification && notifications.length > 0 && (
          <div className="notificationBar bg-gray-100 p-4 rounded">
            {notifications.map((notification, key) => (
              <p key={key}>{notification}</p>
            ))}
          </div>
        )}
      </div>
    </div>

    <div className="flex justify-center mt-6">
      <div className="w-full md:w-11/12">
        <TableContent batteryList={batteryList} />
        {batteryList.length > 0 && (
          <div className="mt-6">
            <Pagination
              length={batteries.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              handlePagination={handlePagination}
            />
          </div>
        )}
      </div>
    </div>
  </>
);

}
