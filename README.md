# O-Projeto-Super-Painel-de-Tarefas
Um painel de tarefas que tem tarefas por prioridade (Urgente ⚡, Alta 🔴, Média 🟡 e Baixa 🟢).

## Instruções de Configuração

Para configurar o projeto, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/th3-Rocha/opspaineltarefas.git
   
2. **Instale as dependências:**
    
    Navegue até a pasta do projeto e instale as dependências utilizando npm.
    
    Usando npm:
        
    ```bash
    npm install
3. **Configure o mockAPI:**

    Crie uma coleção de users com os seguintes campos:
        
        id: identificador único do usuário (string).
    
        sub: campo do tipo string, identificador do Google OAuth.
    
    Crie uma coleção de tasks com os seguintes campos:
        
        name: nome da tarefa (string).
        
        prior: prioridade da tarefa de 1 a 4 (string).
        
        checked: status da tarefa (booleano, indicando se está marcada como concluída ou não).
        
        id: identificador único da tarefa (string).
        
        userId: o id do usuário ao qual a tarefa pertence (string).



4. **Variáveis de Ambiente:**

    O projeto tem variáveis de ambiente, do google OAuth e do mockAPI, crie um arquivo .env na raiz do projeto e adicione as variáveis necessárias:

    ```bash
    # Google OAuth2 Client ID
    GOOGLE_CLIENT_ID = ex:....................apps.googleusercontent.com
    
    # Mock API projectSecret 
    NEXT_PUBLIC_MOCK_API_SECRET = ex:...........................mockapi.io/supertodo
    
5. **Execute o Projeto**

    Inicie o Front-End: No diretório do src, execute:
    
    
        
        npm run dev
        
        
6. **Bonus Implementados**

    1. Login e Autenticação: Implementei autenticação com OAuth2 usando Google.

    2. API Externa: Integrei com uma API externa, o mockapi.io.
    
7. **Links Relevantes**
    1. Projeto no mockAPI: https://mockapi.io/clone/67686047cbf3d7cefd37cb22
    

        