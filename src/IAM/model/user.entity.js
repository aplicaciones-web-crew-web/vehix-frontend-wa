export class User {
    constructor({
                    id = 0,
                    name = '',
                    lastName = '',
                    email = '',
                    password = '',
                    phoneNumber = '',
                    dni = '',
                    gender='',
                    planId = 0
                } = {}) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.dni = dni;
        this.gender = gender;
        this.planId = planId;
    }
}
