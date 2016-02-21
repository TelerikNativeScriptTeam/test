'use strict'

let beerModule = require("./list-view-model");
let frameModule = require("ui/frame");
var AppSettings = require("application-settings");
var Everlive = require("../../libs/everlive/everlive.all.min");
var el = new Everlive({
	appId: 'gueeeo56lwfpwx8g',
	scheme: 'http',
    token: AppSettings.getString(TOKEN_DATA_KEY)
});


function pageLoaded(args) {
	let page = args.object;
	var vm = beerModule.beViewModel;
	page.bindingContext = vm;

	var data = el.data('Beers');
	var query = new Everlive.Query();
	query.where()
		.done()
		.orderDesc()
		.select("name", "brewedBy", "description", "alc", "image")
		.skip(0)
		.take(10);

	data.get(query)
		.then(function (data) {
			vm.loadProblems(data.result);
			//	console.log(JSON.stringify(data.result));
		}, function (error) {
			console.log("ERROR!! " + JSON.stringify(error));
			console.log(error);
			console.log(data.sourceURL);
		});
}

function onBeerTap(args) {
	let page = args.object.page;
	let vm = page.bindingContext;
	let index = args.index;
	let tappedBeer = vm.beers[index];
	let options = {
    moduleName: './views/beerDetails/beerDetails',
    context: tappedBeer
  };
  frameModule.topmost()
    .navigate(options);
   // updateBeer(tappedBeer);
}

function updateBeer(beer) {
	console.log("UPDATED " + beer.name);
	var data = el.data('Beers');

	var drinkedUserId = AppSettings.getString(USER_ID);

	var attributes = {
		"$push": {
			"drinkedBy": drinkedUserId
		}
	};

	data.rawUpdate(attributes, beer.Id, function (data) {
		console.log(JSON.stringify(data));
	}, function (err) {
		console.log(JSON.stringify(data));
	});
}

function test() {
    el.Users.currentUser(function (data) {
        if (data.result) {
            var username = data.result.test;
            alert(username + " is logged in!");
        } else {
            alert("Missing access token. Please log in!");
        }
    }, function (err) {
        alert(err.message + " Please log in.");
    });
}


exports.pageLoaded = pageLoaded;
exports.onBeerTap = onBeerTap;