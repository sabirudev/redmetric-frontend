app = angular.module("panel", ["ngRoute", "ngSanitize"]);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/panel", {
            templateUrl: "panel/pages/auth/login.html",
            controller: "login",
        })
        .when("/panel/register", {
            templateUrl: "panel/pages/auth/register.html",
            controller: "register",
        })
        .when("/panel/forgotpassword", {
            templateUrl: "panel/pages/auth/forgotpassword.html",
            controller: "forgotpassword",
        })

        .when("/panel/home", {
            templateUrl: "panel/pages/user/home.html",
            controller: "home",
        })
        .when("/panel/submission", {
            templateUrl: "panel/pages/user/submission.html",
            controller: "submission",
        })
        .when("/panel/profile", {
            templateUrl: "panel/pages/user/profile.html",
            controller: "profile",
        })
        .when("/panel/questionnaire", {
            templateUrl: "panel/pages/user/questionnaire.html",
            controller: "questionnaire",
        })
    // .otherwise({
    //     redirectTo: "/panel",
    // });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true,
    });
});

app.controller('sidebar', function ($scope, $location) {
    $scope.logoutSession = function () {
        sessionStorage.removeItem('login');
        location.replace('/');
    }
    $scope.getClass = function (path) {
        return ($location.path() == path) ? 'active' : ''
    }
    $scope.isActive = function (routes) {
        return ($location.path() == routes) ? 'active' : ''
    }
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

app.factory("base_url", function () {
    return "https://apiredmetric.i-kuy.com/api/";
})

app.factory("notification", function () {
    return {
        info: function (text) {
            return $.toast({
                heading: "info",
                text: text,
                icon: "info",
                loader: true, // Change it to false to disable loader
                hideAfter: 5000,
            });
        },
        error: function (text) {
            return $.toast({
                heading: "error",
                text: text,
                icon: "error",
                loader: true, // Change it to false to disable loader
                hideAfter: 5000,
            });
        },
        warning: function (text) {
            return $.toast({
                heading: "Warning",
                text: text,
                icon: "warning",
                loader: true, // Change it to false to disable loader
                hideAfter: 5000,
            });
        },
        success: function (text) {
            return $.toast({
                heading: "Success",
                text: text,
                icon: "success",
                loader: true, // Change it to false to disable loader
                hideAfter: 5000,
            });
        },
    };
});
app.run(function ($rootScope, httpRequest) {
    // httpRequest
    //     .get("https://apimustika.xiaomigamesgift.com/api/v1/get_panel_version")
    //     .then(function (response) {
    //         cookie = document.cookie;
    //         var output = {};
    //         cookie.split(/\s*;\s*/).forEach(function (pair) {
    //             pair = pair.split(/\s*=\s*/);
    //             output[pair[0]] = pair.splice(1).join("=");
    //         });
    //         var json = JSON.stringify(output, null, 4);
    //         json = JSON.parse(json);
    //         console.log(json);
    //         if (json.version) {
    //             if (json.version != response.data.data.version) {
    //                 console.log(json.version);
    //                 console.log(response.data.data.version);
    //                 date = new Date();
    //                 date = new Date(date.setMonth(date.getMonth() + 1));
    //                 document.cookie =
    //                     "version=" + response.data.data.version + "; expires=" + date;
    //                 location.reload(true);
    //             } else {
    //                 console.log(json.version);
    //                 console.log(response.data.data.version);
    //             }
    //         } else {
    //             console.log(json.version);
    //             date = new Date();
    //             date = new Date(date.setMonth(date.getMonth() + 1));
    //             document.cookie =
    //                 "version=" + response.data.data.version + "; expires=" + date;
    //             location.reload(true);
    //         }
    //     });
});