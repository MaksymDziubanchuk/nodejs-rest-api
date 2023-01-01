const mongoose = require("mongoose")
const app = require('./app')

const {PORT = 24800, DB_CONNECTION} = process.env; 

require("colors")

mongoose.set('strictQuery', false);

mongoose.connect(DB_CONNECTION)
.then(() => app.listen(PORT, () => {
  console.log("Database connection successful".bold)
}))
.catch(error => {
  console.log(error.message);
  process.exit(1);
})

