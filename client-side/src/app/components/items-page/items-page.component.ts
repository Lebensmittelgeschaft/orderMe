import { Component, OnInit } from '@angular/core';
import { MyItemsService } from './items-service';


@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.css']
})

export class ItemsPageComponent implements OnInit {

  myjsonData: string;
  myData: [any] = [{}];
  serve: any;
  constructor(serve: MyItemsService) {
    this.serve = serve;
    serve.getAllItems().
            subscribe(data => {
            this.myData = data.returned;
            console.log('data[0]: ' + this.myData);
            this.myjsonData = JSON.stringify(data.returned);
            console.log('jdata:' + this.myjsonData);
        });
   }

  ngOnInit() {
  }

  generateItem() {

  }

}
