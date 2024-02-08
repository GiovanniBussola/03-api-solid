# App

GymPass style app

## RFs (Requisitos funcionais) - O que o usuário pode fazer

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio) - Determina as condições para os RFs (Vulgo ifs que tem no código)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se nào estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## RNFs (Requisitos não funcionais) - São os requisitos técnicos (Banco de dados, estratégias etc)
- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistindo em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (Json Web Token);


# Anotações:
### 📦.npmrc
Serve para por configurações do NPM, no caso com o código **save-exact=true** faz com que as versões que forem instaladas sejam as exatas (Ai sempre que rodar um npm i vai vir a versão exata do package.json)
* Sempre é importante atualizar as dependências.
* Existe um bot chamado renovate que automatiza essas atualizações e roda os testes para ver se não quebrou, caso os testes passar ele cria uma PR no Git falando que pode atualizar a versão da dependência, se o teste falhar ele fala qual teste falhou para fazer os ajustes necessários.
