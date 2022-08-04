import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UIkit } from 'uikit';
import { AuthenticationService } from '../core/services/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  bar: any;
  username = '';
  password = '';
  user: any;

  @ViewChild("signinModal")
  signinModal: any;

  @ViewChild("signupModal")
  signupModal: any;

  

  constructor(private router: Router,
    private signinService: AuthenticationService) { }

  ngOnInit(): void {
    // this.bar = document.getElementById('js-progressbar');

    this.user = {};
  }

  openSigninModal() {
    if(!true){
      // Dont open the modal
    } else {
       // Open the modal
       this.signinModal.open();
    }

  }

  openSignupModal() {
    if(!true){
      // Dont open the modal
    } else {
       // Open the modal
       this.signupModal.open();
    }

  }

  openQForm(){
    this.router.navigateByUrl('/q-form');
  }

  setupUserDetails(userData){
    this.user['username'] = userData.userName;
    this.user['email'] = userData.email;
    this.user['firstname'] = userData.firstName;
    this.user['lastname'] = userData.lastName;
    this.user['active'] = userData.active;
  }

  openUserProfileModal(){}

  isUserLoggedIn(){
    return this.signinService.isUserLoggedIn();
  }

  logout(){
    this.signinService.logOut();
  }

}
