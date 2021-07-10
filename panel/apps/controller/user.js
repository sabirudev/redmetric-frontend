app.controller("user/navbar", function ($scope, $rootScope, $routeParams, httpRequest, notification, roles, $location) {
    $scope.logoutSession = function () {
        sessionStorage.removeItem('login');
        location.replace('/panel');
    }
    $scope.getClass = function (path) {
        return ($location.path() == path) ? 'active' : ''
    }

    $scope.showSidebar = function (name) {
        console.log(name);
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
                    $scope.questionData = response.data.data[0];
                    $scope.submitData.submissions = [];
                    $scope.questionIndicator = [];

                    $scope.questionData.indicators.forEach(element => {
                        element.inputs.forEach(element2 => {
                            valueQuestion = {};
                            valueQuestion = element2.label;
                            $scope.questionIndicator.push(valueQuestion);

                            valueData = {};
                            valueData.indicator_id = element.id;
                            valueData.indicator_input_id = element2.id;
                            valueData.value = null;
                            $scope.submitData.submissions.push(valueData);
                        });
                    });
                    // $scope.questionData.indicators.map(function (data) {
                    //     valueData = {};
                    //     valueData.indicator_id = data.id;

                    //     $scope.submitData.submission.push(valueData);
                    // })
                    console.log($scope.questionData);
                    console.log($scope.submitData.submissions);
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
        // Hide the current tab:
        x[$scope.currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        $scope.currentTab = $scope.currentTab + n;
        // if you have reached the end of the form...
        if ($scope.currentTab >= x.length) {
            // ... the form gets submitted:
            document.getElementById("regForm").submit();
            return false;
        }
        // Otherwise, display the correct tab:
        $scope.showTab($scope.currentTab);

        $scope.getQuisioner($scope.currentTab + 1);
    };

    function validateForm() {
        // This function deals with validation of the form fields
        var x,
            y,
            i,
            valid = true;
        x = document.getElementsByClassName("tab");
        y = x[$scope.currentTab].getElementsByTagName("input");
        // A loop that checks every input field in the current tab:
        //Untuk check validasi kosong
        // for (i = 0; i < y.length; i++) {
        //     // If a field is empty...
        //     if (y[i].value == "") {
        //         // add an "invalid" class to the field:
        //         y[i].className += " is-invalid";
        //         // and set the current valid status to false
        //         valid = false;
        //     }
        // }

        // If the valid status is true, mark the step as finished and valid:
        if (valid) {
            document.getElementsByClassName("step")[$scope.currentTab].className +=
                " step-success";
        }
        $scope.submitData.period_id = 1;
        console.log($scope.submitData);
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
                    console.log(response);
                    $scope.data = response.data.data;
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