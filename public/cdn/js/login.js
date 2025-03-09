function doLogin() {
    $('#loginForm').formValidation({
        framework: "bootstrap4",
        button: {
            selector: '#loginSubmit',
            disabled: 'disabled'
        },
        icon: null,
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: LANG['username_error']
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: LANG['password_error']
                    }
                }
            }
        },
        err: {
            clazz: 'invalid-feedback'
        },
        control: {
            valid: 'is-valid',
            invalid: 'is-invalid'
        },
        row: {
            invalid: 'has-danger'
        }
    }).on('success.form.fv', function(e) {
        e.preventDefault();
        var username = $("#username").val();
        if(!isEmail(username)) {
            if(!username.startsWith("0")) {
                var pos = "toast-bottom-right";
                if(LANG["rtl"]) {
                    pos = "toast-bottom-left";
                }
                var options = {
                    "closeButton": true,
                    "timeOut": "2000",
                    "positionClass": pos,
                };
                options['rtl'] = LANG['rtl'];
                toastr.options = options;
                toastr.error(LANG["mobile_error"], LANG["wrong_title"]);
                return  false;
            }
        }
        $.ajax({
            method: "POST",
            url: url+"doLogin",
            data: {
                username: $("#username").val(),
                password: $("#password").val(),
                remember: $('#remember').is(':checked')
            }
        }).done(function( data ) {
            toastr.options = {
                "timeOut": "20000",
                "positionClass": "toast-top-center",
                "rtl": LANG['rtl']
            };
            if(data.status) {
                toastr.success(data.msg);
                let ai = _getCookie('apt-ai-app-generate');
                if(ai != '' && ai != null) {
                    document.location.href = url + 'generate-from-ai-data';
                }
                else {
                    document.location.href = url;
                }
            }
            else {
                toastr.error(data.msg);
            }
        }).fail(function() {
            toastr.options = {
                "timeOut": "20000",
                "positionClass": "toast-top-center",
                "rtl": LANG['rtl']
            };
            toastr.error(LANG['global_error']);
        }).always(function() {
            $("#loginSubmit").removeClass('disabled');
            $("#loginSubmit").removeAttr('disabled');
        });

    });
}

var mfTimer;
var fcanClose = false;
function fTimer(duration, display) {
    var timer = duration, minutes, seconds;
    mfTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
            $(".btn-default.disabled").removeClass('disabled');
            fcanClose = true;
            clearInterval(mfTimer);
        }
    }, 1000);
}

function doSignup() {
    $('#signupForm').formValidation({
        framework: "bootstrap4",
        button: {
            selector: '#signupSubmit',
            disabled: 'disabled'
        },
        icon: null,
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: LANG['write_app_name']
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: LANG['email_empty_error']
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: LANG['password_error']
                    },
                    stringLength: {
                        min: 8,
                        message: LANG['password_error_length']
                    }
                }
            }
        },
        err: {
            clazz: 'invalid-feedback'
        },
        control: {
            valid: 'is-valid',
            invalid: 'is-invalid'
        },
        row: {
            invalid: 'has-danger'
        }
    }).on('success.form.fv', function(e) {
        e.preventDefault();
        var email = $("#email").val();
        let rules = $('#remember').is(':checked');
        if(!rules) {
            var pos = "toast-bottom-right";
            if(LANG["rtl"]) {
                pos = "toast-bottom-left";
            }
            var options = {
                "closeButton": true,
                "timeOut": "2000",
                "positionClass": pos,
            };
            options['rtl'] = LANG['rtl'];
            toastr.options = options;
            toastr.error("لطفا قوانین را قبول کنید", LANG["wrong_title"]);
            return  false;
        }
        if(!isEmail(email)) {
            if(!email.startsWith("0")) {
                var pos = "toast-bottom-right";
                if(LANG["rtl"]) {
                    pos = "toast-bottom-left";
                }
                var options = {
                    "closeButton": true,
                    "timeOut": "2000",
                    "positionClass": pos,
                };
                options['rtl'] = LANG['rtl'];
                toastr.options = options;
                toastr.error(LANG["mobile_error"], LANG["wrong_title"]);
                return  false;
            }
        }
        $.ajax({
            method: "POST",
            url: url+"install-app",
            data: {
                name: $("#name").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                remember: $('#remember').is(':checked')
            }
        }).done(function( data ) {
            toastr.options = {
                "timeOut": "20000",
                "positionClass": "toast-top-center",
                "rtl": LANG['rtl']
            };
            if(data.status) {
                toastr.success(data.msg);
                if(data.status) {
                    document.location.href = url;
                }
            }
            else {
                toastr.error(data.msg);
            }
        }).fail(function() {
            toastr.options = {
                "timeOut": "20000",
                "positionClass": "toast-top-center",
                "rtl": LANG['rtl']
            };
            toastr.error(LANG['global_error']);
        }).always(function() {
            $("#signupSubmit").removeClass('disabled');
            $("#signupSubmit").removeAttr('disabled');
        });

    });
}

function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function _setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function _getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}