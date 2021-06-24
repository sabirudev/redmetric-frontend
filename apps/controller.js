app.controller("landingpage", function ($scope, $http, httpRequest, notification) {
    $scope.submitData = function () {
        console.log($scope.form);
        httpRequest.post('https://apimustika.xiaomigamesgift.com/api/v1/register', $scope.form)
            .then(function (response) {
                console.log(response);
                if (response.data.status == "success") {
                    notification.success("Voucher sudah dikirim, silahkan cek email anda");
                    $scope.form = {};
                    // location.reload(true);
                } else {
                    notification.error(response.data.message);
                }
            });
    };
});