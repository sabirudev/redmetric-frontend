app.controller("user/navbar", function ($scope, urls, $routeParams, httpRequest, notification, roles, $location, session_check, $window, session_get, session_break) {
    $scope.checkLSession = function () {
        if ($window.location.href != session_check) {
            console.log($window.location.href);
            console.log(session_get.uroles());

            $window.location.href = session_check;
        }
    }
    console.log(urls);
    // $scope.checkLSession();

    $scope.logoutSession = function () {
        session_break.reset();
    }

    $scope.getClass = function (path) {
        return ($location.path() == path) ? 'active' : ''
    }

    $scope.showSidebar = function (name) {
        if (name == "/panel/user") {
            $scope.sidebarContentUrl = "panel/pages/user/dashboard.html?v=2";
        } else if (name == "/panel/user/submission") {
            $scope.sidebarContentUrl = "panel/pages/user/submission.html?v=7";
        } else if (name == "/panel/user/profile") {
            $scope.sidebarContentUrl = "panel/pages/user/profile.html?v=10";
        }
    };
    $scope.showSidebar($location.path());
});

app.controller("user/home", function ($scope, $rootScope, $routeParams, httpRequest, notification, $window, api_url, session_get, session_break) {
    $scope.logoutSession = function () {
        session_break.reset();
    }

    $scope.checkData = function () {
        httpRequest
            .get(api_url + "user/villages", {}, session_get.utoken())
            .then(function (response) {
                // console.log(response.data.data);
                if (response.status == 200) {
                    $scope.villageData = response.data.data;
                    if ($scope.villageData.village == null)
                        $('#modalProfile').modal('show');
                    else{
                            httpRequest.get(api_url + "user/submissions", {}, session_get.utoken()).then(function (response) {
                                if (response.status == 200) {
                                    if(response.data.status == 'success'){
                                        $window.location.href = '/panel/user/questionnaire'
                                    }else{
                                        $('#modalPeriod').modal('show');
                                    }
                                } else {
                                }
                            });

                    }

                }
            });
    };

    $scope.url = function (urlData) {
        $window.location.href = urlData;
    }

});

app.controller("user/submission", function ($scope, $rootScope, $routeParams, httpRequest, notification, session_break, $window, api_url, session_get) {
    $scope.logoutSession = function () {
        session_break.reset();
    }
    $scope.getData = function () {
        httpRequest
            .get(api_url + "user/submissions/my/index", {}, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    $scope.dataSubmission = response.data.data;
                    console.log($scope.dataSubmission);
                }
            });
    };
    $scope.getData();
});

app.controller("user/profile", function ($scope, $rootScope, $routeParams, httpRequest, notification, api_url, session_get, $filter, session_break, $http) {
    $scope.logoutSession = function () {
        location.replace(session_break.reset());
    }
    $scope.profileMember = function () {
        httpRequest
            .get(api_url + "membership", {}, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    $scope.dataMember = response.data.data;
                    // console.log($scope.dataMember);
                }
            });
    };
    $scope.profileMember();
    $scope.dataDesa = {};
    $scope.village = {};
    $scope.dataDesaGet = function () {
        httpRequest
            .get(api_url + "user/villages", {}, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    $scope.dataDesa = response.data.data;
                    if ($scope.dataDesa.village != null) {
                        $scope.village = $scope.dataDesa.village;
                    }
                    console.log($scope.dataDesa);
                }
            });
    }
    $scope.dataDesaGet();
    $scope.getKTP ={};
    $scope.getProfileUser = function () {
        httpRequest
            .get(api_url + "membership", {}, session_get.utoken())
            .then(function (response) {
                if (response.status == 200) {
                    $scope.getKTP = response.data.data.membership.identities[0];
                    console.log($scope.getKTP);
                }
            });
    }
    $scope.getProfileUser();
    $scope.documentKTP = function () {
        $http({
            headers: {
                Authorization: "Bearer " + session_get.utoken(),
                Accept: "application/json",
            },
            method: 'GET',
            url: api_url + "membership/preview-identity/"+$scope.getKTP.id,
            responseType: 'arraybuffer'
          }).then(function(response) {
            console.log(response);
            var str = _arrayBufferToBase64(response.data);
            console.log(str);
            var image = new Image();
            image.src = "data:image/jpg;base64," + str;
            var w = window.open("");
            w.document.write(image.outerHTML);
            // str is base64 encoded.
          }, function(response) {
            console.error('error in getting static img.');
          });
    }

    $scope.documentST = function () {
        $http({
            headers: {
                Authorization: "Bearer " + session_get.utoken(),
                Accept: "application/json",
            },
            method: 'GET',
            url: api_url + "membership/preview-identity/"+$scope.profileData.id,
            responseType: 'arraybuffer'
          }).then(function(response) {
            console.log(response);
            var str = _arrayBufferToBase64(response.data);
            console.log(str);
            var image = new Image();
            image.src = "data:image/jpg;base64," + str;
            var w = window.open("");
            w.document.write(image.outerHTML);
            // str is base64 encoded.
          }, function(response) {
            console.error('error in getting static img.');
          });
    }

    function _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }

    $scope.uploadKTP = function () {
        console.log('jalan');
        $("#uploadKTP").on("submit", function () {
            console.log('jalan');
            form = new FormData(this);
            form.append("identity[0][type]", "ktp");
            form.append('identity[0][document]', $('input[type=file]')[0].files[0]);
            jqXHR = $.ajax({
                url: api_url + "membership/update",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + session_get.utoken(),
                },
                data: form,
                async: false,
                processData: false,
                contentType: false,
                dataType: "application/json",
            });
            data = JSON.parse(jqXHR.responseText);
            console.log(jqXHR.status);

            if (jqXHR.status == 200) {
                //   $scope.getInvoice();
                notification.success("Berhasil upload KTP");
            } else {
                notification.error("Silahkan coba kembali upload");
            }
        });
    }

    $scope.uploadST = function () {
        $("#uploadST").on("submit", function () {
            form = new FormData(this);
            form.append("identity[0][type]", "surat_tugas");
            form.append('identity[0][document]', $('input[type=file]')[0].files[0]);
            jqXHR = $.ajax({
                url: api_url + "membership/update",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + session_get.utoken(),
                },
                data: form,
                async: false,
                processData: false,
                contentType: false,
                dataType: "application/json",
            });
            data = JSON.parse(jqXHR.responseText);
            console.log(jqXHR.status);

            if (jqXHR.status == 200) {
                //   $scope.getInvoice();
                notification.success("Berhasil upload surat tugas");
            } else {
                notification.error("Silahkan coba kembali upload");
            }
        });
    }



    $scope.updateDesa = function () {
        // console.log($scope.dataDesa);
        $scope.village.since = $filter('date')($scope.village.since, "yyyy-MM-dd")
        if ($scope.dataDesa.village != null) {
            httpRequest.put(api_url + "user/villages/" + $scope.village.id, $scope.village, session_get.utoken()).then(function (response) {
                // console.log(response);
                // console.log($scope.village);
                if (response.status == 200) {
                    $scope.dataDesaGet();
                    notification.success("sukses updating data");
                } else {

                    notification.error("Ada masalah dalam jaringan coba lagi nanti");
                }
            });
        } else {
            httpRequest.post(api_url + "user/villages", $scope.village, session_get.utoken()).then(function (response) {
                // console.log(response);
                // console.log($scope.village);
                if (response.status == 200) {
                    $scope.dataDesaGet();
                    notification.success("sukses updating data");
                } else {

                    notification.error("Ada masalah dalam jaringan coba lagi nanti");
                }
            });

        }
    }

    $scope.updateProfile = function () {
        httpRequest.post(api_url + "membership/update", $scope.dataMember.membership, session_get.utoken()).then(function (response) {
            console.log(response);
            console.log($scope.village);
            if (response.status == 200) {
                $scope.dataDesaGet();
                notification.success("sukses updating data");
            } else {

                notification.error("Ada masalah dalam jaringan coba lagi nanti");
            }
        });
    }
});

