app.controller("user/navbar", function ($scope, $rootScope, $routeParams, httpRequest, notification, roles, $location) {
    $scope.logoutSession = function () {
        sessionStorage.removeItem('login');
        location.replace('/panel');
    }
    $scope.getClass = function (path) {
        return ($location.path() == path) ? 'active' : ''
    }

    $scope.showSidebar = function (name) {
        if (name == "/panel/user") {
            $scope.sidebarContentUrl = "panel/pages/user/dashboard.html";
        } else if (name == "/panel/user/submission") {
            $scope.sidebarContentUrl = "panel/pages/user/submission.html";
        } else if (name == "/panel/user/profile") {
            $scope.sidebarContentUrl = "panel/pages/user/profile.html";
        }
    };
    $scope.showSidebar($location.path());
});

app.controller("user/home", function ($scope, $rootScope, $routeParams, httpRequest, notification) {

});

app.controller("user/submission", function ($scope, $rootScope, $routeParams, httpRequest, notification) {

});

app.controller("user/profile", function ($scope, $rootScope, $routeParams, httpRequest, notification) {

});

app.controller("user/questionnaire/thank-you", function ($scope, $rootScope, $routeParams, httpRequest, notification) {
    // TODO
    const today = new Date()
    const nextDay = new Date()
    const dueDate = new Date(nextDay.setDate(today.getDate() + 15))
    const opened = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`
    const closed = `${dueDate.getFullYear()}/${dueDate.getMonth()}/${dueDate.getDate()}`
    $scope.period = { ...{ opened, closed } }
});



app.controller("user/questionnaire", function ($scope, $rootScope, $routeParams, httpRequest, notification, api_url, session_get) {
    $scope.questionData = {};
    $scope.currentTab = 0; // Current tab is set to be the first tab (0)
    $scope.questionIndicator = [];

    $scope.submitData = {};
    $scope.submitData.submissions = [];
    // $scope.indicator = {};

    $scope.getQuisioner = function (index) {
        httpRequest
            .get(api_url + "user/submissions", {
                page: index
            }, session_get.utoken())
            .then(function (response) {
                if (response.data.status == 'success') {
                    const items = Object.values(response.data.data[0]?.indicators).flatMap(item => item?.inputs)
                    $scope.questionData = items;
                    $scope.submitData.submissions = items.map(item => ({
                        indicator_id: item.indicator_id,
                        indicator_input_id: item.id,
                        value: null
                    }));
                }
            })
    };
    $scope.getQuisioner($scope.currentTab + 1);


    $scope.fixStepIndicator = function (n) {
        // This function removes the "active" class of all steps...
        var i,
            x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" step-active", "");
        }
        //... and adds the "active" class on the current step:
        x[n].className += " step-active";
    }

    $scope.showTab = function (n) {
        // This function will display the specified tab of the form...
        var x = document.getElementsByClassName("tab");
        x[n].style.display = "block";
        //... and fix the Previous/Next buttons:
        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        if (n == x.length - 1) {
            document.getElementById("nextBtn").innerHTML = "Submit";

        } else {
            document.getElementById("nextBtn").innerHTML = "Next";
        }
        //... and run a function that will display the correct step indicator:
        $scope.fixStepIndicator(n);
    }

    $scope.showTab($scope.currentTab); // Display the current tab

    $scope.nextPrev = function (n) {
        // This function will figure out which tab to display
        var x = document.getElementsByClassName("tab");
        // Exit the function if any field in the current tab is invalid:
        if (n == 1 && !validateForm()) return false;
        // Increase or decrease the current tab by 1:
        $scope.currentTab = $scope.currentTab + n;
        const nextPage = $scope.currentTab === 1 ? $scope.currentTab + 1 : $scope.currentTab
        $scope.currentTab = nextPage
        $scope.getQuisioner(nextPage);
    };

    function validateForm() {
        const valid = true
        if ($scope.currentTab <= 5) {

            if ($scope.currentTab === 0) {
                document.getElementsByClassName("step")[$scope.currentTab].className +=
                    " step-success";
                document.getElementsByClassName("step")[1].className +=
                    " step-active";
            } else {
                document.getElementsByClassName("step")[$scope.currentTab - 1].className +=
                    " step-success";
                document.getElementsByClassName("step")[$scope.currentTab].className +=
                    " step-active";
            }
        }
        $scope.submitData.period_id = 1;
        $scope.submitSubmission();
        return valid; // return the valid status
    }

    $scope.submitSubmission = function () {
        $scope.submitData.period_id = 1;
        httpRequest
            .post(api_url + "user/submissions", $scope.submitData, session_get.utoken())
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    $scope.data = response.data.data;
                    // if you have reached the end of the form...
                    if ($scope.currentTab > 6) {
                        // ... the form gets submitted:
                        window.location.href = '/panel/user/questionnaire/thank-you'
                    }
                } else {
                    notification.error(response.data.message);
                }
            });
    };

    $scope.finish = function () {
        $('#modalFinish').modal('show');
    };
});

app.directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value);
            });
        }
    };
});