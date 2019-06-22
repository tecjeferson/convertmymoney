const express = require('express')
const app = express()
const path = require('path')
const convert = require('./lib/convert')

app.set('view engine', 'ejs')
//Path para criar o caminho correto em diferentes sistemas operacionais
app.set('views', path.join(__dirname, 'views'))
//Habilita o acesso a pasta public com o 'path' para fazer o caminho correto em diferentes OS.
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/cotacao', (req, res) => {
    //extraindo os valores do formulario atraves dos inputs names e usando o req.query
    const {
        cotacao,
        quantidade
    } = req.query
    if (cotacao && quantidade) {

        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    } else {
        res.render('cotacao', {
            error: 'Valores invalidos'
        })
    }
})

app.listen(3000, err => {
    if (err) {
        console.log("The server could not starts")
    } else {
        console.log('Convert My Money is online')
    }
})