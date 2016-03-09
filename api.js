if (Meteor.isClient) {
    var templateSample = undefined;

    var Form = {
        temp: function (e, tpl) {
            var cityName = tpl.$("input").val();
            tpl.$("input").val("");
            tpl.$("div #showWeather").text("Temperature in Celsius");
            Meteor.call("checkWeather", cityName, function (error, results) {
                var Temperature = results.data.main.temp - 273.15;
                Temperature = Math.round(Temperature);
                //alert("Temperature in " + cityName + " is " + Temperature + " Celsius");
                tpl.$("div#showWeather").html("Temperature in " + cityName + " is " + Temperature + " Celsius");
            });
        },
        temp2: function (position) {
            Meteor.call("checkWeatherByCoord", position.coords.latitude, position.coords.longitude, function (error, results) {
                var Temperature = results.data.main.temp - 273.15;
                Temperature = Math.round(Temperature);
                //alert("Temperature in your location is " + Temperature + " Celsius");
                templateSample.$("div#showWeather").html("Temperature in your location is " + Temperature + " Celsius");
            });
        }
    };
    Template.Search.events({

        'click #ok': Form.temp,
        'keypress input': function (event, tpl) {
            if (event.charCode == 13) {
                Form.temp(event, tpl);
            }
        },
        'click #autoLocate': function (event, tpl) {
            if (navigator.geolocation) {
                templateSample=tpl;
                navigator.geolocation.getCurrentPosition(Form.temp2);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
    })
}
if (Meteor.isServer) {
    Meteor.methods({
        checkWeather: function (cityName) {
            this.unblock();
            var apiKey = "44db6a862fba0b067b1930da0d769e98";
            var api = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
            return Meteor.http.call("GET", api);
        },
        checkWeatherByCoord: function (lat, lon) {
            this.unblock();
            var apiKey = "44db6a862fba0b067b1930da0d769e98";
            var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
            //console.log(api);
            return Meteor.http.call("GET", api);
        }
    });
}