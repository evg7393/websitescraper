//variable scrape script
//method to clean up white space
//call back function will send back items in an array
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("http://www.aldiadallas.com/", function(err, res, body){

    var $ = cheerio.load(body);
    var articles =[];

    $(".aldia_detail").each(function(i, element){
        var head =$(this).children(".story-title").text().trim();
        var sum = $(this).children(".aldia_bucket_tease").text().trim();
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