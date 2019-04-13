module.exports = function(router) {
    router.get("/", function(req, res){
        res.render("home");
    });
    //route shows the handlebars page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });
}