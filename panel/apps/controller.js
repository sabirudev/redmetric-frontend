app.controller("login", function ($scope, $rootScope, $routeParams, httpRequest, notification) {
    if (sessionStorage.getItem("login") != null) {
        location.replace('/dashboard');
    }

    $scope.login = function () {
        httpRequest
            .post("https://apimustika.xiaomigamesgift.com/api/v1/login", $scope.form)
            .then(function (response) {
                if (response.data.status = "success") {
                    sessionStorage.setItem("login", 1);
                    location.replace('/dashboard');
                } else {
                    notification.error(response.data.message);
                }
            });
    };
});

app.controller("register", function ($scope, $rootScope, $routeParams, httpRequest, notification) {

});

app.controller("forgotpassword", function ($scope, $rootScope, $routeParams, httpRequest, notification) {

});

app.controller("home", function ($scope, $rootScope, $routeParams, httpRequest, notification) {
    
});

app.controller("submission", function ($scope, $rootScope, $routeParams, httpRequest, notification) {

});

app.controller("profile", function ($scope, $rootScope, $routeParams, httpRequest, notification) {

});



app.controller("questionnaire", function ($scope, $rootScope, $routeParams, httpRequest, notification) {

});


app.controller("NavbarUser", function ($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});
