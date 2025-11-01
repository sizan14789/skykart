import 'dotenv/config'
import app from "./app.js";

// listening to port
app.listen(Number(process.env.PORT), ()=>{
  console.log("Listening at "+ process.env.PORT);
})