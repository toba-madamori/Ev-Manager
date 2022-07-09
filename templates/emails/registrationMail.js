class RegistrationMail {
    constructor(email, link) {
        this.email = email;
        this.body = "";
        this.subject = 'Welcome to Ev-Manager';
        this.link = link;
        this.template = "default"
    }

    setBody() {
        this.body = {
            body: {
                title: `Hi`,
                intro: [
                    "Welcome to Ev-Manager !  We're very excited to have you join us.",
                    `Just one more step to complete your Ev-Manager registration, use this link to verify your account <strong>${this.link}</strong>
                        <br>
                        Link expires in 1 day`
                ]
            }
        }

        return this.body;
    }

}

module.exports= RegistrationMail
