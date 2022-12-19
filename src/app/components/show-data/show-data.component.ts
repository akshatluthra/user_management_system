import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { UsersModel } from '../form-side/userData.model';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

declare var window:any;

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {
  usersData:any=[]
  formValue!: FormGroup;
  formModal:any;
  MessageModal:any;
  updateConfirm:any;
  updationModal:any;
  usersToBeDeleted : any;
  UserDataModelObj : UsersModel = new UsersModel(); 
  edit = faPenSquare;
  del = faTrashAlt;

  @Input() users!:any[];
  constructor(private api: ApiService, private formBuilder: FormBuilder) {
    this.api.getUsersData().subscribe((res=>{
      this.usersData=res;
      console.log("New:", this.usersData.length)
    }))
   }
   showData(){
    this.api.getUsersData().subscribe(res=>{
      this.users = res;
    })
    }

   DeleteData(usersData: any){
    this.formModal.hide();
    this.api.deleteUsersData(usersData.id).subscribe(res =>{
      this.MessageModal.show();
      this.showData();
    })
  }
  onEdit(row:any){
    this.UserDataModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
  }
  updateUserData(){
    this.UserDataModelObj.firstName = this.formValue.value.firstName;
    this.UserDataModelObj.lastName = this.formValue.value.lastName;
    this.UserDataModelObj.email = this.formValue.value.email;
    this.UserDataModelObj.phone = this.formValue.value.phone;

    this.api.updateUsersData(this.UserDataModelObj,this.UserDataModelObj.id).subscribe(res=>{
      this.updateConfirm.show();
      this.updationModal.hide();
      this.formValue.reset();
      this.showData();
    })
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: ['']
    }),
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    )
    this.updationModal = new window.bootstrap.Modal(
      document.getElementById('updateModal')
    )
    this.MessageModal = new window.bootstrap.Modal(
      document.getElementById('confirmModal')
    )
    this.updateConfirm = new window.bootstrap.Modal(
      document.getElementById('updationMessageModal')
    )
  }

  openModal(){
    this.formModal.show();
  }

  newModal(){
    this.updationModal.show();
  }

}
