import { useEffect, useState } from "react";
import styles from "./tasksEmpolyee.module.css";
import { axiosinstant, TASKS_URL } from "../../../../../../utils/urls";
import { motion } from "motion/react";

interface IUserTasksResponse {
  PageNumber: number;
  PageSize: number;
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
  data: TTask[];
}
type TTask = {
  id: number;
  title: string;
  description: string;
  status: TTaskStatus;
};
type TTaskStatus = "ToDo" | "InProgress" | "Done";

export default function TasksEmpolyee() {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const toDoTasks = tasks.filter(({ status }) => status == "ToDo");

  const InProgress = tasks.filter(({ status }) => status == "InProgress");
  const Done = tasks.filter(({ status }) => status == "Done");

  const getAllAssignTasks = async () => {
    try {
      const response = await axiosinstant.get<IUserTasksResponse>(
        TASKS_URL.GET_ASSIGNED_TASKS
      );
      console.log(response.data.data);
      setTasks(response.data.data);
    } catch (error: any) {
      console.error(
        "Error fetching assigned tasks:",
        error.response?.data || error
      );
    }
  };

  useEffect(() => {
    getAllAssignTasks();
  }, []);
  return (
    <>
      <main className={` ${styles.cardContiner}`}>
        <div className={`${styles.headerRow} mb-4`}>
          <h1 className="fs-2 fw-medium m-0">Task Board</h1>
        </div>
        <div className="d-flex  mt-4">
          <Column
            setTasks={setTasks}
            refetchTasks={getAllAssignTasks}
            title="ToDo"
            tasks={toDoTasks}
          />
          <Column
            setTasks={setTasks}
            refetchTasks={getAllAssignTasks}
            title="InProgress"
            tasks={InProgress}
          />

          <Column
            setTasks={setTasks}
            refetchTasks={getAllAssignTasks}
            title="Done"
            tasks={Done}
          />
        </div>
      </main>
    </>
  );
}

interface IProbs {
  title: TTaskStatus;
  tasks: TTask[];
  refetchTasks: () => Promise<void>;
  setTasks: React.Dispatch<React.SetStateAction<TTask[]>>;
}
export function Column({ tasks, title, refetchTasks, setTasks }: IProbs) {
  const changeStatusTasks = async (id: string, status: TTaskStatus) => {
    try {
      const response = await axiosinstant.put(TASKS_URL.CHANGETASKS(id), {
        status,
      });
      console.log(response);
    } catch (error: any) {
      console.error(
        "Error fetching assigned tasks:",
        error.response?.data || error
      );
    }
  };

  return (
    <>
      <div className={`d-flex flex-column ${styles.column}`}>
        <h2 className={`fs-4 ms-3 ${styles.subtitle}`}>{title}</h2>
        {/* show that access this card ,if darg to other colunm show + icon that indcate alow  recieves this */}
        <motion.div
  layout
          //call api change status
          onDrop={async (e :any) => {
            console.log({ staatus: title });
            const taskId = e.dataTransfer.getData("taskId");
            const prevStatus = e.dataTransfer.getData("status");

            console.log(taskId);
            if (prevStatus != title) {
              setTasks((prevTasks) => {
                const newTask = prevTasks.map((task) => {
                  if (task.id === +taskId) {
                    task.status === title;
                    return task;
                  } else {
                    return task;
                  }
                });
                return newTask;
              });
              await changeStatusTasks(taskId, title);
              await refetchTasks();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          className={`${styles.greenColumn} d-flex flex-column gap-3 `}
        >
          {tasks.map(({ id, title, status }) => (
            <motion.div
            layout
      layoutId={id.toString()}
              draggable
              onDragStart={(e: any) => {
                e.dataTransfer.setData("taskId", id.toString());
                e.dataTransfer.setData("status", status);

                console.log("start");
              }}
              onDragEnd={() => {
                console.log("end");
              }}
              key={id}
              className={`${styles.cardCustom} text-white rounded `}
            >
              {title}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
