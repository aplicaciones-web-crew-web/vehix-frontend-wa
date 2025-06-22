export class User {
    constructor({
                    id = 0,
                    name = '',
                    lastname = '',
                    email = '',
                    passwordHash = '',
                    phoneNumber = '',
                    dni = '',
                    gender='',
                    planId = 0,
                    roleId = 0
                } = {}) {
        this.id = id;
        this.name = name;
        this.lastName = lastname;
        this.email = email;
        this.password = passwordHash;
        this.phoneNumber = phoneNumber;
        this.dni = dni;
        this.gender = gender;
        this.planId = planId;
        this.roleId = roleId;
    }
}
