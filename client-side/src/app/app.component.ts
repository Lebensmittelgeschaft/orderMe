import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ItemsPageComponent } from './components/items-page/items-page.component';
import { MyItemsService } from './components/items-page/items-service';
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
  itemsComponent: ItemsPageComponent;

  constructor(private _http: Http) {

  }

}
