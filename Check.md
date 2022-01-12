# Parte 1

- [x] Ambiente \* [x] NodeJS
  - [x] Navegador
  - [x] VS Code
    - [x] Tema \* [x] Fontes
    - [x] Plugins
- [x] Apresentar HTML e CSS
  - [x] index.html
  - [x] profile.html
  - [x] job.html
  - [x] styles
  - [x] scripts
- [x] O que é Node
  - [x] página oficial
  - [x] node -v
- [x] Iniciar o projeto
  - [x] npm
- [x] package.json
- [x] Instalar Express
  - [x] Dependencies
  - [x] node_modules
- [x] Criar servidor
  - [x] require()
  - [x] Iniciar o servidor (listen)
  - [x] Primeira rota
    - [x] `.get("/", () ⇒ console.log('cheguei na rota'))`
    - [x] request e response
- [x] Instalar o nodemon
  - [x] dev dependencies
  - [x] configurar
  - [x] npm run dev
- [x] mostrando index.html
- [x] views directory
- [x] public directory
- [x] create routes.js
  - [x] module.exports
- [x] fix
  - [x] file paths
  - [x] href
- [x] template engine
- [x] Benefício 1: reutilizar componentes (header)
  - [x] instalar ejs
  - [x] transformar .html em .ejs
  - [x] `<%- include('parts/page-header', { title: 'Meu Perfil'}) %>`
  - [x] install ejs plugin
- [x] Benefício 2: Programar no HTML
  - [x] variáveis
  - [x] criar o objeto do perfil de usuário
  - [x] passar o objeto do perfil de usuário para o profile.ejs

# Parte 2

## Salvar Job

    * [x] Form job
    - [x] method post
    - [x] action="/job"
    * [x] rota /job POST
    - [x] req.body
    - [x] urlencoded
    * [x] Criar array de jobs
    - [x] enviar para o index.ejs
    - [x] .forEach
    - [x] ajustes dos dados no index
    * [x] Configurar jobs na criação de um novo Job
    - [x] job id: pegar o id do ultimo item do array
    - [x] created_at: Date.now()
      - [x] para o cálculo de dias restantes
    - [x] total-hours
    - [x] daily-hours
    - [x] name
    * [x] Atualizar os jobs no index, antes de apresentar

## Remaining calculation

- [x] Devemos calcular sempre que apresentar o projeto,
      pois poderemos mudar os dados do projeto a qualquer momento
- [x] remainingDays = total hours do job / daily hours do job
- [x] adicionar os dias à data de criação, para criar uma data futura
- [x] subtrair da data futura, o número de dias restantes baseado na data de hoje
- [x] pegar a diferença de milissegundos para dias
- [x] update status (done | progress)
- [x] budget: profile value hour \* total job hours
  - [x] deverá ser atualizado sempre que apresentar o projeto,
        pois poderá variar dependendo dos dados do projeto ou dos dados do perfil
  * [x] atualizar o index.ejs
  - [x] Prazo encerrado ao invés de 0 dias para a entrega
  * [x] adicionar uma entrada no jobs[] para o prazo encerrado

## Refatorar Jobs

    - [x] Criar um Object Literal Jobs
    - [x] Adicionar data em Jobs
    - [x] Adicionar index() e create()

## Object Profile

    * [x] data

- [x] update()
  - [x] Calculo de custo de hora
    - [x] weeksPerYear
    - [x] weeksPerMonth = weeks per year - vacation
    - [x] total hours per week
    - [x] monthly total hours
    - [x] value hour = monthly budget / monthly total hours
  - [x] redirect to /profile

## Editar job

- [x] criar função show
  - [x] rota job/:id GET
  - [x] req.params
  - [x] .find
  - [x] Job not found
  - [x] service: calculate job budget
  - [x] refactor index to use service
  - [x] update job-edit.ejs
- [x] criar função de update
  - [x] rota /job/:id POST
  - [x] .find
  - [x] job not found
  - [x] updatedJob
  - [x] Job.data= Job.data.map()
  - [x] redirect

## Delete job

- [x] route /job/delete/:id POST
- [x] Job.controller.delete()
- [x] req.params.id
- [x] Job.data.filter()
- [x] redirect to /
  - [x] Delete all Jobs and find error
  * [x] lastId of Job.controller.create()
  * [x] use optional chaining operator ?.
  * [x] use Logical OR operator