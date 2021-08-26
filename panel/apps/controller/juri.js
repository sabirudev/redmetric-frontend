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

    $scope.getData = function (index) {
        window.location = "panel/juri/detail-submission?index=" + index;
    }
});


app.controller("juri/detail_submission", function ($scope, $rootScope, $routeParams, httpRequest, notification, session_break, api_url, session_get, $log) {
    $scope.logoutSession = function () {
        session_break.reset();
    }

    $scope.index = 1;
    $scope.questionData = {};
    $scope.currentTab = 0; // Current tab is set to be the first tab (0)
    $scope.questionIndicator = [];

    $scope.submitData = {};
    $scope.submitData.submissions = [];
    $scope.arrayLength = 0;
    $scope.getDetailSubsmission = function (index) {
        httpRequest
            .get(api_url + "jury/todos/" + $routeParams.index, {
                "page": index
            }, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    $scope.questionData = response.data;
                    $scope.questionData.forEach(element => {
                        data = {
                            indicator_submission_id: element.pivot.id,
                            point: null,
                        }
                        $scope.submitData.submissions.push(data)
                    });
                }
            });
    }
    $scope.getDetailSubsmission($scope.index);

    $scope.submitNext = function () {
        $scope.submitData.submission_id = $routeParams.index;
        var BreakException = {};

        try {
            $scope.submitData.submissions.forEach(function (i, idx, array) {
                if (i.point == null) {
                    notification.error("Point belum dimasukan");
                    throw BreakException;
                } else {
                    if (idx === $scope.submitData.submissions.length - 1) {
                        if ($scope.index >= 6) {
                            httpRequest
                                .post(api_url + "jury/todos", $scope.submitData, session_get.utoken())
                                .then(function (response) {
                                    if (response.status == 200) {
                                        notification.success("Data tersimpan");
                                    }
                                });
                        } else {
                            $scope.arrayLength  += $scope.questionData.length;
                            $scope.index++;
                            $scope.getDetailSubsmission(
                                $scope.index);
                        }

                    }
                }
            });
        } catch (e) {
            if (e !== BreakException) throw e;
        }
    }
});