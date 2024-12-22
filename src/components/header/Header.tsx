"use client";
import React, { useState } from "react";

interface HeaderProps {
  name?: string;
  picUrl?: string;
  onProfileClick?: () => void; 
}

export default function Header({ name, picUrl, onProfileClick }: HeaderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="min-w-full">
      <div className="bg-header h-12 rounded-b-lg flex items-center justify-between p-4 font-bold text-lg text-task_background">
        <h1>Painel de Tarefas</h1>
        <div className="flex items-center gap-2">
          <h1 className={isHovered ? "text-red-500" : ""}>
            {isHovered ? "Log-Out" : name}
          </h1>
          {picUrl && (
            <img
              src={picUrl}
              onError={(e) => (e.currentTarget.src = "/googleG.svg")}
              className="w-8 h-8 rounded-full shadow-md cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={onProfileClick}
            />
          )}
        </div>
      </div>
    </header>
  );
}
