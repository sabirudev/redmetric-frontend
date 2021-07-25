<!DOCTYPE html>
<html ng-app="panel">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redmetric Panel</title>
    <link rel="icon" href="/public/assets/favicon.ico" type="image/x-icon" />

    <script>
        // // api url
        // const api_url =
        //     "https://apiredmetric.i-kuy.com/api/v1/version";

        // // Defining async function
        // async function getapi(url) {

        //     // Storing response
        //     const response = await fetch(url);

        //     // Storing data in form of JSON
        //     var data = await response.json();
        //     console.log(data);
        //     $("#versionapp").attr("src", "/panel/apps/app.js" + "?v=" + data.version);
        //     $("#versioncontroller").attr("src", "/panel/apps/controller.js" + "?v=" + data.version);
        // }
        // // Calling that async function
        // getapi(api_url);
    </script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular-route.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-sanitize/1.7.8/angular-sanitize.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ng-meta/1.0.3/ngMeta.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.js"></script>

    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/css/select2.min.css" />


    <link rel="stylesheet" href="/panel/public/assets/css/bootstrap.css">
    <link rel="stylesheet" href="/panel/public/assets/vendors/perfect-scrollbar/perfect-scrollbar.css">
    <link rel="stylesheet" href="/panel/public/assets/css/app.css">
    <link rel="stylesheet" href="/panel/public/assets/css/custom.css">
    <link rel="stylesheet" href="/panel/public/assets/vendors/bootstrap-icons/bootstrap-icons.css">
    <link rel="stylesheet" href="/panel/public/assets/css/pages/auth.css">


    <base href="/panel ">



    <!-- <script src="/public/assets/js/select2.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/js/select2.min.js"></script>

    <script src="/panel/apps/app.js" id="versionapp"></script>
    <script src="/panel/apps/controller.js" id="versioncontroller"></script>
    <script src="/panel/apps/variable.js" id="versioncontroller"></script>
    <script src="/panel/apps/controller/auth.js" id="versioncontroller"></script>
    <script src="/panel/apps/controller/juri.js" id="versioncontroller"></script>
    <script src="/panel/apps/controller/user.js?v=0" id="versioncontroller"></script>
    <script src="/panel/apps/controller/superadmin.js" id="versioncontroller"></script>
    <!-- <link rel="stylesheet" href="/public/assets/css/custom.css?v=123" /> -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.css" rel="stylesheet">



    <!-- Bootstrap -->
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous" /> -->
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous">
    </script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>


    <script src="/panel/public/assets/vendors/fontawesome/all.min.js"></script>
    <script src="/panel/public/assets/vendors/simple-datatables/simple-datatables.js"></script>
    <script src="/panel/public/assets/vendors/apexcharts/apexcharts.js"></script>


</head>

<body>
    <div id="app">
        <ng-view></ng-view>
    </div>

    <script src="/panel/public/assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js"></script>
    <script src="/panel/public/assets/js/bootstrap.bundle.min.js"></script>
    <script src="/panel/public/assets/js/main.js"></script>

</body>

</html>