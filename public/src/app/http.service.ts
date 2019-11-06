import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {RootObject} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http : HttpClient) {
    this.getTasks();
   }

  getTasks() {
    return this._http.get('/tasks');
    // tempobserverable.subscribe(data => console.log('our data ! ______', data));
    }

    getOne(num : number){
      return this._http.get(`/tasks/${num}`);
    }
    // let pokemon_a = this._http.get('/https://pokeapi.co/api/v2/pokemon/1/');
    //   pokemon_a.subscribe(gotback => console.log('what we got back', gotback));

  AddNewTask(newTask) {
    console.log('from service --->' , newTask);
    return this._http.post('/tasks', newTask );
  }

  DeleteThisFromDB(_id : number){
    return this._http.delete(`/deleteone/${_id}`);
  }

  EditThisOne(theBody){
    return this._http.put(`/tasks/${theBody._id}`, theBody);
  }

  // makeACall(url : string) {
  //   let ourobserver = this._http.get(url);
  //   ourobserver.subscribe(data => console.log('the data coming back ______ !!', data))
  // }

}
