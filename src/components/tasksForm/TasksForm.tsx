import React, { useEffect, useState } from "react";
import Task from "./Task";
import { fetchUserTasks, removeTask } from "./tasksApi.";
import TaskModal from "./TaskModal";
import CreateTaskModal from "./CreateTaskModal";
import PulseLoader from "react-spinners/PulseLoader";

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
  const [taskEdit, setTaskEdit] = useState<Task>();
  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setIsModalText] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  //modal
  //create task modal
  const [isCreateTaskModalOpen, setCreateTaskIsModalOpen] = useState(false);
  const openTaskModal = () => setCreateTaskIsModalOpen(true);
  const closeTaskModal = () => {
    refreshTasks(isPriorSort);
    setCreateTaskIsModalOpen(false);
  };
  //create task modal

  const [loading, setLoading] = useState<boolean>(true);
  const [isPriorSort, setIsPriorSort] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const getTasks = async () => {
      try {
        if (userIdSub) {
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
    setIsPriorSort((prevState) => {
      const newState = !prevState;
      refreshTasks(newState);
      return newState;
    });
  };

  const refreshTasks = async (newSort: boolean) => {
    try {
      if (userIdSub) {
        setLoading(true);
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

  const removeTaskModal = async (id: string, userId: string) => {
    try {
      let res = removeTask(id, userId);
      setLoading(true);
      if (await res) {
        setIsModalText("Tarefa Deletada com Sucesso");
        openModal();
        refreshTasks(isPriorSort);
      } else {
        setIsModalText("Erro ao Deletar a Tarefa");
        openModal();
      }
    } catch (err) {
      console.error("Erro ao Deletar a tarefa:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto sm:w-full lg:w-5/6  rounded-xl bg-foreground p-6 shadow-xl text-background">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold ml-6 ">Tarefas</h1>

          <PulseLoader color="var(--background)" loading={loading} size={10} />
        </div>

        <button
          onClick={() => refreshPriorTasks()}
          className="px-4 py-2 bg-header text-foreground font-semibold rounded-full hover:bg-background"
        >
          {isPriorSort ? "Prioridade" : "Concluídas"}
        </button>
      </div>
      <div className="flex flex-col gap-4 mb-4 max-h-[33rem] overflow-y-scroll scrollbar scrollbar-thumb-header scrollbar-thumb-rounded-full scrollbar-thumb-shadow-md  ">
        {tasks.map((task) => (
          <Task
            key={task.id}
            onRefresh={() => refreshTasks(isPriorSort)}
            onRemove={removeTaskModal}
            {...task}
          />
        ))}
      </div>

      <div>
        <button
          onClick={() => openTaskModal()}
          className="px-4 py-2 bg-header text-foreground font-semibold rounded-full hover:bg-background"
        >
          Nova Tarefa
        </button>
        <TaskModal
          modalText={modalText}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
        <CreateTaskModal
          isOpen={isCreateTaskModalOpen}
          onClose={closeTaskModal}
          userId={userIdSub}
        />
      </div>
    </div>
  );
}
