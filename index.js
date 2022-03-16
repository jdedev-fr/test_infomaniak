const express = require('express')
const app = express()
const port = 3000
const sql = require('mssql')

app.use(express.static("./static"))

const sqlConfig = {
    user: 'sa',
    password: 'sa',
    database: "SIGB",
    server: 'localhost\\FELIX',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}

//Gestion des templates dans le repertoire vue et utilisation d'ejs
app.set('views', './template');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/testAPI', (req, res) => {
    res.status(200).json({ user: "julien", retour: "page OK" })
})

app.get('/testbdd', (req, res) => {
    res.send("ok")
    // make sure that any items are correctly URL encoded in the connection string
    sql.connect(sqlConfig).then(() => {
        console.log("connexion ok");
        sql.query(`select * from Auteur`).then((result) => {
            console.log(result)
        })
            .catch((err) => console.log(err))
    }).catch((err) => {
        // ... error checks
        console.error(err)
    })

})

app.listen(process.env.PORT | port, () => {
    console.log(`Example app listening on port ${port}`)
})