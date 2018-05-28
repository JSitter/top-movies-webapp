//We must make our routes available to the outside
// by using module.exports
module.exports = function(app){
    //Main page
    app.get('/', function(request, response){
        response.render('all-movies')
    });

    //Get movie info
    app.get('/info/:movie', function(request, response){
        response.json({info: "Hello World"})
    })
};