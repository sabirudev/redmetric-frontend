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

app.factory("session_break", function (httpRequest, session_get, api_url) {
    return {
        reset: function () {
            httpRequest.get(api_url + 'membership/logout', {}, session_get.utoken()).then(function (response) {
                if (response.status == 200) {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("roles");
                    sessionStorage.removeItem("userdata");
                    return location.replace("/panel");
                }
            })
        }
    }
})

app.factory("session_check", function (urls) {
    if (sessionStorage.getItem("roles") != null) {
        if (sessionStorage.getItem("roles") == 1) {
            return `${urls.baseUrl}/panel/superadmin`;

        } else if (sessionStorage.getItem("roles") == 2) {
            return `${urls.baseUrl}/panel/user`;

        } else if (sessionStorage.getItem("roles") == 3) {
            return `${urls.baseUrl}/panel/juri`;

        }
    } else {
        return `${urls.baseUrl}/panel`;
    }
})