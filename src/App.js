import { useEffect } from "react";
import { Audio } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Tasks from "./Components/Task/Tasks";
import { getUsers } from "./redux/appSlice";
import { getTasks } from "./redux/taskSlice";
import TaskFormContainer from "./TaskContainer";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.task.staus);
  useEffect(() => {
    dispatch(getTasks());
    dispatch(getUsers());
  }, [dispatch]);
  // useEffect(() => {
  //   try {
  //     dispatch(getTasks()).unwrap();
  //     dispatch(getUsers()).unwrap();
  //   } catch (error) {
  //     console.log('apperror', error)
  //   }
  // }, [dispatch]);

  return (
    <>
      <nav />
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TaskFormContainer />
        {status === "loading" ? (
          <Audio height="100" width="100" color="grey" ariaLabel="loading" />
        ) : (
          <Tasks />
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
