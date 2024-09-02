import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { Input, Button } from "reactstrap";
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

    if (searchKey !== "") {
      data = batteries?.filter((item) =>
        item?.name.toLowerCase().includes(searchKey.toLowerCase())
      );
    }
    if (sortByHealth !== "") {
      data = data.filter(
        (item) =>
          item.health ===
          sortByHealth.charAt(0).toUpperCase() + sortByHealth.slice(1)
      );
    }
    handlePaginateData(data);
  }, [searchKey, sortByHealth, handlePaginateData]);
  
  // Function to update a random battery's health
  const updateRandomBatteryHealth = () => {
    const healthOptions = ["Poor", "Fair", "Good"];
    // let notificationList= [...notifications];
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
    // notificationList.push(newNotification);
    // console.log(notificationList);

    // setNotifications(notificationList);
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
    setBatteryList(updatedBatteries);
  };


  //Trigger the notifications
  useEffect(() => {
    const intervalId = setInterval(updateRandomBatteryHealth, 2000);

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
      <Row>
        <Col md={4}>
          <div className="labelAlignment">
            <label>Search Users</label>
            <Input
              className="w-50"
              type="text"
              name="searchKey"
              value={searchKey}
              onChange={handleInputChange}
              placeholder="Search batteries..."
            />
          </div>
        </Col>
        <Col md={4}>
          <div className="labelAlignment">
            <label>Sort by Health</label>
            <div>
              <label>
                <Input
                  className="fairHealth"
                  type="radio"
                  checked={sortByHealth === "fair"}
                  name="sortByHealth"
                  value="fair"
                  onChange={handleSelectCheckbox}
                ></Input>
                Fair
              </label>
              <label>
                <Input
                  className="goodHealth"
                  type="radio"
                  checked={sortByHealth === "good"}
                  name="sortByHealth"
                  value="good"
                  onChange={handleSelectCheckbox}
                ></Input>
                Good
              </label>
              <label>
                <Input
                  className="poorHealth"
                  type="radio"
                  checked={sortByHealth === "poor"}
                  name="sortByHealth"
                  value="poor"
                  onChange={handleSelectCheckbox}
                ></Input>
                Poor
              </label>
              <Button onClick={handleResetSelection}>Reset</Button>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div
            style={{ cursor: "pointer" }}
            onClick={handleClickNotifications}
            className="labelAlignment"
          >
            <i title="Notifications" className="material-icons float-end">
              notifications_active
            </i>
            <label>
              <b>{notifications.length}</b>
            </label>
          </div>
          {isOpenNotification && notifications.length > 0 && (
            <div className="noticationBar">
              {notifications.map((notification, key) => (
                <p key={key}>{notification}</p>
              ))}
            </div>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={11}>
          <TableContent batteryList={batteryList} />
          {batteryList.length > 0 && (
            <Row>
              <Col md={12} col-sm={12}>
                <Pagination
                  length={batteries.length}
                  postsPerPage={postsPerPage}
                  currentPage={currentPage}
                  handlePagination={handlePagination}
                />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
}
