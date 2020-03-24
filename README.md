# SPA Em AngularJs Ponto eletronico
 Este projeto SPA em AngularJs, **App Ponto eletronico** foi criado para consumir a apirest ponto eletronico, está api pode ser encontrada a seguinte URL:&nbsp;&nbsp;&nbsp;&nbsp;https://apirest-pontoeletronico.herokuapp.com/swagger-ui.html  
> Para **Executar o projeto** para executar o projeto, abra o cd na pasta raiz do projeto e execute o comando 'npm install', ao terminar de baixar os modulos, execute o 'comando npm start' e o servidor estará rodando localhost.  
> **Swagger** É um aplicativo que converte as anotações do próprio Swagger contidas no código fonte das APIs REST em uma documentação interativa.  
## Tela de login 
### Usuarios genericos pra gestão  
- chico&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;senha: 123 
- moro&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;senha: 123
- antonio&nbsp;senha: 123
> Ao logar com algum desses usuarios você será direcionado para tela de gestão, onde é possivel criar um usuario "funcinario", atualizar as informações de um usuario ao clicar no botão "editar" e poderá a observar a lista de usuarios cadastrados.  
### Funcionarios
Funcionarios que iram o usar está pagina para bater o ponto devem ser cadastrados previamente por um gestor, é possivel na tela de gestão criar um novo usuario ao clicar no botão azul "novo usuario" localizado no canto superio direito, com o usuario criado o login deve ser feito na pagina home com o nome de usuario e senha.
> A **Senha** do usuario sempre será 123.

## Tela de Gestão
Tela onde pode ser feita a gestão de usuarios, criação de um novo usuario, atualização de suas informações e listagem dos usuarios cadastrados, na parte suaperor da tela se encontra um filtro pra busca de usuarios especificos, esté filtro irá procurar pelo nome, cpf, email, data de cadastro ou ultima atualização do usuario.
> Exemplo de **Filtro** de usuario:  "mayza" fará busca por está informação nos dados dos usuarios cadastros.  
> **OBS:** O filtro aceita todos os tipos de caracteres.

## Tela do ponto
Tela onde o usuario pode bater o ponto, ver seu tempo de jornada atual, e lista de batidas de ponto.
na lista de batidas de ponto consta o id da batida, nome do usuario, Tipo da batida (entrada ou saida) e data e horario em que foi batido o ponto.
> **OBS:** Ao bater o ponto recarregue a pagina pra visualizar a lista de ponto e sua jornada.