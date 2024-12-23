import React, { useState } from "react";
import TaskPriorElementEdit from "./TaskPriorElementEdit";
import { createUserTask } from "./tasksApi.";

type NewTask = {
  name: string;
  checked: boolean;
  prior: number;
};

interface NewTaskModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({
  userId,
  isOpen,
  onClose,
}: NewTaskModalProps) {
  if (!isOpen) return null;

  const [taskName, setTaskName] = useState("");
  const [taskChecked, setTaskChecked] = useState(false);
  const [taskPrior, setTaskPrior] = useState(1);

  const handleSubmit = async () => {
    const newTask: NewTask = {
      name: taskName,
      checked: taskChecked,
      prior: taskPrior,
    };

    console.log("Nova Tarefa Enviada para Criação:", newTask);

    try {
      const userId = sessionStorage.getItem("user_id");
      if (userId) {
        const createdTask = await createUserTask(userId, newTask);
        console.log("Tarefa Criada com Sucesso:", createdTask);
      } else {
        console.error("Erro: user_id não encontrado no sessionStorage.");
      }
    } catch (err) {
      console.error("Erro ao Criar a Tarefa:", err);
    } finally {
      onClose(); // Fecha o modal após a criação
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskName(e.target.value);
  };

  const handleCheckedChange = () => {
    setTaskChecked(!taskChecked);
  };

  const handlePriorityChange = (newPriority: number) => {
    setTaskPrior(newPriority);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="mx-auto sm:w-full lg:w-5/6 bg-transparent p-6 text-background">
        <div
          className={`min-h-32 flex items-start justify-between p-4 rounded-lg shadow-md mr-1 ${
            taskChecked
              ? "bg-task_background_checked"
              : "bg-task_background text-background"
          }`}
        >
          <div className="flex flex-col gap-2 min-h-24 min-w-full justify-between">
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={taskChecked}
                className={`mt-1 w-5 h-5 appearance-none cursor-pointer rounded-full border border-background transition-colors checked:bg-header checked:border-header checked:bg-check hover:border-header/50 focus:outline-none focus:ring-2 focus:ring-header/20`}
                onChange={handleCheckedChange}
              />
              <textarea
                value={taskName}
                placeholder="Nova Tarefa"
                onChange={handleNameChange}
                className={`placeholder-foreground text-lg font-bold min-w-full ${
                  taskChecked ? "line-through" : ""
                } overflow-hidden bg-transparent focus:outline-none resize-none`}
                rows={3} // Define o número inicial de linhas visíveis
              />
            </div>

            <div className="ml-7">
              <TaskPriorElementEdit onPriorChange={handlePriorityChange} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 min-w-full justify-between mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-task_prior_color_low text-background font-semibold rounded-full hover:bg-background"
          >
            Criar Tarefa
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-task_prior_color_high text-background font-semibold rounded-full hover:bg-background"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
