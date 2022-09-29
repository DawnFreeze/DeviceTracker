const express = require('express')
var favicon = require('serve-favicon')
var db = require('./data/dbaccess.js')
var path = require('path')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')))

app.get('/', (req, res) => {
    items = db.getRecordsPatched().then(function (results) {
        res.render('index', {tabledata: results})
    })
})

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
