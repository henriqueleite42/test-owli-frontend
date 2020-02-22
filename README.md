# Teste Para Empresa Owli - Chat App

Aplicativo De Chat Feito Como Demonstrativo De Habilidades Para a Vaga De Desenvolvedor FullStack Para a Empresa Owli

## Sobre o Teste:

### O Que Foi Pedido:
* NodeJs No BackEnd
* Uso De Websockets
* CRUD De Usuário
* Troca De Mensagens Entre Usuários

### O Que Foi Entregue:
* NodeJs No BackEnd
* ReactJs, Redux e Sass No FrontEnd
* Uso De Socket.io Para Envio De Mensagens
* Uso De JWT Para Autenticação
* CRU De Usuário
* Troca De Mensagens Entre Usuários
* Notificação De Nova Mensagem
* Autenticação De Usuários
* Validacão De Dados
* Responsividade Mobile Mediana
* Login e Logout
* Próximos Logins Automáticos Enquanto o Token Continuar Valido.
* Popups De Alerta De Erro Ou Sucesso Para Registro ou Update de Informações Dos Usuários
* Tela De Loading
* Horario De Envio Nas Mensagens
* Uso De Versionamento De Código (Git)
* Versão Live Demo Do Projeto Hospedado No Heroku

### O Que Eu Gostaria De Adicionar Mas Não Deu Tempo:
* Envio De Imagem Como Foto De Perfil Do Usuário
* Sistema De Prêmios Para Incentivar Os Usuários a Conversarem Entre Si, Como Uma Coroa Ao Lado Do Nome Do Usuário Que Tem a Maior Media De Conversas (Mensagens Enviadas E Recebidas, Para Evitar Flood De Mensagens Apenas Para Ganhar Pontos)
* Relatorios De Um Usuário Especifico e De Todos Os Usuários, Com Gráficos. Exibindo Informações Como Quantidade De Mensagens Enviadas e Recebidas, Quantidade De Usuários Com Quem Conversa, Horario De Maior Atividade, Etc.
* Uso De ReactMemo Na Listagem De Usuários e Mensagens Enviadas.
* Notificação De "Digitando..."

## Regras De Negocio:

### Cadastro De Usuário:
* **Username:** Apenas Letras Minusculas e Maiúsculas, Numeros e Underlines. Nenhum Outro Usuário Devera Possuir o Mesmo Username. Precisa Ter Entre 3 e 20 Carácteres.
* **Email:** Precisa Ser Um E-mail Valido, Com Carácteres Antes e Depois Do @. Nenhum Outro Usuário Devera Possuir o Mesmo E-mail. Precisa Ter No Maximo 35 Carácteres
* **Phone:** Apenas Numeros. Precisa Ter Exatamente 11 Carácteres.
* **Address:** Não é Obrigatório, Precisa Ter No Maximo 40 Carácteres.
* **Password:** Precisa Ter Uma Letra Maiúscula, Uma Minuscula, Um Carácter Especial e Um Numero. Precisa Ter Mais De 6 Carácteres

### Login:
* O Usuário Precisa Existir.
* Caso Ele Já Tenha Feito Login Antes, o Token Será Validado (Expira 24h Após o Primeiro Login), e Caso Seja Aceito o Usuário Sera Logado Imediatamente, Sem Precisar Preencher Nenhuma Informação.
* Caso Seja Feito Um Login De Outro Dispositivo Ou Aba, o Primeiro Usuário Logado Sera Desconectado.

### Listagem De Usuários
* Apenas Usuários Ativos (Que Estejam Logados), Aparecerão Na Listagem.
* Quando Um Usuário Deslogar, e Outro Usuário Estiver Conversando Com Ele, Esse Outro Usuário Será Redirecionado Para a Pagina Inicial.

### Envio De Mensagens:
* Ao Enviar Uma Mensagem, Ela Será Imediatamente Enviada Ao Outro Usuário.
* Quando o Usuário De Destino Receber a Mensagem, Ele Será Notificado Por Uma Esfera Branca, Do Lado Direito Do Nome Do Usuário Que Enviou a Mensagem Para Ele.
* Quando o Destinatário Clicar Na Aba Para Conversar Com o Usuário Que Enviou a Mensagem, a Notificação Devera Desaparecer.
* Caso o Destinatário Já Esteja Conversando Com Quem Enviou a Mensagem, Ele Não Recebera Notificações Por Novas Mensagens Enviadas.
* Caso o Usuário Esteja Lendo Mensagens Antigas, a Tela Continuara Focada Onde Ele Esta, Caso Contrario a Tela Será "Rolada Para Baixo", Para Que o Usuário Consiga Ler Facilmente Novas Mensagens.

### Editar Usuário
* O Username Não Pode Ser Alterado.
* Apenas As Informações Que Sejam Diferentes Das Cadastradas Serão Enviadas Ao Servidor. Caso Nenhuma Delas Seja Diferente, Apenas Uma Mensagem De Sucesso Será Exibida.
* As Regras De Validação Para Registro Também São Validas Para Atualização De Informações.

## Explicação De Porque Certas Decisões Foram Tomadas:

### Por Que Os Usuários Ativos São Salvos Em Variáveis?
* Apesar De Não Ser o Correto a Ser Feito, Foi Necessário, Pois Como a Conexão Entre o Usuário e o Servidor, e entre o Servidor e Banco De Dados Tendem a Ter Um Desempenho Bem Abaixo Do Esperado, Preferi Guardar Essas Informações Dentro De Variáveis, Para Que a Aplicação Seja Testada Com Mais Facilidade Obviamente, Isso Foi Feito Apenas Porque Esse É Um Projeto De Exemplo e De Demonstração De Habilidade, Uma Coisa Assim Jamais Seria Feita Em Produção.

### Porque Não Foi Entregue a Opção De Deletar Um Usuário?
* Presumi Que a Criação, Edição e Listagem Já Bastavam Para Demonstrar Meu Conhecimento, Por Isso Decidi Dedicar o Tempo Que Gastaria Com Isso Em Outras Coisas Que Tenho Mais Dificuldade e Me Tomariam Mais Tempo.

### Porque Não Foi Feita a Renovação Do Token Quando o Usuário Realiza o Login Novamente?
* Apesar De Facilitar Para o Usuário, Acho Que Seria Uma Falha Na Segurança e Preferi Deixar Que o Token Expire Após 24h. Apesar Disso, Essa Funcionalidade Poderia Ser Facilmente Implementada.