import { Component , OnInit } from '@angular/core';
import { HttpService } from './http.service';
import {taskI} from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks : taskI[];
  selectedTask : taskI;
  newTask : taskI;
  title = 'public';
  editForm : taskI;
  isHidden : boolean;
  num: number;
  randNum: number;
  str: string;
  firstName: string;

  hasError : boolean
  error : string
     

  constructor(private _httpService: HttpService){}

  ngOnInit(){
    // this.getTaskFromService();
    this.tasks = [];
    this.selectedTask =  {title : "", description : ""}
    this.isHidden = true;
    this.newTask = {title : "", description : ""}
    this.editForm = {title : "", description : ""};
    this.hasError = false;
    this.error = this.error;
  }

  getTaskFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe((data : taskI[]) => {
      console.log("got our tasks!", data)
      this.tasks = data;
    });
  }

  // @ts-ignore
  // tslint:disable-next-line: variable-name
  OnButtonClickID_toGetOne(_id: number){
    this.isHidden = false;
    let observable = this._httpService.getOne(_id);
    observable.subscribe((data : taskI) => {
      console.log('got our data back!!', data)
      this.selectedTask = data;
    });
  }

  OnSubmit(){
    console.log('here ----------',this.newTask);
    let observable = this._httpService.AddNewTask(this.newTask);
    observable.subscribe((data : taskI) => {
      this.tasks.push(data);
    })
  }

  OnSubmitEdit(){
    console.log('__  ___  ___', this.selectedTask)
    let observable = this._httpService.EditThisOne(this.selectedTask);
    observable.subscribe((data : any) => {
      console.log('what ______ ', data);
      if (data.success == true){
        this.getTaskFromService();
      }
      else if (data.success == false) {
          this.hasError = true;
          this.error = "there was an error on editing a task!";
      }
    })
    
  }

  DeleteThisOne(_id : number){
    let observable = this._httpService.DeleteThisFromDB(_id);
    observable.subscribe((data : {success : boolean}) => {
      if (data.success == true){
        this.getTaskFromService();
      }
      else if (data.success == false) {
        this.hasError = true;
        this.error = "there was an error on editing a task!";
    }
    })
  }
}
