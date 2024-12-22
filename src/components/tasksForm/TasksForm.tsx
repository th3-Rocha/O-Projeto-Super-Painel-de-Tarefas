"use client";
import React, { useEffect } from "react";
import Task from "./Task";

export default function TasksForm() {
  const tasks = [
    { id: "1", name: "Estudar React", checked: false, priority: 1 },
    { id: "2", name: "Revisar Tailwind CSS", checked: true, priority: 3 },
    { id: "3", name: "Criar Projeto", checked: false, priority: 4 },
  ];

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-foreground p-6 shadow-xl text-background">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold ml-6 ">Tarefas</h1>
        <span className="cursor-pointer mr-6">Prioridade</span>
      </div>
      <div className="flex flex-col gap-4 mb-4">
        {tasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </div>
      <div>
        <button className="px-4 py-2 bg-header text-foreground font-semibold rounded-full hover:bg-blue-600">
          {" "}
          Nova Tarefa{" "}
        </button>
      </div>
    </div>
  );
}
