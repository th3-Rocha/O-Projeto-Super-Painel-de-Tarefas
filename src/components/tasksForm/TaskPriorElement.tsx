interface TaskPriorElementProps {
  priority?: number; // 1 - 4
}

export default function TaskPriorElement({
  priority = 0,
}: TaskPriorElementProps) {
  const priorityColors = [
    "bg-task_prior_color_na", // Cinza
    "bg-task_prior_color_low", // Baixa
    "bg-task_prior_color_med", // Média
    "bg-task_prior_color_high", // Alta
  ];

  return (
    <div className="flex gap-2 ">
      {priority === 4 ? (
        <div className="flex gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`drop-shadow-md fill-task_prior_color_med fa-w-16`}
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="m280-80 160-300-320-40 480-460h80L520-580l320 40L360-80h-80Zm222-247 161-154-269-34 63-117-160 154 268 33-63 118Zm-22-153Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`drop-shadow-md fill-task_prior_color_med fa-w-16`}
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="m280-80 160-300-320-40 480-460h80L520-580l320 40L360-80h-80Zm222-247 161-154-269-34 63-117-160 154 268 33-63 118Zm-22-153Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`drop-shadow-md fill-task_prior_color_med fa-w-16`}
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="m280-80 160-300-320-40 480-460h80L520-580l320 40L360-80h-80Zm222-247 161-154-269-34 63-117-160 154 268 33-63 118Zm-22-153Z" />
          </svg>
        </div>
      ) : (
        Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-3 rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-3xl shadow-md ${
              i < priority ? priorityColors[priority] : priorityColors[0]
            }`}
          />
        ))
      )}
    </div>
  );
}
