const express = require('express')
const app = express()
const port = 3000

app.use(express.static("./static"))

//Gestion des templates dans le repertoire vue et utilisation d'ejs
app.set('views', './template');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/testAPI', (req, res) => {
    res.status(200).json({ user: "julien", retour: "page OK" })
})

app.listen(process.env.PORT | port, () => {
    console.log(`Example app listening on port ${port}`)
})