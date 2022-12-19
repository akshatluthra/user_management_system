import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { FormSideComponent } from '../form-side/form-side.component';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  usersData:any=[]
  // countOfUsers = 0
  // @ViewChild(FormSideComponent) counter !: FormSideComponent;
  @Input() countOfUsers = 0;
  constructor(private api: ApiService) {
    
    // this.api.getUsersData().subscribe((res=>{
    //   this.usersData=res;
    //   console.log("New:", this.usersData.length)
    // }))
   }

  // ngAfterViewInit(): void {
  //   console.log("value from view child",this.counter.childData);
  // }


  ngOnInit(): void {
  }

}
