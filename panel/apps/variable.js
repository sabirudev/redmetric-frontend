app.factory("api_url", function () {
    return "https://apiredmetric.i-kuy.com/api/";
})

app.factory("base_url", function () {
    return "https://redmetric.i-kuy.com/panel/";
})

app.factory("roles", function (base_url) {
    return {
        user: function () {
            return base_url + "user/";
        },
        juri: function () {
            return base_url + "juri/";

        },
        superadmin: function () {
            return base_url + "superadmin/";

        }
    }
})

app.factory("session_set", function () {
    return {
        utoken: function (token) {
            sessionStorage.setItem("token", token);
        },
        uroles: function (roles) {
            sessionStorage.setItem("roles", roles);

        },
        udata: function (data) {
            sessionStorage.setItem("userdata", data);
        }
    }
})

app.factory("session_get", function () {
    return {
        utoken: function () {
            return sessionStorage.getItem("token");
        },
        uroles: function () {
            return sessionStorage.getItem("roles");

        },
        udata: function () {
            return sessionStorage.getItem("userdata");
        }
    }
})