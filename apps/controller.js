app.controller("landingpage", function ($scope, $http, httpRequest, $log, urls, $window) {
    $scope.login = function () {
        $window.location = "/panel";
    };
    $log.debug(urls);


    var myCarousel = document.querySelector('#home')
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 2000,
        wrap: false
    })
});
app.controller("profile", function () {});

app.controller("peringkat", function () {});