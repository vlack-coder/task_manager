import React from "react";
import "./Task.css";
import { BsCheck } from "react-icons/bs";
import { MdEditNotifications } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleFormState } from "../../redux/appSlice";
import { motion } from "framer-motion";

function Task({ task }) {
  const dispatch = useDispatch();
  const { task_date, task_msg } = task || {};
  return (
    <motion.div layout className="tassk">
      <div className="task_content">
        <div className="avatar">
          <img
            src="http://www.gravatar.com/avatar/8819dc24c18e9a4671a832c8254b8cc1?default=https%3A%2F%2Fs3.sloovi.com%2Favatar-default-icon.png"
            alt="avatar"
          />
        </div>
        <div className="task_date">
          <p className="t_task">{task_msg}</p>
          <p className="t_date">{task_date}</p>
        </div>
      </div>
      <div className="task_action_btn">
        <button
          onClick={() =>
            dispatch(
              toggleFormState({
                edit: true,
                task,
                open: true,
                resetTask: false,
              })
            )
          }
        >
          <MdModeEdit size={"14px"} />
        </button>
        <div>
          <button>
            <MdEditNotifications size={"14px"} />
          </button>
          <button style={{ borderLeft: "none" }}>
            <BsCheck size={"14px"} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Task;
