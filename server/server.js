const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const db = require("./app/models");
const PORT = process.env.PORT || 3001;
const app = express();

let corsOptions = {origin:"locahost:3001"};

db.sequelize.sync({force:false}).then(() => console.log("Re-sync complete!"));

app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require("./app/routes/list.routes")(app);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));