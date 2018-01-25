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
  
  generateItem() {
    console.log('Generating Item!');
    const form = document.getElementById('submit-item-form');
    const name = (<HTMLInputElement>form.querySelector('[name=Name]')).value;
    const description = (<HTMLInputElement>form.querySelector('[name=Description]')).value;
    const sizes = (<HTMLInputElement>form.querySelector('[name=Sizes]')).value;
    const category = (<HTMLInputElement>form.querySelector('[name=Category]')).value;

    const newItem = {
      name: name,
      description: description,
      sizes: sizes,
      category: category,
      _id: this.generateItemId(),
    };

    return this.serve.postNewItem(newItem);
  }
  
  public  generateItemId() {
    let maxId = 0;
    for (const item of this.myData) {
      maxId = (item._id >= maxId) ? (item._id + 1) : maxId;
    }
    console.log('max Id: ' + maxId);
    return maxId;
  }
  
  ngOnInit() {
    // const form = document.getElementById('submit-item-form');
    // const service = this.serve;
    // const generateItemId = this.generateItemId;
    // form.addEventListener('submit', function(event) {
    //   event.preventDefault(); // stop browser from trying to submit the form
    //       /**
    //    * Pull infromation from the from
    //    */
    //   const name = (<HTMLInputElement>form.querySelector('[name=Name]')).value;
    //   const description = (<HTMLInputElement>form.querySelector('[name=Description]')).value;
    //   const sizes = (<HTMLInputElement>form.querySelector('[name=Sizes]')).value;
    //   const category = (<HTMLInputElement>form.querySelector('[name=Category]')).value;
    //   const newItem = {
    //     name: name,
    //     description: description,
    //     sizes: sizes,
    //     category: category,
    //     _id: 505,
    //   };
    //   console.log('Generating Item!!');
    //   return service.postNewItem(newItem);
    // });
  }
  
}

