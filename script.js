var fetch = require('node-fetch');
var fs = require('fs');


var content = fs.readFileSync('input.txt', 'utf-8');
var cont = JSON.parse(content);

cont.forEach(function(e) {
    getData(e);
}, this);


function getData(keyword) {
    fetch("http://www.omdbapi.com/?s=" + keyword + "&r=json")
    .then(function(res) {
    var data = res.json();
    return data; 
    })
    .then(function(data) {
    var page = (Math.floor(data.totalResults/10)); 
    console.log(keyword + ": " + data.totalResults);
    fs.writeFile('results/numbers.json', keyword + ": " + data.totalResults + '\n', {encoding: 'utf-8', flag: 'a'} );
    return page;
    })
    .then(function(page) {
        for (var i = 1; i < page; i++) {
            fetch("http://www.omdbapi.com/?s=" + keyword + "&r=json&page=" + i)
            .then(function(data) {
                var d = data.json();
                return d;
            })
            .then(function(d) {
            fs.writeFile('results/' + keyword + '.json', JSON.stringify(d), {encoding: 'utf-8', flag: 'a'} );
            });
        }
    });
}
