app.controller("landingpage", function ($scope, $location, $anchorScroll, $http, httpRequest, $log, urls, $window, $routeParams) {
    $scope.login = function () {
        $window.location = "/panel";
    };
    $log.debug(urls);

    $scope.chart = function(){
        var config = {
            type: 'horizontalBar',
            data: {
                  labels: ["Desa 1", "Desa 2", "Desa 3", "Desa 4",],
                  datasets: [{
                        label: "20-30",
                        backgroundColor: "rgba(235, 29, 29, 0.7)",
                        data: [0, 0, 50, 0, 0, 0, 100, 30],
                  }, {
                        label: "31-40",
                        backgroundColor: "rgba(79, 143, 15, 0.7)",
                        data: [0, 0, 50, 0, 0, 0, 0, 30]
                  }, {
                        label: "41-50",
                        backgroundColor: "rgba(16, 94, 172, 0.7)",
                        data: [0, 100, 0, 0, 0, 0, 0, 20]
                  }, {
                        label: "50 Up",
                        backgroundColor: "rgba(247, 127, 7, 0.7)",
                        data: [100, 0, 0, 0, 0, 100, 0, 20]
                  }]
            },
            options: {
                  // responsive: true,
                  scales: {
                        xAxes: [{
                              stacked: true,
                              ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function (value) {
                                          return value + "%"
                                    }
                              }
                        }],
                        yAxes: [{
                              stacked: true
                        }]
                  },
                  tooltips: {
                        enabled: true,
                        mode: 'single',
                        callbacks: {
                              label: function (tooltipItems, data) {
                                    return data.datasets[tooltipItems.datasetIndex].label + ': ' +
                                          tooltipItems.xLabel + ' %';
                              }
                        }
                  },
            }
      };
      var ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, config);
    }
    $scope.chart();

    // $scope.scrollTo = function (id) {
    //     $location.hash(id);
    //     $anchorScroll();
    // }


    var myCarousel = document.querySelector('#home')
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 2000,
        wrap: false
    })

    //scroll
    $scope.scrollTo = function (selector) {
        console.log(selector);
        if (jQuery('#' + selector).length == 1) {
            console.log(jQuery('#' + selector).offset().top);
            jQuery('html, body').animate({
                scrollTop: jQuery('#' + selector).position().top
            });
        };
    }
    if (typeof $routeParams.page !== 'undefined' && $routeParams.page.length > 0) {
        $timeout(function () {
            $scope.scrollTo($routeParams.page)
        }, 1);
    }
});
app.controller("profile", function () {});

app.controller("peringkat", function () {});

app.controller("berita", function ($scope, $location, $anchorScroll, $http, httpRequest, $log, urls, $window, $routeParams) {

    $scope.scrollTo = function (selector) {
        console.log(selector);
        if (jQuery('#' + selector).length == 1) {
            console.log(jQuery('#' + selector).offset().top);
            jQuery('html, body').animate({
                scrollTop: jQuery('#' + selector).position().top
            });
        };
    }
    $scope.scrollTo('top');
    if (typeof $routeParams.page !== 'undefined' && $routeParams.page.length > 0) {
        $timeout(function () {
            $scope.scrollTo($routeParams.page)
        }, 1);
    }
});

app.controller("detail-berita", function () {});