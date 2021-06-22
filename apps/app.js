app = angular.module("home", ["ngRoute", "ngSanitize"]);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/landingpage.html",
            controller: "landingpage",
        })

        .otherwise({
            redirectTo: "/"
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true,
    });
});

app.factory("httpRequest", function ($http) {
    return {
        get: function (url, params) {
            return $http({
                headers: {
                    Authorization: "Bearer xiaomi",
                    Accept: "application/json",
                },
                method: "GET",
                url: url,
                cache: false,
                params: params,
            }).then(function (response) {
                return response;
            });
        },
        post: function (url, data) {
            return $http({
                headers: {
                    Authorization: "Bearer xiaomi",
                    Accept: "application/json",
                },
                method: "POST",
                cache: false,
                url: url,
                data: data,
            }).then(function (response) {
                return response;
            });
        },
        put: function (url, data) {
            return $http({
                headers: {
                    Authorization: "Bearer xiaomi",
                    Accept: "application/json",
                },
                method: "PUT",
                cache: false,
                url: url,
                data: data,
            }).then(function (response) {
                return response;
            });
        },
        delete: function (url, data) {
            return $http({
                headers: {
                    Authorization: "Bearer xiaomi",
                    Accept: "application/json",
                },
                method: "DELETE",
                cache: false,
                url: url,
            }).then(function (response) {
                return response;
            });
        },
    };
});

app.factory("notification", function () {
    return {
        info: function (text) {
            return $.toast({
                heading: "info",
                text: text,
                icon: "info",
                loader: true, // Change it to false to disable loader
                hideAfter: 10000,
            });
        },
        error: function (text) {
            return $.toast({
                heading: "error",
                text: text,
                icon: "error",
                loader: true, // Change it to false to disable loader
                hideAfter: 10000,
            });
        },
        warning: function (text) {
            return $.toast({
                heading: "Warning",
                text: text,
                icon: "warning",
                loader: true, // Change it to false to disable loader
                hideAfter: 10000,
            });
        },
        success: function (text) {
            return $.toast({
                heading: "Success",
                text: text,
                icon: "success",
                loader: true, // Change it to false to disable loader
                hideAfter: 10000,
            });
        },
    };
});
app.run(function ($rootScope, httpRequest, $route) {
    httpRequest
        .get("https://apimustika.xiaomigamesgift.com/api/v1/get_users_version")
        .then(function (response) {
            cookie = document.cookie;
            var output = {};
            cookie.split(/\s*;\s*/).forEach(function (pair) {
                pair = pair.split(/\s*=\s*/);
                output[pair[0]] = pair.splice(1).join("=");
            });
            var json = JSON.stringify(output, null, 4);
            json = JSON.parse(json);
            console.log(json);
            if (json.version) {
                if (json.version != response.data.data.version) {
                    console.log(json.version);
                    console.log(response.data.data.version);
                    date = new Date();
                    date = new Date(date.setMonth(date.getMonth() + 1));
                    document.cookie =
                        "version=" +
                        response.data.data.version +
                        "; expires=" +
                        date;
                    location.reload(true);
                    // $route.reload();

                } else {
                    console.log(json.version);
                    console.log(response.data.data.version);
                }
            } else {
                console.log(json.version);
                date = new Date();
                date = new Date(date.setMonth(date.getMonth() + 1));
                document.cookie =
                    "version=" + response.data.data.version + "; expires=" + date;
                location.reload(true);
                // $route.reload();

            }
        });
});