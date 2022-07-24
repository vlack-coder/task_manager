import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import Task from "./Task";

function Tasks() {
  const tasks = useSelector((state) => state.task.tasks);
  const status = useSelector((state) => state.task.staus);
  console.log("taskddscheck", tasks);

  if (tasks.length === 0 && status === "loading")
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100px",
          width: "300px",
        }}
      >
        <Loader />
      </div>
    );
  if (tasks.length === 0) <p>No Task Assigned yet</p>;

  return (
    <>
      {tasks.length !== 0 && (
        <motion.div
          initial={{ translateY: 100 }}
          animate={{ translateY: 0 }}
          transition={{
            // duration: 0.5, ease: "easeInOut",
            type: "spring",
            damping: 10,
            stiffness: 100,
          }}
        >
          {/* {status === "loading" && (
          <div className="task_loader">
            <p> Loading Tasks....</p>
            <Loader />
          </div>
        )} */}
          {tasks &&
            tasks.length !== 0 &&
            tasks.map((task) => <Task task={task} key={task?.id} />)}
        </motion.div>
      )}
    </>
  );
}

export default Tasks;
