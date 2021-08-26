app.factory("api_url", function (urls) {
    return urls.apiUrl;
})

app.factory("base_url", function (urls) {
    return urls.baseUrl;
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
            sessionStorage.setItem("userdata", JSON.stringify(data));
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
            return JSON.parse(sessionStorage.getItem("userdata"));
        }
    }
})

app.factory("session_break", function (httpRequest, session_get, api_url) {
    return {
        reset: function () {
            httpRequest.get(api_url + 'membership/logout', {}, session_get.utoken()).then(function (response) {
                if (response.status == 200) {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("roles");
                    sessionStorage.removeItem("userdata");
                    return location.replace("/panel");
                } else {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("roles");
                    sessionStorage.removeItem("userdata");
                    return location.replace("/panel");
                }
            })
        }
    }
});

app.service("session_check", function (urls, session_break) {
    return {
        roles: function (index) {
                if (index == 1) {
                    return urls.baseUrl + "superadmin";
                } else if (index == 2) {
                    return urls.baseUrl + "user";
                } else if (index == 3) {
                    return urls.baseUrl + "juri";
                }else{
                   return urls.baseUrl;
                }
            }
        }
});