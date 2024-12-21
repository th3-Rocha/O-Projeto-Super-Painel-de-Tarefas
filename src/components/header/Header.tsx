import React from "react";

const Header: React.FC = () => {
  return (
    <header className="min-w-full   ">
      <div className="min-w-full bg-header h-12 rounded-b-lg flex items-center justify-between p-4">
        <h1>Super tarefas</h1>
        <h1>Murilo Rocha</h1>
      </div>
    </header>
  );
};

export default Header;
