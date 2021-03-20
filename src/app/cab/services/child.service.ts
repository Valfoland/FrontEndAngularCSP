import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChildResultData } from '../models/child-result.model';
import { ChildData } from '../models/child.model';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  private readonly urlChild = '/api/Children';
  private readonly urlChildResult = '/api/ChildrenResult';

  constructor(private http: HttpClient) { }

  childData: ChildData = new ChildData();
  childDataUpdated: ChildData = new ChildData();
  childList: ChildData[];

  idChild = 0;
  childResultList: ChildResultData[];

  postChild() {
    return this.http.post(this.urlChild, this.childData);
  }

  putChild() {
    return this.http.put(this.urlChild + '/' + this.childDataUpdated.id, this.childDataUpdated);
  }

  deleteChild(id){
    return this.http.delete(this.urlChild + '/' + id);
  }

  refreshList() {
    this.http.get(this.urlChild).toPromise().then(res => this.childList = res as ChildData[]);
  }

  postChildResult(){
    return this.http.post(this.urlChildResult, this.childData);
  }

  refreshListChildResult(id) {
    this.http.get(this.urlChildResult + '/' + id).toPromise().then(res => this.childResultList = res as ChildResultData[]);
  }

}
