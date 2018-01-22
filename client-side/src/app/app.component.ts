import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shahar';

  //  added this part
  data: any = null;
  myjsonData: any = null;

  constructor(private _http: Http) {
    this.getMyBlog();
  }

  private getMyBlog() {
    return this._http.get('http://localhost:3000/items/')
    .map((res: Response) => res.json())
    .subscribe(data => {
      this.data = data;
      this.myjsonData = JSON.stringify(data);
      console.log(this.data);
      console.log(this.myjsonData);
    });
  }

}
