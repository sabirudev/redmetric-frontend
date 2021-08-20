app.controller("login", function ($scope, $rootScope, $routeParams, httpRequest, notification, session_set, api_url, $window, session_check, session_get) {
    $scope.checkLSession = function () {
        if (session_get.uroles() != null) {
            $window.location = session_check.roles(session_get.uroles());
        }
    }
    $scope.checkLSession();

    $scope.login = function () {
        httpRequest
            .post(api_url + "membership/login", $scope.form)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.data = response.data.data;
                    session_set.utoken($scope.data.token);
                    session_set.udata($scope.data.user);
                    session_set.uroles($scope.data.user.role_id);

                    if ($scope.data.user.role_id == 1) {
                        $window.location.href = '/panel/superadmin';
                    } else if ($scope.data.user.role_id == 2) {
                        $window.location.href = '/panel/user';
                    } else if ($scope.data.user.role_id == 3) {
                        $window.location.href = '/panel/juri';
                    } else {
                        $window.location.href = '/panel';
                    }
                } else {
                    notification.error("Email atau password salah");
                }
            });
    };
});

app.controller("register", function ($scope, $rootScope, $routeParams, httpRequest, notification, base_url, api_url, $window, session_set, session_get) {
    $scope.checkLSession = function () {
        if (session_get.uroles() != null) {
            $window.location = session_check.roles(session_get.uroles());
        }
    }
    $scope.checkLSession();
    $scope.data = {};

    $scope.register = function () {
        httpRequest
            .post(api_url + "membership/register", $scope.form)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.data = response.data.data
                    session_set.utoken($scope.data.token);
                    $('#modalRegister').modal('show');
                } else {
                    notification.error(response.data.message);
                }
            });
    };
    $scope.url = function (url) {
        httpRequest
            .get(api_url + "membership", {}, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    $scope.data = response.data.data
                    session_set.udata($scope.data);
                    session_set.uroles($scope.data.role_id);
                    $window.location.href = url;
                } else {
                    notification.error(response.data.message);
                }
            });
    };

});

app.controller("forgotpassword", function ($scope, $rootScope, $routeParams, httpRequest, notification, $window, api_url) {
    $scope.checkLSession = function () {
        if (session_get.uroles() != null) {
            $window.location = session_check.roles(session_get.uroles());
        }
    }
    $scope.checkLSession();
    $scope.forgetPassword = function () {
        httpRequest
            .post(api_url + "membership/reset", $scope.form)
            .then(function (response) {
                if (response.status == 200) {
                    $('#modalForgot').modal('show');
                } else {
                    notification.error(response.data.message);
                }
            });
    };
    $scope.url = function (url) {
        $window.location.href = url;
    };
});