# <b>Sistema de locação de filmes online </b>
### [Breno Gomes Silva ](https://git.gft.com/bogv) - [Linkedin](https://www.linkedin.com/in/gomesbrnn/)
### [Jonny Gabriel Teles](https://git.gft.com/jlts) - [Linkedin](https://www.linkedin.com/in/jonnyteles/)
-----------

# <b>Frontend - Informações básicas</b>

### Comando para instalar as dependências: <b>npm i</b>

### Comando para rodar o front: <b>ng s --watch</b>
### O front irá rodar na porta 4200 - <b>http://localhost:4200</b>
---------------


# <b>API - Informações básicas</b>

### Criar e popular banco de dados: <b>yarn prisma migrate dev</b>
### O nome do banco de dados criado será: <b>loca_tudo</b>
### Rodar API: <b>yarn dev</b>
### A API irá rodar na porta 3000 - <b>http://localhost:3000/</b>
---------------

## <b>Usuários</b>
### Admin:
    email: admin@gft.com    
    senha: gft1234
    role: Administrador

    Administrador tem acesso a todos os dados de usuários e permissões para cadastrar, editar e excluir filmes.

### User:
    email: user@gft.com 
    senha: gft1234
    role: Usuário

    Usuário tem acesso a todos os gets de filmes, suas próprias informações pessoais e suas locações.

obs: senha para todos os usuários populados automaticamente é gft1234

# <b>Dependências usadas:</b>
* Prisma;
* Bcrypt;
* Cors;
* CPF-CPNJ-Validator;
* Dotenv;
* Email-Validator;
* Express;
* Express-async-errors;
* Jsonwebtoken;
* Morgan;
* Multer;
* Nodemailer;
* Swagger-ui-express;
* Typescript.

# <b>Banco De Dados MySQL:</b>
![database.png](/img/database.png)

# <b>Estrutura do projeto:</b>
![estrutura.png](/img/estrutura.png)

## <b>Cadastro de usuários</b>

Para poder acessar a funcionalidade de aluguel de filmes é necessário ter um cadastro e fazer login no sistema. Para realizar um cadastro é necessário as seguintes informações:

* Nome completo;
* Email;
* Senha;
* CPF;

OBS: Os campos de Email e CPF precisam ser válidos, caso contrário ira aparecer uma mensagem de erro dizendo que o campo é inválido. 

Para criar CPFs válidos utilizei um Gerador de [CPF online](https://www.4devs.com.br/gerador_de_cpf).

Para criar Emails válidos que recebessem mensagem utilizei o site de emails descartáveis [Tua mãe, aquela ursa](https://tuamaeaquelaursa.com/).

Após feito o cadastro, basta utilizar o Login com o email e senha cadastrados para entrar no sistema e receber o token JWT.

---------------------
## <b>Token JWT</b>

Quando um usuário cadastrado fizer login no sistema ele vai receber um token JWT para acessar alguns endpoints da API. Nesse token fica salvo as informações do usuário que fez o login. Então com o token ele podera ver apenas as suas informações pessoais e de mais ninguém.

O token gerado quando um administrador faz login garante acesso a todos os endpoints da API.

Endpoints de cadastro de usuário, get de filmes e login não é necessário um token.

---------------
## <b>Upload de imagens</b>

Para fazer o uploads dos posters dos filmes foi utilizado o Multer - Quando um administrador faz um post de filmes é possível enviar arquivos png e jpeg que será salvo na pasta 'uploads'. 

Quando é feito um patch para editar o filme é possivel trocar a imagem salva ou não. Caso o administrador não troque a imagem e altere apenas os outros campos, a imagem continuara a mesma. Caso ele deseje alterar a imagem, é so fazer um novo upload e a nova imagem substituirá a antiga.

Quando é feito um delete de algum filme, a imagem relacionada a aquele filme salva na pasta 'uploads' também será deletada.

No banco de dados na tabela de filmes, o campo imagem sera preenchido com o nome da imagem salva. Para acessar a imagem salva o link é: http://localhost:3000/poster/nomedaimagemaqui. 

### <b>Exemplo:</b>
 ![posterex.png](/img/posterex.png)

---------------

## <b>Emails automáticos</b>

Com o Nodemailer é possível criar emails para serem enviados automáticamente para os usuários. Esses emails serão enviados quando:

* Uma nova conta for cadastrada: 

![novousuario.png](/img/novousuario.png)

---

* For feito um novo login:

![novologin.png](/img/novologin.png)

OBS: Nota-se que é mostrado também a plataforma de onde foi feito esse login e o nome do usuário do PC. Para isso foi utilizado o OS. Um módulo que fornece métodos e propriedades de utilidade relacionadas ao sistema operacional. Pode ser acessado usando:node:os

---

* Usuário alugar um filme:

![filmealugado](/img/filmealugado.png)

OBS: Nesse email também traz as informações do filme alugado.

---

* Usuário esqueceu sua senha:

![novasenha.png](/img/novasenha.png)

OBS: Caso um usuário esquecer sua senha ele podera acessar essa funcionalidade. Basta digitar o endereço de email da conta e o CPF vinculada a essa conta que uma nova senha é gerada e enviada no email do usuário. Com essa senha basta ele fazer login no sistema e se quiser poderá altera-la. 
Essa nova senha gerada e enviada no email é automaticamente criptografada no banco de dados também.

---

# <b>[Swagger do projeto](http://localhost:3000/api-swagger/)</b>

# <b>[Requisições no Postman](/backend/Loca%20Tudo.postman_collection.json)</b>



