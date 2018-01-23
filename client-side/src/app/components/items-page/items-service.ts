import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx';
import { AppComponent } from '../../app.component';


@Injectable()
export class MyItemsService {
    data: any = null;
    myjsonData: string = null;

    constructor(public http: Http) {
        console.log('Hello MyItemsService Provider');
    }

    public getAllItems() {
        return this.http.get('http://localhost:3000/items/')
        .map((res: Response) => res.json());

    }

    handleError(error) {
        console.error(error);
        return Observable.throw('Server error');
    }

}
