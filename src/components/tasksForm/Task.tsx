import { useState } from "react";

interface TaskProps {
  id: string;
  name: string;
  checked?: boolean;
  priority?: number; // 1 - 4
}

export default function Task({
  id,
  name,
  checked = false,
  priority = 1,
}: TaskProps) {
  const priorityColors = [
    "bg-green-100 text-green-700", // Priority 1
    "bg-blue-100 text-blue-700", // Priority 2
    "bg-yellow-100 text-yellow-700", // Priority 3
    "bg-red-100 text-red-700", // Priority 4
  ];

  return (
    <div
      className={`flex items-start justify-between p-4 rounded-lg shadow-md ${
        checked ? "bg-task_background_checked" : "bg-task_background text-background"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checked}
            className={`w-5 h-5 appearance-none rounded-full border border-background cursor-pointer transition-colors checked:bg-header checked:border-header checked:bg-check hover:border-header/50 focus:outline-none focus:ring-2 focus:ring-header/20`}
            onChange={() => {}}
          />
          

          <span className={`text-lg font-bold ${
            checked ? "line-through" : ""
          }`}>{name}</span> 
        </div>
        <div
          className={`mt-1 px-2 py-1 w-fit text-sm font-semibold rounded ${
            priorityColors[priority - 1]
          }`}
        >
          {`Prioridade ${priority}`}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`flex items-center justify-center w-8 h-8 text-xl font-bold text-red-500 bg-red-100 rounded-full hover:bg-red-200 ${
            checked ? "hidden" : ""
          }`}
          onClick={() => console.log(`Removendo tarefa ${id}`)}
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
