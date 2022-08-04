import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { AuthenticationService } from '../core/services/auth/authentication.service';
import { AuthenticationService } from '@app/_services/authentication.service';
import { RestApiService } from '../core/services/rest-api.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    invalidSignin = false;
    signinForm: FormGroup;
    submitted: boolean = false;
    loading: boolean = false;
    returnUrl: string;
    error = '';


    @Output() onGetUserData = new EventEmitter<any>();
    @ViewChild('closeSigninModal') closeSigninModal: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private apiService: RestApiService,
        private authenticationService: AuthenticationService,
        private signinservice: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }



    ngOnInit() {
        this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]],
            rememberMe: [false]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.signinForm.controls; }

    // checkSignin() {
    //     this.submitted = true;
    //     this.loading = true;
    //     if (this.signinForm.invalid) {
    //         this.loading = false;
    //         return;
    //     }
    //     this.signinservice.authenticate(this.f.email, this.f.password).subscribe(
    //         data => {
    //             console.log("signin: " + data);
    //             this.router.navigate([''])
    //             this.invalidSignin = false

    //             this.getUserDetails();
    //         },
    //         error => {
    //             this.invalidSignin = true
    //         }
    //     );
    // }

    private getUserDetails() {
        this.apiService.getUserDetails(this.f.email.value).subscribe(
            userData => {
                sessionStorage.setItem('username', userData.userName);
                this.onGetUserData.emit(userData);
                this.closeSigninModal.nativeElement.click();
            },
            error => {
                console.log("Error on User details call.", error)
            }
        )
    }

    checkSignin() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.signinForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    debugger
                    console.log("signin: " + data);
                    this.invalidSignin = false
                    this.closeSigninModal.nativeElement.click();

                    // this.getUserDetails();

                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

}