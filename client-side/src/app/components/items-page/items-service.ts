import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx';
import { AppComponent } from '../../app.component';


@Injectable()
export class MyItemsService {
    data: any = null;
    myjsonData: string = null;
    address = 'http://localhost:3000/items/';

    constructor(public http: Http) {
        this.http = http;
        console.log('Hello MyItemsService Provider');
    }

    public getAllItems() {
        return this.http.get(this.address)
        .map((res: Response) => res.json());
    }

    public postNewItem (partialItem) {
        const value = 'name=' + partialItem.name + '&id=' + partialItem._id + '&category=' +
        partialItem.category + '&sizes=' + partialItem.sizes + '&description=' + partialItem.description;
        console.log('in postNewItem, value = ' + value + ' to address:' + this.address);
        const myHeaders = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        const x =  this.http.post(this.address, value, { headers: myHeaders })
        .map(res => res).catch(this.handleError).subscribe(); // map (res => res.json());
        console.log(x);
        return x;
    }


    handleError(error) {
        console.error(error);
        return Observable.throw('Server error');
    }

}
