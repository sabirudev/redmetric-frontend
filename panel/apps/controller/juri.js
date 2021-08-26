app.controller("juri/sidebar", function ($scope, $rootScope, $routeParams, httpRequest, notification, $window, $location, session_get, session_check) {
    $scope.checkLSession = function () {
        if (session_get.uroles() != 3) {
            $window.location = session_check.roles(session_get.uroles());
        }
    }
    $scope.checkLSession();
    $scope.getClass = function (name = 'history') {
        const { page } = $routeParams || '';
        return ((!page && name === 'history') || page === name) ? 'active' : '';
    }

    $scope.isActive = function (routes) {
        return ($location.path() == routes) ? 'active' : ''
    }

    $scope.showSidebar = function () {
        const { page } = $routeParams || { page: 'history' };
        switch (page) {
            case 'history':
                $scope.sidebarContentUrl = "panel/pages/juri/list-submission.html";
                break;
            case 'todos':
                $scope.sidebarContentUrl = "panel/pages/juri/todos.html";
                break;
            default:
                $scope.sidebarContentUrl = "panel/pages/juri/submission-detail.html";
                break;
        }
    };
    $scope.showSidebar();
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
