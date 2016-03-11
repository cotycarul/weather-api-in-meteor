Meteor.methods({
    checkWeather: function (cityName) {
        this.unblock();
        var apiKey = "5f4ea7f5349b2b25018b365c8497fe31";
        var api = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
        var results = Meteor.http.call("GET", api);
        if (Meteor.userId()) {
            History.insert({
                temperature: Math.round(results.data.main.temp - 273.15),
                weather: results.data.weather[0].main,
                location: cityName,
                createdAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username
            });
        }
        else {
                History.insert({
                    temperature: Math.round(results.data.main.temp - 273.15),
                    weather: results.data.weather[0].main,
                    location: cityName,
                    createdAt: new Date(),
                    owner: undefined,
                    username: "Anonymous"
                });
        }
        return results;
    },

    checkWeatherByCoord: function (lat, lon) {
        this.unblock();
        var apiKey = "5f4ea7f5349b2b25018b365c8497fe31";
        var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        var results = Meteor.http.call("GET", api);
        if (Meteor.userId()) {
            History.insert({
                temperature: Math.round(results.data.main.temp - 273.15),
                weather: results.data.weather[0].main,
                location: lat + "; " + lon,
                createdAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username
            });
        }
        else {
            History.insert({
                temperature: Math.round(results.data.main.temp - 273.15),
                weather: results.data.weather[0].main,
                location: lat + "; " + lon,
                createdAt: new Date(),
                owner: undefined,
                username: "Anonymous"
            });
        }
        return results;
    }
});