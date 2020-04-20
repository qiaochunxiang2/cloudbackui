import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public findAllUrl = 'http://localhost:8080/user/findAll';
  public deleteUserUrl = 'http://localhost:8080/user/deleteUser';

  constructor(
    private http: HttpClient,
  ) {
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.http.get(this.findAllUrl).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.deleteUserUrl + '?id=' + id).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}
