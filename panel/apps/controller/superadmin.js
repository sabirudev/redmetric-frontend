app.controller("superadmin/sidebar", function ($scope, $rootScope, $routeParams, httpRequest, notification, $window, $location, session_break, session_get, session_check) {
    $scope.checkLSession = function () {
        if (session_get.uroles() != 1){
            $window.location = session_check.roles(session_get.uroles());
        }
    }
    $scope.checkLSession();

    $scope.logoutSession = function () {
        session_break.reset();
    }
    $scope.getClass = function (path) {
        return ($location.path() == path) ? 'active' : ''
    }

    $scope.isActive = function (routes) {
        return ($location.path() == routes) ? 'active' : ''
    }

    $scope.showSidebar = function (name) {
        console.log(name);
        if (name == "/panel/superadmin/") {
            $scope.sidebarContentUrl = "panel/pages/superadmin/dashboard.html";
        } else if (name == "/panel/superadmin/juri") {
            $scope.sidebarContentUrl = "panel/pages/superadmin/juri.html?v=2";
        } else if (name == "/panel/superadmin/vilagers") {
            $scope.sidebarContentUrl = "panel/pages/superadmin/user.html?v=4";
        }else if (name == "/panel/superadmin/admin") {
            $scope.sidebarContentUrl = "panel/pages/superadmin/admin.html?v=1";
        }else if (name == "/panel/superadmin/period") {
            $scope.sidebarContentUrl = "panel/pages/superadmin/periode.html?v=3";
        }
    };
    $scope.showSidebar($location.path());
});

app.controller("superadmin/home", function ($scope, $rootScope, $routeParams, httpRequest, notification) {

});

