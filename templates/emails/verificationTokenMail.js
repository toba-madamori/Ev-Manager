class VerificationTokenMail {
    constructor(email,  user, token) {
        this.email = email;
        this.body = "";
        this.subject = 'Confirm Your Email';
        this.user = user;
        this.token = token;
        this.template = "default"
    }

    setBody() {
        this.body = {
            body: {
                title: `Hi ${this.user.firstName}`,
                intro: [
                    `Use this token to verify your account <strong>${this.token}</strong>.
                        <br>
                        Token expires in 15 minutes`
                ]
            }
        }

        return this.body;
    }

}

module.exports= VerificationTokenMail
