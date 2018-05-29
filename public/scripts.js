let api_address = "https://itunes.apple.com/us/rss/topmovies/limit=25/json"

function getMoviesFromiTunes(){
    return new Promise((resolve, reject)=>{
        fetch(api_address).then((response)=>response.text())
        .then((json)=>{

            movies = JSON.parse(json)
            movies = movies.feed.entry[0]
            resolve(movies)
        }).catch((err)=>{reject(err.message)})
    })

};

getMoviesFromiTunes().then((json)=>{
    console.log(json)
})

function getMovie(id){
    let url = '/info/'+id.toString()
    console.log(url)
    window.open(url, "_self")

}

document.getElement