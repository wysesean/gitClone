function setProfileHTML(profileObj){
	var promiseHTML = '',
		profileNode = document.querySelector('#profileContainer')
	
			promiseHTML +=		'<img src="' + profileObj.avatar_url + '" alt="profile" />'
			promiseHTML += 		(profileObj.name ? '<h1 id="name">' + profileObj.name + '</h1>' : '')
			promiseHTML +=		'<h2 id="username">' + profileObj.login + "</h2>"
			promiseHTML +=		(profileObj.bio ? '<p id="bio">' + profileObj.bio + '</p>' : '')
			promiseHTML +=		'<button id="followButton"> Follow </button>'
			promiseHTML +=		'<a href="#" onclick=\"alert(\''+profileObj.name+' has been reported to the internet police.\');\">Block or report user</a>'
			promiseHTML +=		'<hr>'
			promiseHTML +=		(profileObj.company ? '<div class="hasIcon" id="company"><i class="material-icons">perm_identity</i><a class="companyink" href="https://github.com/'+profileObj.company.slice(1)+'">'+ profileObj.company + '</a></div>':'')
			promiseHTML +=		(profileObj.location ? '<div class="hasIcon" id="location"><i class="material-icons">room</i>' + profileObj.location + '</div>' : '')
			promiseHTML +=		(profileObj.email ? '<div class="hasIcon" id="email"><i class="material-icons">mail_outline</i><a href="'+profileObj.email+'">'+profileObj.email+'</a></div>': '')
			promiseHTML +=		(profileObj.website ? '<div class="hasIcon" id="website"><i class="material-icons">web_asset</i>' + profileObj.blog + '</div>': '')

		profileNode.innerHTML = promiseHTML
}

function setRepoHTML(htmlObj){
	var repoHTML = '',
		repoNode = document.querySelector('#repoList')

		for(var i=0; i<htmlObj.length;i++){
			repoHTML += '<li class="repoBox">'
			repoHTML += 	'<h1><a id="repoName" href=\"'+htmlObj[i].html_url+'\">' + htmlObj[i].name + '</a></h1>'
			repoHTML +=		(htmlObj[i].description?'<p id="repoDesc">' + htmlObj[i].description + '</p>':'')
			repoHTML += 	'<div class=extraInfo>'
			repoHTML +=			(htmlObj[i].language?'<p class="hasIcon dot" id="language"><i class="material-icons">fiber_manual_record</i>'+htmlObj[i].language+'</p>':'')
			repoHTML += 		(htmlObj[i].stargazers_count?'<p class="hasIcon" id="stars"><i class="material-icons">&#xE838;</i>'+htmlObj[i].stargazers_count+'</p>':'')
			repoHTML +=			(htmlObj[i].forks_count?'<p class="hasIcon" id="forks"><i class="material-icons">shuffle</i>'+htmlObj[i].forks_count+'</p>':'')
			repoHTML +=			'<p class="date">'+getUpdatedAt(htmlObj[i].updated_at)+'</p>'
			repoHTML +=		'</div>'
			repoHTML += '</li><hr>'
		}
		repoNode.innerHTML = repoHTML
}

function getUpdatedAt(dateString){
	var date1 = new Date(dateString);
	var date2 = new Date();
	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

	if(diffDays<30){
		return "Updated "+ diffDays + " days ago"
	}
	else{
		return "Updated on " + date1.toDateString().slice(4)
	}

}

function makeProfilePromise(url){
	var promiseProfile = $.getJSON(url)
	promiseProfile.then(setProfileHTML)
}

function makeRepoPromise(url){
	var promiseRepo = $.getJSON(url)
	promiseRepo.then(setRepoHTML)
}

function main(){
	var defaultProfileURL = 'https://api.github.com/users/matthiasak',
		defaultRepoURL = 'https://api.github.com/users/matthiasak/repos?sort=updated',
		emptyURL = 'https://api.github.com/users/',
		inputNode = document.querySelector('#inputText')

		makeProfilePromise(defaultProfileURL)
		makeRepoPromise(defaultRepoURL)

		inputNode.addEventListener('keydown', function(e){
			if(e.keyCode == 13){
				makeProfilePromise(emptyURL+inputNode.value)
				makeRepoPromise(emptyURL+inputNode.value+'/repos?sort=updated')
			}
		})


}
main()
