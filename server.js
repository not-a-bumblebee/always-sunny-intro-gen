const express = require('express');

const PORT = process.env.PORT|| 3000;
let app = express();

console.log("Server Start");
console.log("port:",PORT);

app.use((req, res, next) => {

  //To enable cross origin isolation.
  res.append("Cross-Origin-Embedder-Policy", "require-corp");
  res.append("Cross-Origin-Opener-Policy", "same-origin");
  console.log("applying headers");

  next();
});

app.use(express.static(__dirname))

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/index.html');
  
})

    
app.listen(PORT);