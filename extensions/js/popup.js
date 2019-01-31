// let baseUrl = `http://35.240.200.66`
let baseUrl = `http://localhost:3000`
let APIurl = `http://api.linkpreview.net/?key=5c3cd12828c9b6babc4f58d8d2e929d85fc2175025c92&q=`

$(document).ready(function(){
    chrome.tabs.getSelected(null, function (tab){
        var link = document.createElement('a');
        link.href = tab.url;
        $('#urlp').html(` 
            <div class="alert alert-success text-center" role="alert">
                <h4><a href="${link}" target="_blank" class="text-center">${link.hostname} <i class="fa fa-link"></i></a></h4>
            </div>`
        );
    })
    getOne()
    // getCategory()

});

// URL Info
var el = document.getElementById('urlinfo');
if(el){
  el.addEventListener('click', getOne);
}
function getOne(){
    $("#register").hide()
    chrome.tabs.getSelected(null, function (tab){
        var link = document.createElement('a');
        link.href = tab.url;
        let host = link.hostname
        $.ajax({
            url: baseUrl+ `/report/${host}`,
            method: 'GET'
        })
        .done(result =>{
            let newUrl = result.url
            if(newUrl === host){
                $('#result').text("")
                $('#result').html(`
                    <div class="card">
                        <h5 class="card-header text-center">Result</h5>
                        <div class="card-body">
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <th scope="row">URL</th>
                                        <td>${result.url}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Category</th>
                                        <td>${result.category.category}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Pelapor</th>
                                        <td>${result.reporter}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email</th>
                                        <td>${result.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Status</th>
                                        <td>${result.status}</td>
                                    </tr>
                                </tbody>
                            </table> 
                        </div>
                    </div>
                `)
            }   
        })
        .fail(err =>{
            chrome.tabs.getSelected(null, function (tab){
                var link = document.createElement('a');
                link.href = tab.url;
                let previewHost = link.hostname
                $.ajax({
                    url: APIurl+ `${previewHost}`,
                    success: function(result){
                    }
                })
                .done(result =>{
                    $('#reg').append(`
                        <div class="card" style="width: 22rem;">
                            <img class="card-img-top" src="${result.image}" alt="image">
                            <div class="card-body">
                                <h5 class="card-title">${result.title}</h5>
                                <p class="card-text">${result.description}</p>
                            </div>
                        </div>
                    `)
                })
                .fail(err =>{
                    console.log(`err`,err);
                    
                })
            })
        })
    }) 
}

// Register
var el = document.getElementById('myButton');
if(el){
  el.addEventListener('click', reg);
}

function reg() {
    $.ajax({
        method: 'GET',
        url: baseUrl+`/category`
    })
    .done(response =>{
        console.log(response);
        $('#result').text("")
        $('#register').show()
        chrome.tabs.getSelected(null, function (tab){
            var link = document.createElement('a');
            link.href = tab.url;
            let host = link.hostname
            $('#urlx').append(`
                <input class="form-control text-center" type="text" id="url" hidden value="${link.hostname}"> `)
            response.forEach(data=>{
                $('#djaduls').append(`
                    <option  class="text-center" id="category" value="${data._id}">${data.category}</option>
                `)
            })
        })
    })  
    .fail(err =>{
        console.log(err);
        
    })                  
}

// Laporkan!
var el = document.getElementById('report');
if(el){
  el.addEventListener('click', addReport);
}

function addReport(){
    console.log(`laporkan`);
    let url = $("#url").val()
    let title = $("#title").val()
    let reporter = $("#reporter").val()
    let category = $("#djaduls").val()
    let email = $("#email").val()
    console.log(url);
    
    $.ajax({
        method: 'POST',
        url: baseUrl + `/report`,
        data: {
            url,
            title,
            reporter,
            category,
            email
        }
    })
    .done(response =>{
        console.log(response);
        success(`Succesfully report ${url}!`)
        getOne()
    })
    .fail(err =>{
        console.log(err);
        
    })   
}



// Your Info
var el = document.getElementById('myIp');
if(el){
  el.addEventListener('click', myIp);
}
function myIp(){
    $.ajax({
        url: `https://api.myip.com`,
        method: 'GET'
    })
    .done(response =>{
        let myip = JSON.parse(response)
        $.getJSON(`https://ipapi.co/${myip.ip}/json/`, function(data){
            console.log(data,`ipppp`)
        
        $('#result').text("")
        $('#result').append(`
            <div class="card">
                <h5 class="card-header text-center">Your Info</h5>
                <div class="card-body">
                    <table class="table table-striped">
                        <tbody>
                            <tr>
                                <th scope="row">Region</th>
                                <td>${myip.cc}</td>
                            </tr>
                            <tr>
                                <th scope="row">IP</th>
                                <td>${myip.ip}</td>
                            </tr>
                            <tr>
                                <th scope="row">Country</th>
                                <td>${myip.country}</td>
                            </tr>
                            <tr>
                                <th scope="row">Time Zone</th>
                                <td>${data.timezone}</td>
                            </tr>
                            <tr>
                                <th scope="row">ISP</th>
                                <td>${data.org}</td>
                            </tr>
                        </tbody>
                    </table> 
                </div>
            </div>
        `)
    })
    })
}

function success(msg) {
    $("#alert").append(`
        <div class="alert alert-success" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <p>Thank you, ${msg}</p>
        </div>
    `)
    setTimeout(() => {
        $("#alert").text("")
    }, 3000);
}


