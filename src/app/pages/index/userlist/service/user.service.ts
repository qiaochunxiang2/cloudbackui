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

  findAll(cId, dId) {
    let findUrl = this.findAllUrl;
    if (cId != null) {
      findUrl = findUrl + '?cId=' + cId;
    }
    if (dId != null) {
      findUrl = findUrl + '&&dId=' + dId;
    }
    return new Promise((resolve, reject) => {
      this.http.get(findUrl).toPromise().then(res => {
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
