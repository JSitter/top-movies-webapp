//We must make our routes available to the outside
// by using module.exports
module.exports = function(app){
    //Import modules
    const fetch = require( 'node-fetch');
    let api_address = "https://itunes.apple.com/us/rss/topmovies/limit=25/json";

    //Helper functions here
    function getMoviesFromiTunes(){
        return new Promise(function(resolve, reject){

            fetch(api_address).then(function(response){

                console.log("itunes returnd: ")
                console.log(response)
                resolve(response);
            }).catch(function(err){reject(err)});
        })

    };

    //Main page
    app.get('/', function(request, response){

        fetch(api_address).then((response)=>response.text())
        .then((json)=> console.log(json))

        response.render('all-movies')

    });

    //Get movie info
    app.get('/info/:param', function(request, response){

        response.json({
                info: "Hello World", 
                movie: request.params.param
            });
    });
};