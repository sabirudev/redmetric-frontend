app.controller("landingpage", function ($scope, $http, httpRequest, notification, urls, $window) {
    $scope.login = function () {
        $window.location = "/panel";
        console.log("jalan");
    };
    console.log(urls);
});
app.controller("profile", function () {});

app.controller("peringkat", function () {});