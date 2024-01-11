import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup|any;
  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.login=new FormGroup({
      "userGmail": new FormControl(),
      "userPass":new FormControl()
    })
  }
  logindata(login:FormGroup){
    // console.log(this.login.value);
    this.http.get<any>("http://localhost:8080/login").subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.userGmail===this.login.value.userGmail
        && a.userPass === this.login.value.userPass
      });
      if(user){
        console.log("success")
        alert("successfully logged in")
        res.token='1234'
        localStorage.setItem('token',res.token)
        // console.log(res.token,user.token)
        this.router.navigate(['greeting']);
      }
      else{
        // console.log("fail")
        alert("wrong username or password")
      }
    })
  }
}

