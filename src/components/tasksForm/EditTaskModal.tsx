import React, { useEffect, useState } from "react";
import TaskPriorElementEdit from "./TaskPriorElementEdit";
import { editUserTask } from "./tasksApi.";

type Task = {
  id: string;
  name: string;
  checked: boolean;
  prior: number;
};

interface EditTaskModalProps {
  task?: Task;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
}

export default function EditTaskModal({
  task,
  isOpen,
  onClose,
  onEdit,
}: EditTaskModalProps) {
  const [taskName, setTaskName] = useState("");
  const [taskChecked, setTaskChecked] = useState(false);
  const [taskPrior, setTaskPrior] = useState(1);

  useEffect(() => {
    if (task && isOpen) {
      setTaskName(task.name);
      setTaskChecked(task.checked);
      setTaskPrior(task.prior);
    }
  }, [task, isOpen]);

  if (!isOpen || !task) return null;

  const handleSubmit = async () => {
    const updatedTask: Task = {
      ...task, //passa o id
      name: taskName,
      checked: taskChecked,
      prior: taskPrior,
    };

    try {
      const userId = sessionStorage.getItem("user_id");
      if (!userId) {
        throw new Error("Erro: user_id não encontrado no sessionStorage.");
      }

      await editUserTask(userId, updatedTask);
      onEdit && onEdit();
    } catch (err) {
      console.error("Error editing task:", err);
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="mx-auto w-full max-w-2xl bg-transparent p-6 text-background">
        <div
          className={`min-h-32 flex items-start justify-between p-4 rounded-lg shadow-md ${
            taskChecked
              ? "bg-task_background_checked"
              : "bg-task_background text-background"
          }`}
        >
          <div className="flex flex-col gap-2 min-h-24 w-full justify-between">
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={taskChecked}
                className="mt-1 w-5 h-5 appearance-none cursor-pointer rounded-full border border-background transition-colors checked:bg-header checked:border-header checked:bg-check hover:border-header/50 focus:outline-none focus:ring-2 focus:ring-header/20"
                onChange={() => setTaskChecked(!taskChecked)}
              />
              <textarea
                value={taskName}
                placeholder="Edit Task"
                onChange={(e) => setTaskName(e.target.value)}
                className={`w-full placeholder-foreground text-lg font-bold ${
                  taskChecked ? "line-through" : ""
                } bg-transparent focus:outline-none resize-none`}
                rows={3}
              />
            </div>

            <div className="ml-7">
              <TaskPriorElementEdit
                onPriorChange={(newPriority) => setTaskPrior(newPriority)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-between mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-task_prior_color_low text-background font-semibold rounded-full hover:bg-background"
          >
            Salvar Alterações
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
