import React, { useEffect, useState } from "react";
import Task from "./Task";
import { fetchUserTasks, removeTask } from "./tasksApi.";
type Task = {
  id: string;
  name: string;
  checked: boolean;
  userId: string;
  prior: number;
};

interface TaskFormProps {
  userIdSub: string;
}

export default function TasksForm({ userIdSub }: TaskFormProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [isPriorSort, setIsPriorSort] = useState<boolean>(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        if (userIdSub) {
          console.log("isPriorSort:", isPriorSort);
          const userTasks = await fetchUserTasks(userIdSub, isPriorSort);
          console.log("As tasks:", userTasks);
          setTasks(userTasks);
        }
      } catch (err) {
        console.error("Erro ao carregar as tarefas:", err);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, [userIdSub]);

  const refreshPriorTasks = async () => {
    setIsPriorSort(prevState => {
      const newState = !prevState;
      refreshTasks(newState); 
      return newState;
    });
  };
  
  const refreshTasks = async (newSort: boolean) => {
    try {
      if (userIdSub) {
        console.log("isPriorSort:", newSort);
        const userTasks = await fetchUserTasks(userIdSub, newSort);
        console.log("As tasks recarregadas:", userTasks);
        setTasks(userTasks);
      }
    } catch (err) {
      console.error("Erro ao recarregar as tarefas:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto sm:w-full lg:w-5/6  rounded-xl bg-foreground p-6 shadow-xl text-background">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold ml-6 ">Tarefas</h1>
        <button
          onClick={() => refreshPriorTasks()}
          className="px-4 py-2 bg-header text-foreground font-semibold rounded-full hover:bg-background"
        >
          {isPriorSort ? "Prioridade" : "Concluídas"}
        </button>
      </div>
      <div className="flex flex-col gap-4 mb-4">
        {tasks.map((task) => (
          <Task key={task.id} onRemove={removeTask} {...task} />
        ))}
      </div>
      <div>
        <button className="px-4 py-2 bg-header text-foreground font-semibold rounded-full hover:bg-background">
          {" "}
          Nova Tarefa{" "}
        </button>
      </div>
    </div>
  );
}
