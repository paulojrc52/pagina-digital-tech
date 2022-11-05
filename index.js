const express = require('express')
const path = require('path')
const fs = require('fs') 

const app = express()


// Definindo o template engine
app.set('view engine', 'ejs')



// Definindo arquivos estáticos
// app.use(express.static(path.join(__dirname, 'views')))
 
// Definindo arquivos públicos
app.use(express.static(path.join(__dirname, 'public')))

// Habilitanto servidor para receber dados via "post" (formulario)
app.use(express.urlencoded({extended: true}))




// Rotas 
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Digital Tech - Home'
    })
})

app.get('/posts', (req, res) => {
    const data = fs.readFileSync('./store/posts.json')
    const posts = JSON.parse(data)
    
    const postsHtml = posts
    
    

    res.render('posts', {
        title: 'Digital Tech - Posts',
        posts: postsHtml
    })
})

app.get('/cadastro-posts', (req, res) => {
    const { c } = req.query
    res.render('cadastro-posts', {
        title: 'Digital Tech - Cadastrar Post',
        cadastrado: c,
    })
})

app.post('/salvar-post', (req, res) => {
    const { titulo, texto } = req.body

    const data = fs.readFileSync('./store/posts.json')
    const posts = JSON.parse(data)

    posts.push({
    titulo,
    texto
    })

    const postsString = JSON.stringify(posts)
    fs.writeFileSync('./store/posts.json', postsString)

    res.redirect('/cadastro-posts?c=1')
})

app.get('/contato', (req, res) => {
    res.render('contato', {
        title: 'Digital Tech - Contato'
    })
})

app.get('/produtos', (req, res) => {
    res.render('produtos', {
        title: 'Digital Tech - Produtos'
    })
})

app.get('/quem-somos', (req, res) => {
    res.render('quem-somos', {
        title: 'Digital Tech - Quem Somos'
    })
})

app.get('/servicos', (req, res) => {
    res.render('servicos', {
        title: 'Digital Tech - Serviços'
    })
})




// 404 error (not found)
app.use((req, res) => { // Middleware
    res.send('Página não encontrada!')
})



// Executando servidor 
const porta = process.env.PORT || 8080
app.listen(porta, () => console.log(`Server is listening on port ${porta}`))