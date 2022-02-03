const mongoose = require('mongoose')

// conecta o BD agenda
mongoose.connect('mongodb://localhost:27017/agenda', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000  // timeout de 5 seg
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

// vai tentar conectar 1x no MongoDB
db.once('open', () => {
  console.log("Conectado no MongoDB com sucesso")
})

// Criar Schema
const pessoaSchema = new mongoose.Schema({
  nome: String,
  telefone: String,
  aniversario: Date,
  idade: Number,
  obs: String
})

// Criar Model
const Pessoa = mongoose.model("pessoa", pessoaSchema)

/*
const luiz = new Pessoa({
  nome: "Luiz S.",
  telefone: "(19) 3232-7752",
  aniversario: new Date(1980, 06, 14),
  idade: 40,
  obs: "Autor do projeto App-Beer"
})


// Inserir dados no banco
luiz.save((err) => {
  if (err) {
    console.log(err)
  }
})

Pessoa.insertMany([
  { nome: "Lucas", telefone: "9191-0000", idade: 38},
  { nome: "Fátima", telefone: "8989-0000", aniversario: new Date(1953, 01, 09) },
  { nome: "Alexandre", idade: 25, obs: "mora em Nova Odessa"}
])
*/

// Buscar um nome na collection
Pessoa.findOne({ nome: "Luiz S."}, (err, pessoa) => {
  if (err) {
    console.log(err)
  }
  else {
    console.log(pessoa)
  }
})

// Buscar todos os dados da collection
async function getPessoas() {
  const pessoas = await Pessoa.find({}).exec()
  console.log(pessoas)
}

getPessoas()

// Excluir uma pessoa

async function getPessoa(nome) {
  const pessoa = await Pessoa.find({ nome: nome }).exec()
  if (pessoa.length === 0) {
    console.log(`${nome} não existe`)
  }
  else {
    console.log(pessoa)
  }
}

getPessoa("Alexandre")

Pessoa.deleteOne({ nome: "Alexandre" }).exec()

// Atualização de dados

Pessoa.updateOne({ nome: "Luiz S." }, { idade: 48 }).exec()

// Busca utilizando o where

async function getPessoaNomeIdade(nome, idade) {
  const pessoa = await Pessoa 
        .where('idade').gte(idade)
        .where('nome', nome)
        .exec()

  if (pessoa.length === 0) {
    console.log('Esta pessoa não existe')
  }
  else {
    console.log(pessoa)
  }
}

getPessoaNomeIdade('Luiz S.', 40)