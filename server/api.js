

Meteor.methods({
    checkWeather: function (cityName) {
        this.unblock();
        var apiKey = "44db6a862fba0b067b1930da0d769e98";
        var api = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
        var results = Meteor.http.call("GET", api);
        History.insert({
            temperature: Math.round(results.data.main.temp - 273.15),
            weather: results.data.weather[0].main,
            location: cityName,
            createdAt: new Date()
        });
        return results;
    },
    checkWeatherByCoord: function (lat, lon) {
        this.unblock();
        var apiKey = "44db6a862fba0b067b1930da0d769e98";
        var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        var results = Meteor.http.call("GET", api);
        History.insert({
            temperature: Math.round(results.data.main.temp - 273.15),
            weather: results.data.weather[0].main,
            location: lat + "; " + lon,
            createdAt: new Date()
        });
        return results;
    }
});