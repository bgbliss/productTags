var xpath = require('xpath')
  , dom = require('xmldom').DOMParser
 
  var xml = "<book><title>Harry Potter</title></book>";
  var doc = new dom().parseFromString(xml);
  var title = xpath.select("string(//title)", doc);
   
  console.log(title);