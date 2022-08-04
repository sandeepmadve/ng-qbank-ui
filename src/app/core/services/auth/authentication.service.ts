import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private httpClient: HttpClient
    ) { }

    authenticate(username, password) {
        return this.httpClient.post<any>('http://localhost:8080/authenticate', {
            "username": username.value,
            "password": password.value
        }).pipe(
            map(
                userData => {
                    let tokenStr = 'Bearer ' + userData.jwtToken;  
                    sessionStorage.setItem('token', tokenStr);
                    return userData;
                }
            )
        );
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('username')
        console.log(!(user === null))
        return !(user === null)
    }

    logOut() {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
    }

}