import { useState } from "react";
import TaskPriorElement from "./TaskPriorElement";
interface TaskProps {
  id: string;
  name: string;
  userId: string;
  checked?: boolean;
  prior?: number; // 1 - 4
  onRemove?: (id: string, userId: string) => void;
  onEdit?: (id: string, userId: string) => void;
}

export default function Task({
  id,
  name,
  userId,
  checked = false,
  prior = 1,
  onRemove,
  onEdit,
}: TaskProps) {
  if (prior > 4) {
    prior = 4;
  }
  if (prior < 1) {
    prior = 1;
  }
  return (
    <div
      className={`min-h-32 flex items-start justify-between p-4 rounded-lg shadow-md ${
        checked
          ? "bg-task_background_checked"
          : "bg-task_background text-background"
      }`}
    >


      <div className="flex flex-col gap-2 w-full">


        <div className="flex gap-2 ">
          <input
            type="checkbox"
            checked={checked}
            className={`mt-1 min-w-5 h-5 appearance-none rounded-full border border-background cursor-pointer transition-colors checked:bg-header checked:border-header checked:bg-check hover:border-header/50 focus:outline-none focus:ring-2 focus:ring-header/20`}
            onChange={() => {}}
          />
          <span
            className={` text-lg font-bold ${
              checked ? "line-through" : ""
            } overflow-hidden inline-block`}
          >
            {name}
          </span>
        </div>


        <div className="ml-7 ">
          <TaskPriorElement priority={prior}></TaskPriorElement>
        </div>



      </div>



      <div className="flex items-center gap-2">
        <button
          className={`flex items-center justify-center w-8 h-8 text-xl font-bold text-red-500 bg-red-100 rounded-full hover:bg-red-200 ${
            checked ? "hidden" : ""
          }`}
          onClick={() => onRemove?.(id, userId)}
        >
          −
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 text-xl font-bold text-gray-500 bg-gray-200 rounded-full hover:bg-gray-200"
          onClick={() => console.log(`Abrindo opções para a tarefa ${id}`)}
        >
          ⋯
        </button>
      </div>
    </div>
  );
}
