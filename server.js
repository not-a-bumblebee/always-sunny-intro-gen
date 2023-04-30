const express = require('express');
const path = require('path')


const PORT = process.env.PORT|| 3000;
let app = express();

console.log("Server Start");
console.log("port:",PORT);

app.use((req, res, next) => {

  //To enable cross origin isolation.
  res.append("Cross-Origin-Embedder-Policy", "require-corp");
  res.append("Cross-Origin-Opener-Policy", "same-origin");
  

  next();
});

app.use(express.static(path.resolve()+ "/dist"))

app.get('/', (req, res) => {
  console.log(path.resolve());
  res.sendFile(path.resolve()+ '/dist/index.html');
  
})

    
app.listen(PORT);