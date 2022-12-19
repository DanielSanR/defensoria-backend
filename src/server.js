const express = require("express")
const cors = require("cors");
const helmet = require("helmet")
const morgan = require("morgan")
const env = require("dotenv/config")
const dbConfig = require("./db/db.config");
// const auth = require("./routers/auth")
const router = require("./routers/index")
const db = require("./models")
const Role = db.role;
const mongoose = require('mongoose');
const tunnel = require('tunnel-ssh');

const config = {
  host: '138.117.79.26',
  port: 22,
  username: 'daniel',
  password: 'daniel',
  dstHost: '138.117.79.26',
  dstPort: 27017,
  localHost: 'localhost',
  localPort: 5000
};

const app = express();

app.use(helmet())
app.disable('x-powered-by')
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
app.use(morgan('dev'))
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/* tunnel(config, (error, server) => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  
    const dbUrl = `mongodb://${config.localHost}:5000/defensoria`;
  
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  
    const db = mongoose.connection;
  
    db.on('error', console.error.bind(console, 'connection error:'));
  
    db.once('open', function() {
        initial();
      console.log('Connected to MongoDB through SSH tunnel');
    });
  })

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "admin"
            }).save(err =>{
                if(err){
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            })

            new Role({
                name: "director"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'director' to roles collection");
            });

            new Role({
                name: "empleado"
            }).save(err => {
                if (err) {
                console.log("error", err);
                }
                console.log("added 'empleado' to roles collection");
            });
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
        }
    });
}
 */
// set port, listen for requests
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.status(200).json({data: "Defensoría del niño"})
})

//Routes
app.use('/api', router)

app.get('*', function (req, res){
    res.status(404).json({msg: 'Error 404 - Recurso no encontrado'});
})