app.controller("user/questionnaire/thank-you", function ($scope, $rootScope, $routeParams, httpRequest, notification) {
    // TODO
    const today = new Date()
    const nextDay = new Date()
    const dueDate = new Date(nextDay.setDate(today.getDate() + 15))
    const opened = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`
    const closed = `${dueDate.getFullYear()}/${dueDate.getMonth()}/${dueDate.getDate()}`
    $scope.period = {
        ...{
            opened,
            closed
        }
    }
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
                    const { data: items } = response.data
                    $scope.questionData = items;
                    $scope.submitData.submissions = items.map(item => ({
                        indicator_id: item.indicator_id,
                        indicator_input_id: item.id,
                        value: parseInt(item.value)
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
    $scope.fixStepIndicator(0);

    $scope.showTab = function (n) {
        // This function will display the specified tab of the form...
        if(n==0){
            var x = document.getElementsByClassName("tab");
            x[n].style.display = "block";
        }
        //... and fix the Previous/Next buttons:
        if (n == 0 || n == 1) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        if (n <= 5) {
            document.getElementById("nextBtn").innerHTML = "Lanjut";
            document.getElementById("prevBtn").innerHTML = "Kembali";
        } else {
            document.getElementById("nextBtn").innerHTML = "Selesai";
        }
        //... and run a function that will display the correct step indicator:
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
        // $scope.currentTab = nextPage
        $scope.getQuisioner(nextPage);
        console.log($scope.currentTab);
        $scope.showTab(nextPage);
    };

    function validateForm() {
        const valid = true
        if ($scope.currentTab <= 5) {

            if ($scope.currentTab === 0) {
                document.getElementsByClassName("step")[$scope.currentTab].className +=
                    " step-success";
                document.getElementsByClassName("step")[$scope.currentTab+1].className +=
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
                // console.log(response);
                if (response.status == 200) {
                    $scope.data = response.data.data;
                    // if you have reached the end of the form...
                    if ($scope.currentTab > 6) {
                        // ... the form gets submitted:
                        $scope.updateToPublish($scope.data.id);
                    }
                } else {
                    notification.error(response.data.message);
                }
            });
    };

    $scope.updateToPublish = function(id){
        httpRequest
        .put(api_url + "user/submissions/"+id,{}, session_get.utoken())
        .then(function (response) {
            // console.log(response);
            if (response.status == 200) {
                $scope.data = response.data.data;
                    // ... the form gets submitted:
                    window.location.href = '/panel/user/questionnaire/thank-you'
            } else {
                notification.error(response.data.message);
            }
        });
    }

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