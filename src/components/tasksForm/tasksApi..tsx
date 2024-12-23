export const removeTask = async (taskId: string, userID: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_API_SECRET}/users/${userID}/tasks/${taskId}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );

    if (response.ok) {
      console.log(`Tarefa ${taskId} removida com sucesso`);
      return true;
    } else {
      console.log(response);
      throw new Error(`Erro ao remover a tarefa ${taskId}`);
    }
  } catch (error) {
    console.error("Erro ao remover tarefa:", error);
    return false;
  }
};

export const CreateUserSub = async (userSubId: string) => {
  console.log("Criando usuario");
  const newUser = {
    sub: userSubId,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_API_SECRET}/users`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      }
    );

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      throw new Error("Erro ao criar usuário");
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const VerifyUserSub = async (userSubId: string) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_MOCK_API_SECRET}/users`);
  url.searchParams.append("sub", userSubId);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    let res = await response.json();
    let user;
    if (res[0] === null || res[0] === undefined || res === "Not found") {
      user = await CreateUserSub(userSubId);
    } else {
      user = res[0];
    }
    if (user === null || user === undefined) {
      console.error("Erro ao Criar Usuario:");
      return null;
    }
    return user;
  } catch (error) {}
};

export const fetchUserTasks = async (
  userSubId: string,
  isPriorSort?: boolean
) => {
  try {
    let user = await VerifyUserSub(userSubId);
    const userId = user.id;
    if (!userId) {
      throw new Error("Usuário não encontrado ou ID ausente");
    }

    const url = new URL(
      `${process.env.NEXT_PUBLIC_MOCK_API_SECRET}/users/${userId}/tasks`
    );
    if (isPriorSort) {
      url.searchParams.append("sortBy", "prior");
      url.searchParams.append('order', 'desc');
    } else {
      url.searchParams.append("sortBy", "checked");
      url.searchParams.append('order', 'desc');
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const tasks = await response.json();
      return tasks; // Retorna as tarefas do usuário
    } else if (response.status === 404) {
      console.log("Usuário nao tem Tarefas");
      return [];
    }
    {
      throw new Error("Erro ao buscar tarefas do usuário");
    }
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    throw error;
  }
};

export const CreateUserWithSub = async (userSubId: string) => {
  const newUser = {
    sub: userSubId,
  };
};
