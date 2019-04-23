import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // myObs: Observable;
  myNumberObsSubs: Subscription;
  myCustomNumberObsSubs: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000)
    this.myNumberObsSubs = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    )

    const myObs = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('First package');
      }, 2000);
      setTimeout(() => {
        observer.next('Second package');
      }, 4000);
      setTimeout(() => {
        observer.complete();
      }, 5000);
      setTimeout(() => {
        observer.next('Second package');
      }, 6000);
    });
    this.myCustomNumberObsSubs = myObs.subscribe(
      (data:string) => {console.log(data) },
      (error:string) => {console.log(error) },
      (complete:string) => { console.log('completed')}
    );
  }

  ngOnDestroy() {
    this.myCustomNumberObsSubs.unsubscribe();
    this.myNumberObsSubs.unsubscribe();
  }

}
