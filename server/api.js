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
        return Meteor.http.call("GET", api);
    }
});