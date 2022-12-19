import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { UsersModel } from './userData.model';

declare var window:any;

@Component({
  selector: 'app-form-side',
  templateUrl: './form-side.component.html',
  styleUrls: ['./form-side.component.css']
})

export class FormSideComponent implements OnInit {
  formValue!: FormGroup;
  formModal:any;
  formSubmitAttempt = false;
  UserDataModelObj : UsersModel = new UsersModel(); 
  countOfUsers : number = 0;
  childData : string = "This is coming from child";
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['',[Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['',[Validators.required]],
      phone: ['', [Validators.required]]
    })
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("AddDataModal")
    )
    
  }

  requiredError(control:string){
    if((this.formValue.controls[control].touched && this.formValue.controls[control].invalid) || (this.formSubmitAttempt && this.formValue.controls[control].invalid)){
      return true;
    }
    return false;
  }

  AddData(){
    this.formSubmitAttempt = true;
    if(this.formValue.valid){
      this.UserDataModelObj.firstName = this.formValue.value.firstName;
      this.UserDataModelObj.lastName = this.formValue.value.lastName;
      this.UserDataModelObj.email = this.formValue.value.email;
      this.UserDataModelObj.phone = this.formValue.value.phone;
  
      this.api.postUsersData(this.UserDataModelObj).subscribe(res=>{
        // console.log(res);
        this.formModal.show();
        // alert("Users Data Added Successfully")
        this.formValue.reset();
        this.countOfUsers = this.countOfUsers + 1;
        // console.log("No. of users added recenetly:", this.countOfUsers)
      },
      error=>{
        alert("Something Went Wrong. Please Try Again.")
      })
    }
    
  }
  
  
  

}
