import { Component, OnInit , Input} from '@angular/core';
import { taskI } from '../interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() taskToShow: taskI; 
  // selectedTask : taskI = {description : "", title}

  constructor() {
    
   }

  ngOnInit() {
    this.taskToShow = { title: "", description: "" }
  }

}
