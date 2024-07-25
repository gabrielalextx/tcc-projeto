# tcc-projeto
**Repositório do Trabalho de Conclusão de Curso do curso de Sistemas da Informação da Universidade do Estado do Amazonas.** <br/>
**Aluno: Gabriel Alexander Farias de Lima Teixeira**

Para poder executar o projeto, é necessário: <br/>
1 - Ter o VS Code instalado; <br/>
2 - Ter o Node-RED instalado e executá-lo no _prompt_ de comando (comando _node-red_); <br/>
3 - Ter o Android SDK Platform instalado (em caso de _debug_ diretamente em um _smartphone_); <br/>
4 - Ter o banco de dados MySQL instalado e configurado na máquina, executando em plano de fundo (Gerenciador de Tarefas -> Serviços -> MySQL80); <br/>
5 - Ter o Node.js instalado. <br/>

Ao baixar o projeto do GitHub (Seja por .zip, ou por meio do GitHub Desktop), é necessário instalar as dependências mencionadas no _package.json_ dentro da pasta TccProjeto. O sistema utiliza Node.js, então é necessário instalá-lo no sistema e rodar o comando _npm install_ no _prompt_ dentro da pasta TccProjeto. <br/>

Para executar o App em um celular/_smartphone_, é necessário instalar Android SDK Platform, para ter acesso ao Android Debug Bridge. O _smartphone_ precisa ter as opções de Desenvolvedor ativas e com a opção "Permitir depuração USB" ativa. Ao rodar o comando _adb devices_ com o aparelho conectado via USB, o sistema procurará dispositivos compatíveis e avisará caso esteja disponível para fazer a conexão. Em um _prompt_, o comando _node server.js_ deve ser executado para funcionamento do servidor do Node.js e permitir conexão com o banco de dados. Com o comando _npx react-native run-android_, o sistema irá instalar o aplicativo no aparelho conectado e permitir a depuração do App. o aplicativo instalado funcionará normalmente após a desconexão via USB com a máquina, desde que o servidor Node.js esteja rodando. O Node-RED possui um fluxo específico de funcionamento, e deverá estar rodando de fundo em um _prompt_. O banco de dados também possui um _Schema_ e uma tabela próprias e deverão estar rodando para o acesso aos dados do projeto.
