import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public hostname = 'http://localhost:8080';
  public publishUrl = this.hostname + '/blog/publish';
  public getAllUrl = this.hostname + '/blog/findAll';
  public personAllUrl = this.hostname + '/blog/personAll';
  public deleteBlogUrl = this.hostname + '/blog/deleteBlog';

  constructor(
    private http: HttpClient
  ) {
  }

  publish(data) {
    data = JSON.parse(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.publishUrl, data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getAllUrl).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  personAll(data) {
    return new Promise((resolve, reject) => {
      this.http.get(this.personAllUrl + '?uid=' + data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  deleteBlog(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.deleteBlogUrl + '?id=' + id).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}
