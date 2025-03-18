import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Table, Form, Card, Toast, ToastContainer } from 'react-bootstrap';
import { FaTrash, FaUser, FaCalendarAlt, FaPlus, FaCheck } from 'react-icons/fa'; // Import icons
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from "./AddDataPopup";
import '../../Styles/dashboard.css';

function Dashboard() {
  const location = useLocation();
  const username = location.state?.username || "Guest";
  const userId = location.state?.userId; // Get userId from location.state
  const timeSlots = location.state?.time || []; // Get the time array from location.state
  const [timePeriod, setTimePeriod] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [timeLoggedDetails, setTimeLoggedDetails] = useState([]); // Store time-logged details
  const [taskList, setTaskList] = useState([]); // Store task list for AddTaskPopup
  const [isDisabled, setIsDisabled] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");


  // Fetch data when timePeriod changes
  useEffect(() => {
    if (timePeriod) {
      fetchTimeLoggedDetails(timePeriod);
    }
  }, [timePeriod]);

  // Function to fetch time-logged details
  const fetchTimeLoggedDetails = async (timeId) => {
    try {
      //const response = await fetch(`https://example.com/api/time-logged?userId=${userId}&timeId=${timeId}`);
      const data = {
        "timeLoggedDetails": [
         
        ],
        "taskList": [
          {
            "id": 1,
            "taskname": "Task 1",
            "description": "Description 1"
          },
          {
            "id": 2,
            "taskname": "Task 2",
            "description": "Description 2"
          }
        ]
      }

    //  if (response.ok) {
    if(data.timeLoggedDetails.length!=0){
      setSelectedTasks(data.timeLoggedDetails); // Set time-logged details
      setIsDisabled(true)
    }
        setTaskList(data.taskList); // Set task list for AddTaskPopup
     // } else {
      //  console.error("Failed to fetch time-logged details:", data.message);
    //  }
    } catch (err) {
      console.error("Error fetching time-logged details:", err);
    }
  };

  const postSelectedTasks = async () => {
    try {
      // const response = await fetch('https://example.com/api/log-tasks', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     userId,
      //     tasks: selectedTasks,
      //   }),
      // });

      // const data = await response.json();

      // if (response.ok) {
        setToastMessage("Tasks logged successfully!");
        setToastVariant("success");
        setShowToast(true);
      // } else {
      //   setToastMessage(data.message || "Failed to log tasks.");
      //   setToastVariant("danger");
      //   setShowToast(true);
      // }
    } catch (err) {
      setToastMessage("An error occurred. Please try again.");
      setToastVariant("danger");
      setShowToast(true);
      console.error("Error posting tasks:", err);
    }
  };

  const handleSave = (tasks) => {
    const uniqueTasks = tasks.filter(
      (task) => !selectedTasks.some((selectedTask) => selectedTask.id === task.id)
    );

    // Add percentageWorkDone field to the new tasks
    const newTasks = uniqueTasks.map((task) => ({ ...task, percentageWorkDone: 0 }));

    // Update selectedTasks state
    setSelectedTasks([...selectedTasks, ...newTasks]);
  };

  const handlePercentageChange = (id, value) => {
    const updatedTasks = selectedTasks.map(task =>
      task.id === id ? { ...task, percentageWorkDone: parseInt(value, 10) || 0 } : task
    );
    setSelectedTasks(updatedTasks);
  };

  const totalPercentage = selectedTasks.reduce((sum, task) => sum + (task.percentageWorkDone || 0), 0);

  const handleLog = () => {
    if (totalPercentage === 100) {
      postSelectedTasks(); // Post selected tasks to the API
    } // Log tasks to the console
  };

  const handleDelete = (id) => {
    const updatedTasks = selectedTasks.filter(task => task.id !== id);
    setSelectedTasks(updatedTasks);
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark p-3 d-flex justify-content-between align-items-center">
        <span className="navbar-brand mb-0 h1">Time Sheet</span>
        <div className="d-flex align-items-center">
          <span className="text-light me-3">Welcome, {username}!</span>
          <FaUser className="text-light" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Time Period Card */}
        <Card className="time-period-card">
          <Card.Body>
            <div className="d-flex align-items-center">
              <FaCalendarAlt className="calendar-icon" />
              <div className="ms-3">
                <h5>Time Period</h5>
                <select
                  className="form-select"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                >
                  <option value="">Select</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Add Task Button */}
        <Button className="add-task-button" disabled={isDisabled || timePeriod==""} onClick={() => setShowPopup(true)}>
          <FaPlus className="me-2" /> Add Task
        </Button>

        {/* Tasks Table */}
        <Card className="tasks-card">
          <Card.Body>
            <h5>Selected Tasks</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Description</th>
                  <th>Comment</th>
                  <th>Percentage Work Done</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedTasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.taskname}</td>
                    <td>{task.description}</td>
                    <td>{task.comment}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={task.percentageWorkDone}   disabled={isDisabled}
                        onChange={(e) => handlePercentageChange(task.id, e.target.value)}
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"   disabled={isDisabled}
                        onClick={() => handleDelete(task.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Log Button */}
        <Button
          className="log-button"
          onClick={handleLog}
          disabled={totalPercentage !== 100 ||isDisabled}
        >
          <FaCheck className="me-2" /> Log Tasks
        </Button>
      </div>

      {/* Popup for Adding Tasks */}
      <Popup
        show={showPopup}
        handleSave={handleSave}
        handleClose={() => setShowPopup(false)}
        taskList={taskList} // Pass task list to the popup
      />

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="toast-container">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastVariant} // Set background color based on variant
        >
          <Toast.Header  className={`toast-header ${toastVariant}`}>
            <strong className="me-auto">{toastVariant === "success" ? "Success" : "Error"}</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Dashboard;