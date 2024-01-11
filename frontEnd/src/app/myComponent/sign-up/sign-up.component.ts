import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUp: FormGroup |any;
  // signUser:any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signUp= new FormGroup({
      'userName': new FormControl(),
      'userGmail': new FormControl(),
      'userPass': new FormControl(),
      'userPhone': new FormControl()
    })
  }
  signupdata(signUp: FormGroup){
    // console.log(this.signUp.value)
    this.http.post<any>("http://localhost:8080/register",this.signUp.value).subscribe(res=>{
      // console.log("success")

      this.router.navigate(['login']);
    })

  }
}
