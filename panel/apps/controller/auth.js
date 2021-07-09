app.controller("login", function ($scope, $rootScope, $routeParams, httpRequest, notification, base_url, api_url) {
    if (sessionStorage.getItem("login") != null) {
        location.replace('/dashboard');
    }

    $scope.login = function () {
        httpRequest
            .post(api_url + "membership/login", $scope.form)
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    // sessionStorage.setItem("login", 1);
                    // location.replace('/dashboard');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    };
});

app.controller("register", function ($scope, $rootScope, $routeParams, httpRequest, notification, base_url, api_url) {
    if (sessionStorage.getItem("login") != null) {
        location.replace('/dashboard');
    }

    $scope.register = function () {
        httpRequest
            .post(api_url + "membership/register", $scope.form)
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    // sessionStorage.setItem("login", 1);
                    // location.replace('/dashboard');
                } else {
                    notification.error(response.data.message);
                }
            });
    };

});

app.controller("forgotpassword", function ($scope, $rootScope, $routeParams, httpRequest, notification) {

});