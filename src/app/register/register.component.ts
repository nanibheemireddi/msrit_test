import {Component, OnInit, Input, Output, OnChanges, EventEmitter} from '@angular/core';
// import {User} from './user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// import {UserService} from '../user.service';
// import {constantMessages} from "../../../constant/app.contantmessages";
// import {ToastrService} from 'ngx-toastr';

interface User {
    firstName:'',
    lastName:'',
    email:'',
    mobile:'',
    password:'',
    confirmPassword: '',
    
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    // @Input() data;
    @Output() update = new EventEmitter();
    user: User;
    registerForm: FormGroup;
    submitted = false;
    showSelected = false;
    phoneempty = false;
    type : string = 'create';
    text: string = 'add';
    index;
    passwordnotmatch:boolean=false;
    constructor(private route: ActivatedRoute, private router: Router) {}

    getData(data) {
      this.type = 'edit';
      this.index = data.index;
      console.log(this.index,'finikiiii')
      delete data.index; 
      this.user = data;
      // console.log("hey", this.user)
    }

    ngOnInit() {
        this.user = {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: '',
        } as User;
    }

    // ngOnChanges() {
    //   this.user = JSON.parse(JSON.stringify(this.data));
    // }

    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode !== 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onBlur(mobile) {
        if (mobile !== undefined && mobile !== '') {
            if (mobile.length < 10) {
                this.showSelected = true;
                this.phoneempty = false;
            } else {
                this.showSelected = false;
            }
        }

    }

    saveUserDetails() {

      if(typeof this.type == "undefined" || this.type !== 'edit') {
        this.submitted = true;
        console.log(this.user);
        if (this.user.mobile === undefined || this.user.mobile === '') {
            this.showSelected = true;
        }
        
        
        var checkfields = ['email', 'mobile', 'password', 'confirmPassword']
        var allowed = true;
        checkfields.forEach(field => {
            if (typeof this.user[field] == 'undefined' || this.user[field] == '' || this.user[field] == null) {
                allowed = false;
            }
        });
         if(allowed && this.user.password != this.user.confirmPassword) {
           allowed =false
           this.passwordnotmatch=true;
         } 
         if(this.user.password == '' || this.user.confirmPassword == '' ){
           this.passwordnotmatch=false;

         }
         if (allowed) {
           var users = localStorage.getItem('users');
           if(typeof users == 'undefined' || users == null ) {
             localStorage.setItem('users', JSON.stringify([this.user]));
             this.router.navigate(['/login']);
           } else {
             let eusers = JSON.parse(users);
              eusers.push(this.user);
              localStorage.setItem('users', JSON.stringify(eusers));
              this.router.navigate(['/login']);
              
           }
        } else {
            alert('password mismatch');
        }    
      } else {
         let users = JSON.parse(localStorage.getItem('users'));
           users[this.index] = this.user;
          this.update.emit(JSON.parse(JSON.stringify(users)));
         localStorage.setItem('users', JSON.stringify(users));
         this.reset();
      }
        
    }



    reset() {
      this.user = {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: '',
          
        } as User;
    }

}

