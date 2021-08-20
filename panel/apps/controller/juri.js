app.controller("juri/sidebar", function ($scope, $rootScope, $routeParams, httpRequest, notification, $window, $location, session_get, session_check) {
    $scope.checkLSession = function () {
        if (session_get.uroles() != 3) {
            $window.location = session_check.roles(session_get.uroles());
        }
    }
    $scope.checkLSession();
    $scope.getClass = function (path) {
        return ($location.path() == path) ? 'active' : ''
    }

    $scope.isActive = function (routes) {
        return ($location.path() == routes) ? 'active' : ''
    }

    $scope.showSidebar = function (name) {
        if (name == "/panel/juri/") {
            $scope.sidebarContentUrl = "panel/pages/juri/list-submission.html?v=1";
        } else if (name == "/panel/juri/detail-submission") {
            $scope.sidebarContentUrl = "panel/pages/juri/submission-detail.html";
        }
    };
    $scope.showSidebar($location.path());
});

app.controller("juri/home", function ($scope, $rootScope, $routeParams, httpRequest, notification, session_break) {
    $scope.logoutSession = function () {
        session_break.reset();
    }
});


app.controller("juri/list-juri", function ($scope, $rootScope, $routeParams, httpRequest, notification, session_break, api_url, session_get) {
    $scope.logoutSession = function () {
        session_break.reset();
    }
    $scope.index = 1;

    $scope.getSubmission = function (index) {
        httpRequest
            .get(api_url + "jury/todos", {}, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    $scope.dataSubmission = response.data.data.data;
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
    $scope.getSubmission($scope.index);
});


app.controller("juri/detail_submission", function ($scope, $rootScope, $routeParams, httpRequest, notification, session_break, api_url, session_get) {
    $scope.logoutSession = function () {
        session_break.reset();
    }
    $scope.index = 1;
    $scope.questionData = {};
    $scope.currentTab = 0; // Current tab is set to be the first tab (0)
    $scope.questionIndicator = [];

    $scope.submitData = {};
    $scope.submitData.submissions = [];
    $scope.getDetailSubsmission = function (index) {
        httpRequest
            .get(api_url + "jury/todos/" + $routeParams.id, {
                "page": index
            }, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    $scope.questionData = response.data;
                }
            });
    }
    $scope.getDetailSubsmission($scope.index);
});
