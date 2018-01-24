import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { itemGenerator } from '../../../server-side/src/helper/objectsGenerator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shahar';
  //  added this part
  data: any = null;
  myjsonData: string = null;

  constructor(private _http: Http) {

  }

}
