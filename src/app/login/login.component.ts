import {Component, OnInit} from '@angular/core';
// import {Login} from './login';
// import {LoginService} from "./login.service";
import {ActivatedRoute, Router} from '@angular/router';
// import {ToastrService} from 'ngx-toastr';

interface Login {
    'email': string,
    'password': string
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public model: Login = {
        email: '',
        password: ''
    };

    submitted: boolean = false;
    remember: boolean;
    constructor(private router: Router) {}
    login() {
        this.submitted = true;
        // console.log("model", this.model);
        if (typeof this.model.email !== 'undefined' && this.model.email.trim() != '' && typeof this.model.password !== 'undefined' && this.model.password.trim() != "") {
            if(this.model.email === "user@gmail.com" && this.model.password === "123456") {
            	this.router.navigate(['/dashboard']);	
            } else {
            	alert('Invalid credentials');
            }
            

        }
    }
    
    ngOnInit() {
       
    }

}
