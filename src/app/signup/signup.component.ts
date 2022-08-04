import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/services/auth/authentication.service';
import { RestApiService } from '../core/services/rest-api.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    invalidSignup = false;
    signupForm: FormGroup;
    submitted: boolean = false;
    loading: boolean = false;
    error = '';

    @Output() onGetUserData = new EventEmitter<any>();
    @ViewChild('closeSignupModal') closeSignupModal: ElementRef;

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private apiService: RestApiService,
        private signupservice: AuthenticationService) { }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() { return this.signupForm.controls; }

    checkSignup() {
        this.submitted = true;
        this.loading = true;
        if (this.signupForm.invalid) {
            this.loading = false;
            return;
        }
        this.signupservice.authenticate(this.f.email, this.f.password).subscribe(
            data => {
                console.log("signup: " + data);
                this.router.navigate([''])
                this.invalidSignup = false

                this.getUserDetails();
            },
            error => {
                this.invalidSignup = true
            }
        );
    }

    private getUserDetails() {
        this.apiService.getUserDetails(this.f.email.value).subscribe(
            userData => {
                sessionStorage.setItem('username', userData.userName);
                this.onGetUserData.emit(userData);
                this.closeSignupModal.nativeElement.click();
            },
            error => {
                console.log("Error on User details call.", error)
            }
        )
    }

}