app.controller("superadmin/vilagers", function ($scope, $rootScope, $routeParams, httpRequest, notification, api_url, session_get) {
    $scope.index = 1;
    $scope.data = {};
    $scope.form={};
    $scope.getVillagers = function (index) {
        httpRequest
            .get(api_url + "admin/users", {
                "r": 2,
                "page": index
            }, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response);
                    $scope.data = response.data.data;
                    console.log($scope.data);
                } else {
                    notification.error("Email atau password salah");
                }
            });
    };
    $scope.getVillagers($scope.index);
    $scope.getActive = function (index) {
        if (index == $scope.index - 1)
            return 'active';
        else
            return ''
    };
    $scope.nextPage = function () {
        if ($scope.index < $scope.data.last_page)
            $scope.index += 1;
        $scope.getVillagers($scope.index);
    }
    $scope.prevPage = function () {
        if ($scope.index > 1)
            $scope.index -= 1;
        $scope.getVillagers($scope.index);
    }
    $scope.indexPage = function (index) {
        $scope.index = index;
        $scope.getVillagers($scope.index);
    }


    $scope.getData = function (index) {
        httpRequest
            .get(api_url + "admin/users/" + index, {}, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response);
                    $scope.dataUser = response.data.data;
                    console.log($scope.data);
                    $('#formEdit').modal('show');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }

    $scope.getDetail = function (index) {
        httpRequest
            .get(api_url + "admin/users/" + index, {}, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response);
                    $scope.dataUser = response.data.data;
                    console.log($scope.data);
                    $('#formDetail').modal('show');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
    $scope.tambahData = function () {
        $scope.form.role_id = "3";
        httpRequest
            .post(api_url + "admin/users", $scope.form, session_get.utoken())
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    $scope.getVillagers($scope.index);
                    $('#formAdd').modal('hide');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
    $scope.openAdd = function(){
        $('#formAdd').modal('show');
    }
    $scope.editData = function () {
        $scope.edit = {};
        $scope.edit.name = $scope.dataUser.name;
        $scope.edit.email = $scope.dataUser.email;
        httpRequest
            .put(api_url + "admin/users/" + $scope.dataUser.id, $scope.edit, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    notification.success("Sukses Edit data");
                    $scope.getVillagers($scope.index);
                    $('#formEdit').modal('hide');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
});

app.controller("superadmin/juri", function ($scope, $rootScope, $routeParams, httpRequest, notification, api_url, session_get) {
    $scope.index = 1;
    $scope.data = {};
    $scope.form={};
    $scope.getJuri = function (index) {
        httpRequest
            .get(api_url + "admin/users", {
                "r": 3,
                "page": index
            }, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response);
                    $scope.data = response.data.data;
                    console.log($scope.data);
                } else {
                    notification.error("Email atau password salah");
                }
            });
    };
    $scope.getJuri($scope.index);
    $scope.getActive = function (index) {
        if (index == $scope.index - 1)
            return 'active';
        else
            return ''
    };
    $scope.nextPage = function () {
        if ($scope.index < $scope.data.last_page)
            $scope.index += 1;
        $scope.getJuri($scope.index);
    }
    $scope.prevPage = function () {
        if ($scope.index > 1)
            $scope.index -= 1;
        $scope.getJuri($scope.index);
    }
    $scope.indexPage = function (index) {
        $scope.index = index;
        $scope.getJuri($scope.index);
    }


    $scope.getData = function (index) {
        httpRequest
            .get(api_url + "admin/users/" + index, {}, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response);
                    $scope.dataUser = response.data.data;
                    console.log($scope.data);
                    $('#formEdit').modal('show');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
    $scope.editData = function () {
        $scope.edit = {};
        $scope.edit.name = $scope.dataUser.name;
        $scope.edit.email = $scope.dataUser.email;
        httpRequest
            .put(api_url + "admin/users/" + $scope.dataUser.id, $scope.edit, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    notification.success("Sukses Edit data");
                    $scope.getJuri($scope.index);
                    $('#formEdit').modal('hide');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
    $scope.tambahData = function () {
        $scope.form.role_id = "3";
        httpRequest
            .post(api_url + "admin/users", $scope.form, session_get.utoken())
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    $scope.getJuri($scope.index);
                    $('#formAdd').modal('hide');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
    $scope.openAdd = function(){
        $('#formAdd').modal('show');
    }
});

app.controller("superadmin/admin", function ($scope, $rootScope, $routeParams, httpRequest, notification, api_url, session_get) {
    $scope.index = 1;
    $scope.data = {};
    $scope.form={};
    $scope.getAdmin = function (index) {
        httpRequest
            .get(api_url + "admin/users", {
                "r": 1,
                "page": index
            }, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response);
                    $scope.data = response.data.data;
                    console.log($scope.data);
                } else {
                    notification.error("Email atau password salah");
                }
            });
    };
    $scope.getAdmin($scope.index);
    $scope.getActive = function (index) {
        if (index == $scope.index - 1)
            return 'active';
        else
            return ''
    };
    $scope.nextPage = function () {
        if ($scope.index < $scope.data.last_page)
            $scope.index += 1;
        $scope.getAdmin($scope.index);
    }
    $scope.prevPage = function () {
        if ($scope.index > 1)
            $scope.index -= 1;
        $scope.getAdmin($scope.index);
    }
    $scope.indexPage = function (index) {
        $scope.index = index;
        $scope.getAdmin($scope.index);
    }


    $scope.getData = function (index) {
        httpRequest
            .get(api_url + "admin/users/" + index, {}, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response);
                    $scope.dataUser = response.data.data;
                    console.log($scope.data);
                    $('#formEdit').modal('show');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
    $scope.tambahData = function () {
        $scope.form.role_id = "1";
        httpRequest
            .post(api_url + "admin/users", $scope.form, session_get.utoken())
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    $scope.getAdmin($scope.index);
                    $('#formAdd').modal('hide');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
    $scope.openAdd = function(){
        $('#formAdd').modal('show');
    }

    $scope.editData = function () {
        $scope.edit = {};
        $scope.edit.name = $scope.dataUser.name;
        $scope.edit.email = $scope.dataUser.email;
        httpRequest
            .put(api_url + "admin/users/" + $scope.dataUser.id, $scope.edit, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    notification.success("Sukses Edit data");
                    $scope.getAdmin($scope.index);
                    $('#formEdit').modal('hide');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
});

app.controller("superadmin/submission", function ($scope, $rootScope, $routeParams, httpRequest, notification) {

});

app.controller("superadmin/periode", function ($scope, $rootScope, $routeParams, httpRequest, notification, api_url, session_get) {
    $scope.index = 1;
    $scope.data = {};
    $scope.form={};
    $scope.getPeriode = function (index) {
        httpRequest
            .get(api_url + "admin/periods", {
                "page": index
            }, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response);
                    $scope.data = response.data.data;
                    console.log($scope.data);
                } else {
                    notification.error("Email atau password salah");
                }
            });
    };
    $scope.getPeriode($scope.index);
    $scope.getActive = function (index) {
        if (index == $scope.index - 1)
            return 'active';
        else
            return ''
    };
    $scope.nextPage = function () {
        if ($scope.index < $scope.data.last_page)
            $scope.index += 1;
        $scope.getPeriode($scope.index);
    }
    $scope.prevPage = function () {
        if ($scope.index > 1)
            $scope.index -= 1;
        $scope.getPeriode($scope.index);
    }
    $scope.indexPage = function (index) {
        $scope.index = index;
        $scope.getPeriode($scope.index);
    }


    $scope.getData = function (index) {
        httpRequest
            .get(api_url + "admin/periods/" + index, {}, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response);
                    $scope.dataUser = response.data.data;
                    console.log($scope.data);
                    $('#formEdit').modal('show');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
    $scope.tambahData = function () {
        httpRequest
            .post(api_url + "admin/periods", $scope.form, session_get.utoken())
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    $scope.getPeriode($scope.index);
                    $('#formAdd').modal('hide');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
    $scope.openAdd = function(){
        $('#formAdd').modal('show');
    }

    $scope.editData = function () {
        $scope.edit = {};
        $scope.edit.name = $scope.dataUser.name;
        $scope.edit.email = $scope.dataUser.email;
        httpRequest
            .put(api_url + "admin/periods/" + $scope.dataUser.id, $scope.edit, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    notification.success("Sukses Edit data");
                    $scope.getPeriode($scope.index);
                    $('#formEdit').modal('hide');
                } else {
                    notification.error("Email atau password salah");
                }
            });
    }
});


app.directive("formatDate", function(){
    return {
     require: 'ngModel',
      link: function(scope, elem, attr, modelCtrl) {
        modelCtrl.$formatters.push(function(modelValue){
          return new Date(modelValue);
        })
      }
    }
  })