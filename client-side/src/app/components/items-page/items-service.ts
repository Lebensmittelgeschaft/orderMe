import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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
        console.log('Hello MyItemsService Provider');
    }

    public getAllItems() {
        return this.http.get(this.address)
        .map((res: Response) => res.json());
    }

    public postNewItem (partialItem) {
        const value = '_id=' + partialItem._id + '&name=' + partialItem.name + '&category=' +
        partialItem.category + '&sizes=' + partialItem.sizes + '&description=' + partialItem.description;
        console.log('in postNewItem, value = ' + value);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post('address', value, { headers: myHeaders })
        .map(res => res.json()).catch(this.handleError);
    }


    handleError(error) {
        console.error(error);
        return Observable.throw('Server error');
    }

}
