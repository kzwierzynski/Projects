 $(document).ready(function() {
   $("#userID").on("keyup", function(e){
     let username= event.target.value;

     $.ajax({
       url: "https://api.github.com/users/"+username,
       data:{
         cliend_id: 'c70d21cfb5b205bcdc4a',
         client_secret: 'ff8939d234a97d1c119b88c686badd23392f45d4'
       }
     }).done( function(user){
       $.ajax({
         url: "https://api.github.com/users/"+username+"/repos",
         data:{
           cliend_id: 'c70d21cfb5b205bcdc4a',
           client_secret: 'ff8939d234a97d1c119b88c686badd23392f45d4',
           sort: 'updated: desc',
           per_page: '5'
         }
       }).done(function(repos){
         $.each(repos, function(index, repo){
           // console.log(repo.name);
           $("#repoList").append(`<div class="well">
                                 <div class="row">
                                   <div class="col-md-7">
                                     <p><strong>${repo.name}:\t</strong>${repo.description}</p>
                                   </div>
                                   <div class="col-md-3">
                                     <span class="label label-default">Stargazers: ${repo.stargazers_count}</span>
                                     <span class="label label-primary">Watchers: ${ repo.watchers_count }</span>
                                     <span class="label label-success">Forks: ${ repo.forks_count }</span>
                                   </div>
                                   <div class="col-md-2">
                                     <a target="_blank" type="button" class="btn btn-primary btn-block" href="${repo.html_url }">View Repo</a>
                                   </div>
                                 </div>
                               </div>`);
         });
       });
       $("#GITprofile").html(`<div class="panel panel-default">
                                <div class="panel-heading">
                                  <h3 class="panel-title">${user.name }</h3>
                                </div>
                                <div class="panel-body">
                                <div class="row">
                                  <div class="col-md-3">
                                      <img class="thumbnail" src="${user.avatar_url }">
                                      <a target="_blank" type="button" class="btn btn-primary btn-block" href="${user.html_url }">Visit Profile</a>
                                  </div>
                                  <div class="col-md-9">
                                    <span class="label label-default">Public Repos: ${user.public_repos }</span>
                                    <span class="label label-primary">Public Gists: ${user.public_gists }</span>
                                    <span class="label label-success">Followers: ${user.followers }</span>
                                    <span class="label label-info">Following: ${user.following }</span>
                                    <br><br>
                                    <ul class="list-group">
                                      <li class="list-group-item">Company:  ${user.company } </li>
                                      <li class="list-group-item">Blog:  ${user.blog } </li>
                                      <li class="list-group-item">Location:  ${user.location } </li>
                                      <li class="list-group-item">Member since:  ${user.created_at } </li>
                                    </ul>
                                  </div>
                                  </div>
                                </div>
                              </div>
                              <h3 class="page-header">Latest Repos</h3>
                              <div id="repoList">
                              </div>
                              `);

    });
   });
 });
