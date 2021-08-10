// Default environment variables
let __env = {};

// Import variables if present
if (window) {
    Object.assign(__env, window.__env);
}
const _NODE_ENV = __env.enableDebug ? 'DEV' : 'PROD'
app = angular.module("panel", ["ngRoute", "ngSanitize"]);
app.constant('ENVIRONMENT', _NODE_ENV)
    .service('urls', function (ENVIRONMENT) {
        this.apiUrl = (ENVIRONMENT == 'DEV') ? __env.dev_apiUrl : __env.apiUrl;
        this.baseUrl = (ENVIRONMENT == 'DEV') ? __env.dev_baseUrl : __env.baseUrl;
    });

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

        //user
        .when("/panel/user", {
            templateUrl: "panel/pages/user/navbar.html",
            controller: "user/home",
        })
        .when("/panel/user/submission", {
            templateUrl: "panel/pages/user/navbar.html",
            controller: "user/submission",
        })
        .when("/panel/user/profile", {
            templateUrl: "panel/pages/user/navbar.html",
            controller: "user/profile",
        })
        .when("/panel/user/questionnaire", {
            templateUrl: "panel/pages/user/questionnaire.html",
            controller: "user/questionnaire",
        })
        .when("/panel/user/questionnaire/thank-you", {
            templateUrl: "panel/pages/user/thank-you.html",
            controller: "user/questionnaire/thank-you",
        })

        //juri
        .when("/panel/juri/", {
            templateUrl: "panel/pages/juri/home.html",
            controller: "juri/home",
        })
        .when("/panel/juri/list-juri", {
            templateUrl: "panel/pages/juri/home.html",
            controller: "juri/list-juri",
        })

        //superadmin
        .when("/panel/superadmin/", {
            templateUrl: "panel/pages/superadmin/home.html",
            controller: "superadmin/home",
        })
        .when("/panel/superadmin/vilagers", {
            templateUrl: "panel/pages/superadmin/home.html",
            controller: "superadmin/vilagers",
        })
        .when("/panel/superadmin/juri", {
            templateUrl: "panel/pages/superadmin/home.html",
            controller: "superadmin/juri",
        })
        .when("/panel/superadmin/admin", {
            templateUrl: "panel/pages/superadmin/home.html",
            controller: "superadmin/admin",
        })
        .when("/panel/superadmin/submission", {
            templateUrl: "panel/pages/superadmin/home.html",
            controller: "superadmin/submission",
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
        get: function (url, params, token) {
            return $http({
                headers: {
                    Authorization: (token != undefined) ? "Bearer " + token : "",
                    Accept: "application/json",
                },
                method: "GET",
                url: url,
                cache: false,
                params: params,
            }).then(function (response) {
                return response;
            }, function (error) {
                // else
                return error;
            });
        },
        post: function (url, data, token) {
            return $http({
                headers: {
                    Authorization: (token != undefined) ? "Bearer " + token : "",
                    Accept: "application/json",
                },
                method: "POST",
                cache: false,
                url: url,
                data: data,
            }).then(function (response) {
                return response;
            }, function (error) {
                // else
                return error;
            });
        },
        put: function (url, data, token) {
            return $http({
                headers: {
                    Authorization: (token != undefined) ? "Bearer " + token : "",
                    Accept: "application/json",
                },
                method: "PUT",
                cache: false,
                url: url,
                data: data,
            }).then(function (response) {
                return response;
            }, function (error) {
                // else
                return error;
            });
        },
        delete: function (url, data, token) {
            return $http({
                headers: {
                    Authorization: (token != undefined) ? "Bearer " + token : "",
                    Accept: "application/json",
                },
                method: "DELETE",
                cache: false,
                url: url,
            }).then(function (response) {
                return response;
            }, function (error) {
                // else
                return error;
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
    // console.log(version);
    // $rootScope.version = version;
    // httpRequest
    //     .get(base_url + "v1/version")
    //     .then(function (response) {
    //         cookie = document.cookie;
    //         var output = {};
    //         cookie.split(/\s*;\s*/).forEach(function (pair) {
    //             pair = pair.split(/\s*=\s*/);
    //             output[pair[0]] = pair.splice(1).join("=");
    //         });
    //         var json = JSON.stringify(output, null, 4);
    //         json = JSON.parse(json);
    //         $rootScope.version = response.data.version;
    //         console.log($rootScope.version);
    //         if (json.version) {
    //             if (json.version != response.data.version) {
    //                 console.log(json.version);
    //                 console.log(response.data.version);
    //                 date = new Date();
    //                 date = new Date(date.setMonth(date.getMonth() + 1));
    //                 document.cookie =
    //                     "version=" + response.data.version + "; expires=" + date;
    //                 $state.go($state.current, {}, {
    //                     reload: true
    //                 });

    //             } else {
    //                 console.log(json.version);
    //                 console.log(response.data.version);
    //             }
    //         } else {
    //             console.log(json.version);
    //             date = new Date();
    //             date = new Date(date.setMonth(date.getMonth() + 1));
    //             document.cookie =
    //                 "version=" + response.data.version + "; expires=" + date;
    //             $state.go($state.current, {}, {
    //                 reload: true
    //             });

    //         }
    //     });
});