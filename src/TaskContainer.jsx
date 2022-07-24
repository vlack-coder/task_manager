import React from "react";
import "./Task.css";

import { useDispatch, useSelector } from "react-redux";
import Taskform from "./Components/TaskForm/Taskform";
import { toggleFormState } from "./redux/appSlice";
import { AnimatePresence, motion } from "framer-motion";

function Task() {
  const dispatch = useDispatch();
  const noOfTasks = useSelector((state) => state.task.tasks);
  const formIsOpen = useSelector((state) => state.app.formIsOpen);

  return (
    <div className="task">
      <div className="task_form">
        {/* Task Header  */}
        <div className="task_header">
          <div className="task_header_content">
            <p>TASKS &nbsp;</p>
            <p>{noOfTasks.length}</p>
          </div>
          <button
            onClick={() =>
              dispatch(
                toggleFormState({ edit: false, open: true, resetTask: false })
              )
            }
            className="button-6"
          >
            +
          </button>
        </div>
        {/* Task Form  */}
        {formIsOpen && (
          <AnimatePresence>
            <motion.div
              key="form"
              initial={{ opacity: 0, height: -5 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ y: "50%", height: 0 }}
              // transition={{ duration: 0.1 }}
              transition={{ duration: 0.6, ease: [0.2, 0.32, 0.56, 0.98] }}
            >
              <Taskform></Taskform>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default Task;
