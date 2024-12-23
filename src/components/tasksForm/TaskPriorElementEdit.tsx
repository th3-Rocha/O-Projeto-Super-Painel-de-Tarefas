import React, { useState } from "react";

interface TaskPriorElementEditProps {
  oldPrior:number;
  onPriorChange: (newPriority: number) => void;
}

export default function TaskPriorElementEdit({ onPriorChange,oldPrior }: TaskPriorElementEditProps) {
  const [Prior, setPrior] = useState<number>(oldPrior);
  const priorSetFun = (num: number) => {
    setPrior(num);
    onPriorChange(num);
  };
  const priorityColors = [
    "bg-task_prior_color_na", // Cinza
    "bg-task_prior_color_low", // Baixa
    "bg-task_prior_color_med", // Média
    "bg-task_prior_color_high", // Alta
    "bg-task_prior_color_high", // Alta (Bolt)
  ];
  const priorityColorsBolt = [
    "fill-task_prior_color_na", // Cinza
    "fill-task_prior_color_med", // Ligado
  ];
  return (
    <div className="flex gap-2 items-center ">
      <div
        key={1}
        onClick={() => priorSetFun(1)}
        className={`w-6 h-3 rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-3xl shadow-md hover:cursor-pointer hover:outline-background hover:outline-2 hover:outline-dotted ${
          Prior >= 1 ? priorityColors[Prior] : priorityColors[0]
        }`}
      />
      <div
        key={2}
        onClick={() => priorSetFun(2)}
        className={`w-6 h-3 rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-3xl shadow-md hover:cursor-pointer hover:outline-background hover:outline-2 hover:outline-dotted ${
          Prior >= 2 ? priorityColors[Prior] : priorityColors[0]
        }`}
      />
      <div
        key={3}
        onClick={() => priorSetFun(3)}
        className={`w-6 h-3 rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-3xl shadow-md hover:cursor-pointer hover:outline-background hover:outline-2 hover:outline-dotted  ${
          Prior >= 3 ? priorityColors[Prior] : priorityColors[0]
        }`}
      />
      <svg
        onClick={() => priorSetFun(4)}
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-md fa-w-16 hover:cursor-pointer hover:outline-background hover:outline-2 hover:outline-dotted ${
          Prior >= 4 ? priorityColorsBolt[1] : priorityColorsBolt[0]
        }`}
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path d="m280-80 160-300-320-40 480-460h80L520-580l320 40L360-80h-80Zm222-247 161-154-269-34 63-117-160 154 268 33-63 118Zm-22-153Z" />
      </svg>
    </div>
  );
}
