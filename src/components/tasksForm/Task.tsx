import React, { useState } from "react";
import TaskPriorElement from "./TaskPriorElement";
import EditTaskModal from "./EditTaskModal";

interface TaskProps {
  id: string;
  name: string;
  userId: string;
  checked?: boolean;
  prior: number;
  onRemove?: (id: string, userId: string) => void;
  onToggle?: (id: string, checked: boolean) => void;
  onRefresh?: () => void;
}

type Task = {
  id: string;
  name: string;
  checked: boolean;
  prior: number;
};

export default function Task({
  id,
  name,
  userId,
  checked = false,
  prior,
  onRemove,
  onToggle,
  onRefresh,
}: TaskProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const task: Task = {
    id,
    name,
    checked,
    prior,
  };

  const handleEditComplete = () => {
    setIsEditModalOpen(false);
    onRefresh?.();
  };

  return (
    <>
      <div
        className={`min-h-32 flex items-start justify-between p-4 rounded-lg shadow-md mr-1 ${
          checked
            ? "bg-task_background_checked"
            : "bg-task_background text-background"
        }`}
      >
        <div className="flex flex-col gap-2 min-h-24 justify-between flex-1">
          <div className="flex gap-2 items-start">
            <input
              type="checkbox"
              checked={checked}
              className="mt-1 w-5 h-5 appearance-none rounded-full border border-background transition-colors checked:bg-header checked:border-header checked:bg-check hover:border-header/50 focus:outline-none focus:ring-2 focus:ring-header/20"
              onChange={() => onToggle?.(id, !checked)}
            />
            <span
              className={`text-lg font-bold ${
                checked ? "line-through" : ""
              } break-words`}
            >
              {name}
            </span>
          </div>

          <div className="ml-7">
            <TaskPriorElement priority={prior} />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          {!checked && (
            <button
              className="flex items-center justify-center w-8 h-8 text-xl font-bold text-red-500 bg-red-100 rounded-full hover:bg-red-200"
              onClick={() => onRemove?.(id, userId)}
              aria-label="Remove task"
            >
              −
            </button>
          )}
          <button
            className="flex items-center justify-center w-8 h-8 text-xl font-bold text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => setIsEditModalOpen(true)}
            aria-label="Edit task"
          >
            ⋯
          </button>
        </div>
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onEdit={handleEditComplete}
      />
    </>
  );
}