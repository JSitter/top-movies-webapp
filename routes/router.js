//We must make our routes available to the outside
// by using module.exports
module.exports = function(app){
    //Import modules
    const fetch = require( 'node-fetch');
    const api_address = "https://itunes.apple.com/us/rss/topmovies/limit=25/json";

    let moviesRaw = {}
    let movies = {}

    //Helper functions here
    function getMoviesFromiTunes(){
        console.log("getting movies")
        return new Promise((resolve, reject)=>{
            fetch(api_address).then((response)=>response.text())
            .then((json)=>{
                moviesRaw = JSON.parse(json)
                moviesRaw = moviesRaw.feed.entry
                for( let index in moviesRaw){
                    let movie = {}
                    movie["id"] = moviesRaw[index]["id"]["attributes"]["im:id"]
                    movie["thumb-img"] = moviesRaw[index]["im:image"][0].label
                    movie["img-link"] = moviesRaw[index]["im:image"][2].label
                    movie["title"] = moviesRaw[index]["im:name"]["label"]
                    movie["release-date"] = moviesRaw[index]["im:releaseDate"].attributes.label
                    movie["price"] = moviesRaw[index]["im:price"].label
                    movie["trailer"] = moviesRaw[index]["link"][1].attributes.href
                    movie["summary"] = moviesRaw[index]["summary"].label
                    movie["itunes-link"] = moviesRaw[index]["id"].label


                    movies[movie["id"]] = movie 
                }

                resolve(movies)
            }).catch((err)=>{reject(err.message)})
        })

    };

    //Get movie info
    app.get('/info/:movie_id', function(request, response){
        movie_id = request.params.movie_id

        console.log("looking up " + movie_id)

        getMoviesFromiTunes().then((movies)=>{
            console.log("Got response from iTunes")
            console.log(movies[movie_id].title)

            let movie = movies[movie_id]
            response.render('single-movie', {movie:movie})
        })

    });

    //Main page
    app.get('/', function(request, response){

        getMoviesFromiTunes().then((movies)=>{

            response.render('all-movies', {movies: movies})
  
        })

    });
};