var templateSample = undefined;


Template.Search.helpers({
    'imagePath': function () {
        return Template.instance().imagePath.get();
    },
    'showWeather': function () {
        return Template.instance().showWeather.get();
    }
});
Template.lastReq.helpers({
    'req': function() {
        return History.find({},{limit: 10,sort:{createdAt: -1}});
    }
});

Template.Search.onCreated(function () {
    this.imagePath = new ReactiveVar(null);
    this.showWeather = new ReactiveVar(null);
});

Template.Search.events({
    'click #ok': function () {
        SearchHelper.temp();
    },
    'keypress input': function (event, tpl) {
        if (event.charCode == 13) {
            SearchHelper.temp(event, tpl);
        }
    },
    'click #autoLocate': function (event, tpl) {
        if (navigator.geolocation) {
            templateSample = tpl;
            navigator.geolocation.getCurrentPosition(SearchHelper.temp2);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
});

var SearchHelper = {
    showWeatherMain: function (tpl, results) {
        if (results.data.weather[0].main == "Clear") {
            tpl.imagePath.set("img/weather_clear.png");
        }
        else if (results.data.weather[0].main == "Clouds") {
            tpl.imagePath.set("img/weather_clouds.png");
        }
        else if (results.data.weather[0].main == "Rain") {
            tpl.imagePath.set("img/weather_rain.png");
        }
    },
    temp: function (e, tpl) {
        var cityName = tpl.$("input").val();
        tpl.$("input").val("");
        Meteor.call("checkWeather", cityName, function (error, results) {
            var Temperature = results.data.main.temp - 273.15;
            Temperature = Math.round(Temperature);
            SearchHelper.showWeatherMain(tpl, results);
            tpl.showWeather.set("Temperature in " + cityName + " is " + Temperature + " Celsius");

        });
    },
    temp2: function (position) {
        Meteor.call("checkWeatherByCoord", position.coords.latitude, position.coords.longitude, function (error, results) {
            var Temperature = results.data.main.temp - 273.15;
            Temperature = Math.round(Temperature);
            SearchHelper.showWeatherMain(templateSample, results);
            templateSample.showWeather.set("Temperature in your location is " + Temperature + " Celsius");
        });
    }
};
/*
-facem o colectie "History" unde se vor stoca ultimele requesturi
-cand se da un GET catre server,sa se salveze intro clasa:
    {
        temperature: number,
        weather:String(ex.Rain,Clouds,Clear),
        location:String(orasul sau coordonatele ex.:Iasi ; 47.232134 13.23456 : )
        createdAt: new  Date(),
    }
-toate acestea sa fie afisate intrun div separat de celelalte lucruri
 */
