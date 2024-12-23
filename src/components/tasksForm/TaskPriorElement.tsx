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
          <img
            src="/EletricBolt.svg"
            className="drop-shadow-md fill-task_prior_color_med svg-inline--fa fa-bolt fa-w-16"
          ></img>
          <img
            src="/EletricBolt.svg"
            className="drop-shadow-md fill-task_prior_color_med svg-inline--fa fa-bolt fa-w-16"
          ></img>
          <img
            src="/EletricBolt.svg"
            className="drop-shadow-md fill-task_prior_color_med svg-inline--fa fa-bolt fa-w-16"
          ></img>
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
