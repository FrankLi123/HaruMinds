import React, { useState } from "react";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TaskCreationPage = ({ addTask,  removeTask }) => {
  
  const [taskName, setTaskName] = useState('');
  const [planTime, setPlanTime] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleCreateTask = () => {
    if (taskName.trim() === "" || planTime.trim() === "") {
      alert("Please enter both task name and plan time.");
      return;
    }

    const time = parseInt(planTime, 10);
    if (isNaN(time) || time <= 0) {
      alert("Please enter a valid plan time (a positive number).");
      return;
    }

    const newTask = {
      name: taskName,
      time: time,
    };

    addTask(newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskName("");
    setPlanTime("");
    console.log("tasks are:", tasks);
  };

  const handleRemoveTask = (index) => {
    removeTask(index);
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <MKBox mx={5} mt={3} p={4} mb={4} textAlign="center">
        <Typography variant="h5">Create Your Task</Typography>
        <MKInput
          label="Task Name"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <MKInput
          label="Plan Time (min)"
          id="planTime"
          value={planTime}
          onChange={(e) => setPlanTime(e.target.value)}
        />
        <MKButton variant="outlined" color="dark" onClick={handleCreateTask}>
          Create Task
        </MKButton>
        {/* Display the list of tasks in a table */}
        {tasks.length > 0 && (
          <div>
            <Table>
              <TableHead>
                <TableRow>
        
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>{task.time}</TableCell>
                    <TableCell>
                      <MKButton
                        variant="outlined"
                        color="dark"
                        onClick={() => handleRemoveTask(index)}
                      >
                        Remove
                      </MKButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </MKBox>
    </Card>
  );
};

export default TaskCreationPage;