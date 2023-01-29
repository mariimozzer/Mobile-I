//Validation Logic
jQuery.validator.addMethod("emailcheck",
    function (value, element) {
        var regexp = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regexp.test(value);
    });

jQuery.validator.addMethod("minMaxCheck",
    function (value, element) {
        if (value < 0 || value > 5) {
            return false;
        } else {
            return true;
        }
    });


function validate_frmAdd() {
    var form = $("#frmAdd");
    form.validate({
        rules: {
            txtName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            txtBusiness: {
                required: true,
                minlength: 2,
                maxlength: 5
            },
            txtEmail: {
                required: true,
                emailcheck: true
            },
            txtFood: {
                minMaxCheck: true
            },
            txtService: {
                minMaxCheck: true
            },
            txtValue: {
                minMaxCheck: true
            }
        },
        messages: {
            txtName: {
                required: "Please enter a Restaurant name",
                minlength: "Name must be at least 2 characters long",
                maxlength: "Name must can't be more than 20 characters"
            },
            txtBusiness: {
                required: "Please enter a Business ID",
                minlength: "Name must be at least 2 characters long",
                maxlength: "Name must can't be more than 5 characters"
            },
            txtEmail: {
                required: "Please enter a email",
                emailcheck: "Must be a valid email"
            },
            txtFood: {
                minMaxCheck: "Value must be 0-5"
            },
            txtService: {
                minMaxCheck: "Value must be 0-5"
            },
            txtValue: {
                minMaxCheck: "Value must be 0-5"
            }
        }
    });
    return form.valid();

}

function validate_frmModify() {
    var form = $("#frmModify");
    form.validate({
        rules: {
            txtModifyName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            txtModifyBusiness: {
                required: true,
                minlength: 2,
                maxlength: 5
            },
            txtModifyEmail: {
                required: true,
                emailcheck: true
            },
            txtModifyFood: {
                minMaxCheck: true
            },
            txtModifyService: {
                minMaxCheck: true
            },
            txtModifyValue: {
                minMaxCheck: true
            }
        },
        messages: {
            txtModifyName: {
                required: "Please enter a Restaurant name",
                minlength: "Name must be at least 2 characters long",
                maxlength: "Name must can't be more than 20 characters"
            },
            txtModifyBusiness: {
                required: "Please enter a Business ID",
                minlength: "Name must be at least 2 characters long",
                maxlength: "Name must can't be more than 5 characters"
            },
            txtModifyEmail: {
                required: "Please enter a email",
                emailcheck: "Must be a valid email"
            },
            txtModifyFood: {
                minMaxCheck: "Value must be 0-5"
            },
            txtModifyService: {
                minMaxCheck: "Value must be 0-5"
            },
            txtModifyValue: {
                minMaxCheck: "Value must be 0-5"
            }
        }

    });
    return form.valid();
}