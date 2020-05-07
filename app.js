//jshint esversion:6
const express = require("express");
const body = require("body-parser");

const app = express();
var items = [];
var worklist = [];
app.set('view engine', 'ejs');
app.use(body.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res) {

  var day = new Date();
  var current = day.getDay();
  var x = "";
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
x = day.toLocaleDateString("en-US", options);
res.render("list",{currentDay: x , additems:items });
});
app.post("/",function(req,res) {
  var item = req.body.newitem;
if (req.body.list === "Work") {
  worklist.push(item);
  res.redirect("/work");
}
else {
  items.push(item);
  res.redirect("/");
}
});
app.get("/work",function(req,res) {
  res.render("list",{currentDay: "Work List" , additems:worklist });

})
app.listen(3000);
