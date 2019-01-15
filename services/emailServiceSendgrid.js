import sendgridMail from '@sendgrid/mail';
import sendgridCreds from '../properties/sendgrid';
import frontEndUrls from '../properties/frontEndUrls';

sendgridMail.setApiKey(sendgridCreds.apiKey);

export default {
    emailAdminWelcomeInstructions(email, name, token) {
        // setup email data
        let mailOptions = {
            from: '"Veniqa Support" <support@veniqa.com>', // sender address
            to: email, // list of receivers
            subject: 'Veniqa - Admin Onboarding Instructions', // Subject line
            html: '<b>Hi </b>' +  name + '<br>Thanks for joining Veniqa as an admin. <br> Before you can login, please click the link below to reset your login password<br><br><button><a href="' + frontEndUrls.passwordResetBaseUrl + '/' + token + '">Reset Password</a></button><br><br>Once you reset your password, you will be redirected to the login page.',
            templateId: sendgridCreds.templates.confirm_account_admin,
            dynamic_template_data: {
                name: name,
                confirm_account_admin_url: frontEndUrls.passwordResetBaseUrl + '/' + token
            }
        };

        this.triggerEmail(mailOptions);
    },

    emailPasswordResetInstructions(email, name, token) {
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Veniqa Support" <support@veniqa.com>', // sender address
            to: email, // list of receivers
            subject: 'Veniqa - Password Reset', // Subject line
            html: '<b>Hi </b>' +  name + '<br>Please click the link below to reset your password<br><br><button><a href="' + frontEndUrls.passwordResetBaseUrl + '/' + token + '">Reset Password</a></button>',
            templateId: sendgridCreds.templates.reset_password_admin,
            dynamic_template_data: {
                name: name,
                reset_password_admin_url: frontEndUrls.passwordResetBaseUrl + '/' + token
            }
        };

        this.triggerEmail(mailOptions);
    },

    emailPasswordResetConfirmation(email, name) {
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Veniqa Support 👾" <support@veniqa.com>', // sender address
            to: email, // list of receivers
            subject: 'Veniqa - Password Reset Successful', // Subject line
            html: '<b>Hi </b>' +  name + '<br>Your password has been successfully reset.<br><br>',
            templateId: sendgridCreds.templates.confirmation_password_reset_admin,
            dynamic_template_data: {
                name: name
            }
        };

        this.triggerEmail(mailOptions);
    },

    triggerEmail(mailOptions) {
        sendgridMail.send(mailOptions, (error, result) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', JSON.stringify(result));
        });
    }
}