class User {
    constructor(
        private readonly firstName: string,
        private readonly lastName: string,
        private readonly email: string,
        private readonly phone: string,
        private readonly resume: string, // will contain the name of the file
    ){}

    validate(){
        // validates the user's information
    }

    save() {
        // saves to mongodb
    };
};

export { User };
