
app.controller("landingpage", function ($scope, $location, $anchorScroll, $http, httpRequest, $log, urls, $window) {
    $scope.login = function () {
        $window.location = "/panel";
    };
    $log.debug(urls);

    $scope.scrollTo = function (id) {
        $location.hash(id);
        $anchorScroll();
    }


    var myCarousel = document.querySelector('#home')
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 2000,
        wrap: false
    })
});
app.controller("profile", function () { });

app.controller("peringkat", function () { });