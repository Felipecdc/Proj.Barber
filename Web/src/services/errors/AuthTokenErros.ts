export class AuthTokenErros extends Error{
    constructor(){
        super("Error with authenticated token.")
    }
}