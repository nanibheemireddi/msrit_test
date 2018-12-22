import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: [];
  data: any = {};
  
  @ViewChild(RegisterComponent) child !: RegisterComponent;

  constructor() {

  }



  ngOnInit() {
  	let tempUsers;
  	tempUsers = localStorage.getItem('users');
  	this.users = JSON.parse(tempUsers);
  	console.log(this.users);
  }

  onEdit(data, type, index) {
    console.log(index,'find')
  	this.data = data;
    this.data.type = type;
 	  this.data.index = index;
    var keys= Object.keys(this.data);
    var temp={};
    keys.forEach(obj=>{
      temp[obj]=this.data[obj];
    })

    this.child.getData(JSON.parse(JSON.stringify(temp)));
    console.log(this.data, "hello");
  }

  updateUser(updatedData) {
    console.log("updatedData", updatedData);
    this.users = updatedData;
  }

  onDelete(i) {
    this.users.splice(i, 1);
    localStorage.setItem('users', JSON.stringify(this.users));
    console.log(this.users);
  }

}
