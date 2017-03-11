document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
	e.preventDefault();
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	var bookmark = {
		name:siteName,
		url:siteUrl
	};

	if(!validateForm(siteName,siteUrl)){
		return false;
	}

	/*
		localStorage.setItem('test','Hellow World!');
		console.log(localStorage.getItem('test'));
		localStorage.removeItem('test');
		console.log(localStorage.getItem('test'));
	*/
	if( localStorage.getItem('bookmarks') === null){
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
		console.log(bookmarks);
	}else{
	    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}	
	document.getElementById("myForm").reset();
fetchBookmarks()
}

function fetchBookmarks(){
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		var bookmarksResults = document.getElementById('bookmarksResults');
		bookmarksResults.innerHTML = '';
		for(var i = 0;i < bookmarks.length; i++){
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;
			bookmarksResults.innerHTML += '<div class="well">'+
										  '<h3>'+name+
										  '<a class="btn btn-default" href="'+url+'" target="_blank">Visit</a>'+
										  '<a class="btn btn-danger" href="#" onClick="deleteBookmark(\''+url+'\')">Delete</a>'+
										  '</h3>'+
										  '</div>';
											
		}
	}

function deleteBookmark(url){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(var i = 0; i<bookmarks.length;i++){
		if(bookmarks[i].url == url){
			bookmarks.splice(i,1);
		}
	  }	
	  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	  fetchBookmarks();
	}
	function validateForm (siteName,siteUrl){
			if(!siteName || !siteUrl){
				alert("Insert empty field!");
				return false;
			}

			var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			var regex = new RegExp(expression);

			if(!siteUrl.match(regex) ){
				alert("Please,insert a URl!");
				return false;
			}
			return true;
	}