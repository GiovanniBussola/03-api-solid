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

### ⬆️Importações do TS
Basta ir no **tsconfig.json** e descomentar o escrever o seguinte código:
```json
 {
 ...
 "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    }, 
 } 
```
Isso faz ser possivel fazer imports com *@/env* ao invés de *'../../../../env'*

### ORM (Object Relational Mapper)
É mapear as tabelas do banco de dados dentro do código, significa que você pode traduzir cada tabela do banco em uma classe por exemplo:

```typescript
class User {
  name: string
  email: string
}
```

#### Nesse projeto usaremos o [Prisma.io](https://www.prisma.io/). Mas o que ele faz de diferente?
Ele tem migrations automatizadas e suporta vários bancos de dados.

**Getting started**:
```bash
npm i prisma -D
npx prisma init
```
- O prisma é instalado como dependência de desenvolvimento porque é a parte de cli dele.
- É importante ter a extensão do Prisma instalada no seu vscode.
- É importante editar as configurações de usuário para formatar o código do Prisma ao salvar.
  - ```json
    {
      "[prisma]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "Prisma.prisma"
      }
    }
    ```

As tabelas são chamadas de **models**, aqui está um exemplo:
```c
model User {
  id String @id @default(uuid())
  name String
  email String @unique

  @@map("users")
}
```
- **@** são configurações para a **coluna**
- **@@** são configurações para a **tabela**

#### Para gerar as migrations:
```bash
npx prisma generate
```

#### Para instalar o client para acessar o banco:
*Esse sim é o de produção*.
```bash
npm i @prisma/client
```