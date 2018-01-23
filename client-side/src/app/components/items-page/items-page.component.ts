import { Component, OnInit } from '@angular/core';
import { MyItemsService } from './items-service';


@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.css']
})

export class ItemsPageComponent implements OnInit {

  myjsonData: string;
  serve: any;
  constructor(serve: MyItemsService) {
    this.serve = serve;
    serve.getAllItems().
            subscribe(data => {
            this.myjsonData = JSON.stringify(data.returned);
            console.log('jdata:' + this.myjsonData);
        });
   }

  ngOnInit() {
  }

}
