import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getUserDetails(email) {
        let headers = new HttpHeaders({ 
            // "Content-Type": "application/json",
            Authorization: sessionStorage.getItem('token')
        });
        let options = {
            headers: headers
        }
        // let headers = new HttpHeaders({
        
        // });
        return this.httpClient.post<any>('http://localhost:8080/user-details', email, options).pipe(
            map(
                userData => {
                    sessionStorage.setItem('username', userData.username);
                    return userData;
                }
            )
        );
    }

}