var cheerio = require('cheerio');
var request = require('request');

request('https://hbase.apache.org/devapidocs/allclasses-noframe.html', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(html);	
    /*$('.indexContainer > ul').text().split("\n").forEach(function(elem) {
    	if(elem.endsWith('Exception')){
    		//console.log($('//a[contains(@href,"'+elem+'")]').title());
    		console.log(elem);
    	}
    });*/

    $('.indexContainer > ul > li').children().each(function(i, elem) {
    	var className = (elem.children[0].data == undefined ? elem.children[0].children[0].data : elem.children[0].data);
    	if(className.endsWith('Exception')) {
    		//console.log(elem.attribs.title.split(' ')[elem.attribs.title.split(' ').length-1] + "." + className);

    		var uri = elem.attribs.href;

    		request('https://hbase.apache.org/devapidocs/' + uri, function(error, response, html) {
    			if (!error && response.statusCode == 200) {
				    $ = cheerio.load(html);	
					console.log(elem.attribs.title.split(' ')[elem.attribs.title.split(' ').length-1] + "," + className + ",\"" + $('div.block').text().replace(/"/g,'~dq~')+"\"");
				    //console.log($('div.block').text());
				}
    		});
    	}
    	
    });

  }
});

function endsWith(str, suffix) {
	return str.slice(-suffix.length) === suffix
}