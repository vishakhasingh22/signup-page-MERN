const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const data = {
    members : [
      {
        email_address : email,
        merge_field : {
          FNAME : name
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = ""; //ur link
  const options = {
    method:"POST",
    auth : "" //name:key
  };
  const request = https.request(url, options, function(response){

    if (response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    } else{
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

  app.post("/failure", function(req,res){
    res.redirect("/");
  });
//   console.log(name);
//   console.log(email);
  // Handle the form submission here, e.g., store the name and email in a database
 // res.send("Thank you for signing up!");
});

// Server
app.listen(process.env.PORT ||3000, function () {
  console.log("Running ");
});
