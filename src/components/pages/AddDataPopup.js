import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const PoupdataModal = ({ show, handleClose, handleSave, taskList }) => {
  // Use the taskList prop instead of hardcoded tasks
  const [tasks, setTasks] = useState(taskList.map(task => ({ ...task, selected: false })));

  // Update tasks state when taskList prop changes
  React.useEffect(() => {
    setTasks(taskList.map(task => ({ ...task, selected: false })));
  }, [taskList]);

  const handleCheckboxChange = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, selected: !task.selected } : task // Only toggle the clicked checkbox
    );
    setTasks(updatedTasks);
  };

  const handleSaveChanges = () => {
    const selectedTasks = tasks.filter(task => task.selected);
    if (selectedTasks.length > 0) {
      handleSave(selectedTasks); // Pass the selected tasks to the parent
    }
    handleClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Select</th>
              <th>Task Name</th>
              <th>Description</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={task.selected}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                </td>
                <td>{task.taskname}</td>
                <td>{task.description}</td>
                <td>{task.comment}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PoupdataModal;