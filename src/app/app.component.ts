import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormSideComponent } from './components/form-side/form-side.component';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'user_mgt';
  users !: any;

  @ViewChild(FormSideComponent) counter !: FormSideComponent;

  

  constructor(private api: ApiService) { }
  ngAfterViewInit(): void {
    console.log(this.counter.countOfUsers);
  }

 @Output() getUserEvent = new EventEmitter();
 @Output() getUser: EventEmitter<any> = new EventEmitter();


  showData(){
  this.api.getUsersData().subscribe(res=>{
    this.users = res;
    this.getUser.emit(this.users)
    console.log(res);
  })
  }
}


