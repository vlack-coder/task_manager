import React, { useEffect, useRef } from "react";
import { BiTimeFive } from "react-icons/bi";
import { BsPersonBadge } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";
import { toast } from "react-toastify";
import "./Taskform";

import { Field, Formik } from "formik";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { ImBin } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getSec, getTimezone, timeInterval } from "../../helper/helper";
import { toggleFormState } from "../../redux/appSlice";
import { addTask, removeTask, updateTask } from "../../redux/taskSlice";
import Input from "../Input/Input";
import "./TaskForm.css";
import { AnimatePresence, motion } from "framer-motion";

const validationSchema = Yup.object().shape({
  assignUser: Yup.string().required("assignUser a required"),
  time: Yup.string().required("time is required"),
  message: Yup.string().required("task is required"),
  date: Yup.string().required("date is required"),
});

function Taskform() {
  const formikRef = useRef();
  const users = useSelector((state) => state.app.users);

  const singleTask = useSelector((state) => state.app.singleTask);
  useEffect(() => {
    if (formikRef.current) {
      formikRef.current?.resetForm();
    }
  }, [singleTask]);

  const dispatch = useDispatch();
  const initialValues = {
    message: (singleTask && singleTask.task_msg) || "",
    date:
      (singleTask?.task_date && new Date(singleTask?.task_date)) || new Date(),
    time:
      (singleTask?.task_time &&
        moment.utc(+singleTask?.task_time * 1000).format("hh:mma")) ||
      timeInterval[0].value,

    assignUser:
      singleTask?.assigned_user || (users.length !== 0 && users[0].value),
  };
  const handleSubmit = async (task) => {
    try {
      console.log("task", task);
      const values = {
        assigned_user: task.assignUser,

        task_date: moment(task.date).format("YYYY-MM-DD"),

        task_time: getSec(task.time),
        is_completed: 0,
        time_zone: getTimezone,
        task_msg: task.message,
      };
      dispatch(toggleFormState({ edit: false, open: false }));
      toast.promise(
        singleTask
          ? dispatch(updateTask({ id: singleTask?.id, task: values }))
          : dispatch(addTask(values)),
        {
          pending: singleTask ? "Updating Task 😴😴😴" : "Adding Task 😴😴😴",
          success: singleTask ? "Task Updated 😎😎😎" : "Task Added 😎😎😎",
          error: singleTask ? "Not UPDATED 🤯🤯🤯" : "Not added 🤯🤯🤯",
        }
      );
    } catch (error) {
      console.log("rtror", { error });
    }
  };

  return (
      <div
        key="content"
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { opacity: 1, height: "auto" },
          collapsed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="form"
      >
        <Formik
          enableReinitialize
          innerRef={formikRef}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, handleChange, values, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field name="message">
                  {({ field, form }) => {
                    const { name } = field;
                    const { errors } = form;

                    return (
                      <Input
                        {...field}
                        error={errors[name]}
                        value={values.message}
                        onChange={handleChange}
                        label={"Task Description"}
                        placeholder={"Add Task"}
                        icon={<BsPersonBadge size={"18px"} />}
                        textInput
                      />
                    );
                  }}
                </Field>
                <div className="date_time">
                  <Field name="date">
                    {({ field, form }) => {
                      return (
                        <Input
                          {...field}
                          datepick
                          dateValue={values.date}
                          onChange={(val) => {
                            setFieldValue(field.name, val);
                          }}
                          label="Date"
                          leftIcon
                          icon={<GoCalendar size={"18px"} />}
                        />
                      );
                    }}
                  </Field>
                  <Field name="time">
                    {({ field, form }) => {
                      return (
                        <Input
                          {...field}
                          value={values.time}
                          onChange={(value) =>
                            setFieldValue("time", value.value)
                          }
                          label="Time"
                          selectOptions={timeInterval}
                          leftIcon
                          placeholder={"Select Time"}
                          icon={<BiTimeFive size={"18px"} />}
                          select
                        />
                      );
                    }}
                  </Field>
                </div>

                <Field name="assignUser">
                  {({ field, form }) => {
                    return (
                      <Input
                        {...field}
                        value={values.assignUser}
                        selectOptions={users && users}
                        onChange={(value) =>
                          setFieldValue("assignUser", value.value)
                        }
                        label={"Assign User"}
                        placeholder={"Assign User"}
                        select
                        s
                      />
                    );
                  }}
                </Field>

                {/* Save and Cancel  */}
                <div className="save_cancel_cont">
                  <div>
                    {singleTask && (
                      <ImBin
                        onClick={async () => {
                          toast.promise(dispatch(removeTask(singleTask?.id)), {
                            pending: "Deleting Task",
                            success: "Task deleted 👌",
                            error: "Task not deleted 🤯",
                          });
                          dispatch(
                            toggleFormState({
                              edit: false,
                              open: false,
                              resetTask: true,
                            })
                          );
                        }}
                        style={{ marginLeft: "5px" }}
                        size={"15px"}
                      />
                    )}
                  </div>

                  <div className="cancel_save">
                    <button
                      onClick={() =>
                        dispatch(
                          toggleFormState({
                            edit: false,
                            open: false,
                            resetTask: true,
                          })
                        )
                      }
                      className="button cancel"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="button save">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
  );
}

export default Taskform;
