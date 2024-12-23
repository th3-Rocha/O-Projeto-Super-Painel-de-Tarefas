import React from "react";

interface TaskModalProps {
  isOpen: boolean;
  modalText: string;
  onClose: () => void;
}

export default function TaskModal({ isOpen, onClose, modalText }: TaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex justify-center flex-col w-72 rounded-xl bg-foreground p-6 shadow-xl text-background">
        <h1 className="text-lg font text-center">{modalText}</h1>
        <button
          onClick={onClose}
          className="px-4 py-2 mt-4 bg-header text-foreground font-semibold rounded-full hover:bg-background"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
