//variable scrape script
//method to clean up white space
//call back function will send back items in an array
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("http://www.thenewyorker.com", function(err, res, body){

    var $ = cheerio.load(body);
    var articles =[];

    $(".Card_hed_3aD8c").each(function(i, element){
        var head =$(this).children(".Card_hed_3aD8c").text().trim();
        var sum = $(this).children(".Card_dek_2E3rB").text().trim();
        if(head && sum){
            var headNeat = head.replaceWith(/(\r\n|\n|\r\t|s+)/gm,"").trim();
            var sumNeat = sum.replace(/(\r\n|\n|\r\t|s+)/gm,"").trim();

            var dataToAdd = {
                headline: headNeat,
                summary: sumNeat
            };

            articles.push(dataToAdd);

        }
    });
     cb(articles);
    });
};
module.exports =scrape;