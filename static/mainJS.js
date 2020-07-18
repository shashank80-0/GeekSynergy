 $(document).ready(() => {
        $('#searchForm').on('submit',(e) => {
          let searchText = $('#inputMovie').val();
          getMovie(searchText);
          e.preventDefault();

        });
        
      });

  function getMovie(searchText){
  	url = 'http://www.omdbapi.com?s='+searchText+'&apikey=2c88e74d';
  	fetch(url)
  	.then((resp) => resp.json())
  	.then(function(data){
  		console.log(data);
  		let movies = data.Search;
  		let output = '';
  		$.each(movies,(index,movie)=> {
  			output += ` 
  			<div class = "col-md-3">
  				<div class=" well text-center">
  					<img src = '${movie.Poster}'>
  					<h6>${movie.Title}</h6>
  					<a onclick="movieDetail('${movie.imdbID}')" class="btn btn-primary" href="/detail">Movie Details</a>
  				</div>
  			</div>
  			`;
  		});

  		$('#movies').html(output);
	})
  	
  	.catch((err) =>{
  		console.log(err);
  	})

  }

  function movieDetail(id){
  	sessionStorage.setItem('movieId',id);
  	//window.location = 'detail.html';
  	return false;
  }

  function getMovieDetail(){
  	let movieId = sessionStorage.getItem('movieId');
  	url = 'http://www.omdbapi.com?i='+movieId+'&apikey=2c88e74d';
  	fetch(url)
  		.then((resp) => resp.json())
  		.then(function(data){
  		console.log(data);
		let output =`
  		<div class='row'>
  			<div class='col-md-4'>
  				<img src = "${data.Poster}" class="thumbnail">
  			</div>

  			<div class='col-md-8'>
  				<h2>${data.Title}</h2>
  				<ul class="list-group">
  					<li class="list-group-items"><strong>Genre: </strong>${data.Genre}</li>
  					<li class="list-group-items"><strong>Release Date: </strong>${data.Released}</li>
  					<li class="list-group-items"><strong>Rated: </strong>${data.Rated}</li>
  					<li class="list-group-items"><strong>IMDB Rating: </strong>${data.imdbRating}</li>
  					<li class="list-group-items"><strong>Director(s): </strong>${data.Director}</li>
  					<li class="list-group-items"><strong>Writer(s): </strong>${data.Writer}</li>
  					<li class="list-group-items"><strong>Actors: </strong>${data.Actors}</li>
  					<li class="list-group-items"><strong>Runtime: </strong>${data.Runtime}</li>
  				</ul>
  			</div>

  		</div>

  		<div class="row">
  			<div class="well">
  				<h3>Plot</h3>
  				${data.Plot}

  				<hr>
  				<a href="http://imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
  				<a href="/home" class="btn btn-success">Go back to search</a>
  			</div>
  		</div>
  		`;

  		$('#movie').html(output);

		})
  	
  	.catch((err) =>{
  		console.log(err);
  	})

  }

