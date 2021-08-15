app.controller("juri/sidebar", function ($scope, $rootScope, $routeParams, httpRequest, notification, $window, $location, session_get, session_check) {
    $scope.checkLSession = function () {
        if (session_get.uroles() != 3){
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
        console.log(name);
        // if (name == "/panel/juri/") {
        //     $scope.sidebarContentUrl = "panel/pages/juri/dashboard.html";
        // } else
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
                    console.log(response.data.data.data);
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
                    console.log(response.data);
                    $scope.questionData = response.data;
                }
            });
    }
    $scope.getDetailSubsmission($scope.index);
});



// app.controller("questionnaire", function ($scope, $rootScope, $routeParams, httpRequest, notification, base_url) {
//     $scope.questionData = {};

//     $scope.currentTab = 0; // Current tab is set to be the first tab (0)
//     $scope.getQuisioner = function (index) {
//         httpRequest
//             .get(base_url + "user/submissions", {
//                 page: index
//             })
//             .then(function (response) {
//                 if (response.data.status == 'success') {
//                     $scope.questionData = response.data.data[0];
//                     console.log($scope.questionData);
//                 }
//             })
//     };
//     $scope.getQuisioner($scope.currentTab + 1);


//     $scope.fixStepIndicator = function (n) {
//         // This function removes the "active" class of all steps...
//         var i,
//             x = document.getElementsByClassName("step");
//         for (i = 0; i < x.length; i++) {
//             x[i].className = x[i].className.replace(" step-active", "");
//         }
//         //... and adds the "active" class on the current step:
//         x[n].className += " step-active";
//     }

//     $scope.showTab = function (n) {
//         // This function will display the specified tab of the form...
//         var x = document.getElementsByClassName("tab");
//         x[n].style.display = "block";
//         //... and fix the Previous/Next buttons:
//         if (n == 0) {
//             document.getElementById("prevBtn").style.display = "none";
//         } else {
//             document.getElementById("prevBtn").style.display = "inline";
//         }
//         if (n == x.length - 1) {
//             document.getElementById("nextBtn").innerHTML = "Submit";
//         } else {
//             document.getElementById("nextBtn").innerHTML = "Next";
//         }
//         //... and run a function that will display the correct step indicator:
//         $scope.fixStepIndicator(n);
//     }

//     $scope.showTab($scope.currentTab); // Display the current tab

//     $scope.nextPrev = function (n) {
//         // This function will figure out which tab to display
//         var x = document.getElementsByClassName("tab");
//         // Exit the function if any field in the current tab is invalid:
//         if (n == 1 && !validateForm()) return false;
//         // Hide the current tab:
//         x[$scope.currentTab].style.display = "none";
//         // Increase or decrease the current tab by 1:
//         $scope.currentTab = $scope.currentTab + n;
//         // if you have reached the end of the form...
//         if ($scope.currentTab >= x.length) {
//             // ... the form gets submitted:
//             document.getElementById("regForm").submit();
//             return false;
//         }
//         // Otherwise, display the correct tab:
//         $scope.showTab($scope.currentTab);

//         $scope.getQuisioner($scope.currentTab + 1);
//     };

//     function validateForm() {
//         // This function deals with validation of the form fields
//         var x,
//             y,
//             i,
//             valid = true;
//         x = document.getElementsByClassName("tab");
//         y = x[$scope.currentTab].getElementsByTagName("input");
//         // A loop that checks every input field in the current tab:
//         for (i = 0; i < y.length; i++) {
//             // If a field is empty...
//             if (y[i].value == "") {
//                 // add an "invalid" class to the field:
//                 y[i].className += " is-invalid";
//                 // and set the current valid status to false
//                 valid = false;
//             }
//         }
//         // If the valid status is true, mark the step as finished and valid:
//         if (valid) {
//             document.getElementsByClassName("step")[$scope.currentTab].className +=
//                 " step-success";
//         }
//         return valid; // return the valid status
//     }
// });


// app.controller("NavbarUser", function ($scope, $location) {
//     $scope.isActive = function (viewLocation) {
//         return viewLocation === $location.path();
//     };
// });

// app.controller("list-kuisioner", function () {});