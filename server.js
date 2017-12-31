const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

//app.use takes a function
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} :${req.method}:${req.url} `;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server log");
    }
  });

  //Everything from HTTPRequest, HttpResponse from all devices are accessible
  // next exists so  you can tell middleware function , when you are done
  next();
});

// app.use((req, res, next) => {
//   res.render("maintainence.hbs");
// });
app.use(express.static(__dirname + "/public"));
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});
//what ever ismentioned in the helper, handlerbar will look for it in the
// helper before going to the appropriate objects

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomePage: "Testing ExpressJS Templates"
  });
});

app.get("/about", (req, res) => {
  //res.send("<h1>Hello Express !!!:</h1>");
  //res.send("<h1>Hello Express about!!!:</h1>");
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/portfolio", (req, res) => {
  //res.send("<h1>Hello Express !!!:</h1>");
  //res.send("<h1>Hello Express about!!!:</h1>");
  res.render("portfolio.hbs", {
    pageTitle: "Portfolio Page"
  });
});

app.get("/bad", (req, res) => {
  //res.send("<h1>Hello Express !!!:</h1>");
  res.send({
    error: "Error Handling request"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});

/*
to watch hbs extensions
nodemon server.js -e js,hbs


nandral (master) node-web-server $ ssh-keygen -t rsa -b 4096 -C 'nagesh.a@gmail.com'
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/nandral/.ssh/id_rsa): id_rsa_nagesh
id_rsa_nagesh already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in id_rsa_nagesh.
Your public key has been saved in id_rsa_nagesh.pub.
The key fingerprint is:
SHA256:RXpdbi7zegx2fXWyVLjRJP75XSDm+IajG1zL6oq3zUo nagesh.a@gmail.com
The key's randomart image is:
+---[RSA 4096]----+
|          .   o+.|
|         o . +o.o|
|        . o + =+ |
|         o + ++o+|
|        S o +..==|
|       . o +o+o *|
|      E o =.o+. +|
|     o.o + o .o  |
|    ..+=B.  ..   |
+----[SHA256]-----+
nandral (master) node-web-server $
*/
