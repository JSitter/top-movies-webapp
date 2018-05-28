//We must make our routes available to the outside
// by using module.exports
module.exports = function(app){
    //Main page
    app.get('/', function(request, response){

        //Render all-movies template
        //and send to client
        response.render('all-movies')
    });

    //Get movie info
    app.get('/info/', function(request, response){

        response.json({
                info: "Hello World", 
                movie: req.queryString('movie')
            })
    })
};