
const _NODE_ENV = __env.enableDebug ? 'DEV' : 'PROD'

app = angular.module("panel", ["ngRoute", "ngSanitize"]);
app.constant('ENVIRONMENT', _NODE_ENV)
    .service('urls', function (ENVIRONMENT) {
        this.apiUrl = (ENVIRONMENT == 'DEV') ? __env.dev_apiUrl : __env.apiUrl;
        this.baseUrl = (ENVIRONMENT == 'DEV') ? __env.dev_baseUrl : __env.baseUrl;
    });
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
            templateUrl: "panel/pages/user/index.html",
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
            controller: "juri/list-juri",
        })
        .when("/panel/juri/list-juri", {
            templateUrl: "panel/pages/juri/home.html",
            controller: "juri/list-juri",
        })
        .when("/panel/juri/detail-submission", {
            templateUrl: "panel/pages/juri/home.html",
            controller: "juri/detail_submission",
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
        .when("/panel/superadmin/period", {
            templateUrl: "panel/pages/superadmin/home.html",
            controller: "superadmin/periode",
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

