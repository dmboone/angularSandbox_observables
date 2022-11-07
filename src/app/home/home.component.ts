import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => { // will start a new one every time you go to the home page, which creates memory leaks!
    //   console.log(count);
    // });

    const customIntervalObservable = Observable.create(observer =>{ // creating a custom observable that will do the same as the one above
      let count = 0;
      setInterval(() => {
        observer.next(count); // emits a new value
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data => { // make sure to unsubscribe in OnDestroy to avoid memory leak
      console.log(data);
    });
  }

  ngOnDestroy(){
    this.firstObsSubscription.unsubscribe(); // need to unsubscribe during OnDestroy to prevent memory leak! If you check in console the interval
                                            // will now stop when leaving the home page and restart at the beginning if you go to home again
  }
}
