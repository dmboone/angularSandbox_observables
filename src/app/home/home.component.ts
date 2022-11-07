import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
        observer.next(count); // emits a new value; this is the event data we can access when we subscribe to the observable
        if(count === 5){
          observer.complete(); // observable will stop
        }
        if(count > 3){ // creating a fake error here
          observer.error(new Error('Count is greater than 3!')); // this will cancel the observable altogether; not the same as complete
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.pipe( // can use multiple rxjs operators on the same data at one one time!
      filter( // the filter operator will only emit data that satisfies some sort of requirement that we define
        (data: number) => {
          return data > 0; // so only the data from the observable that is greater than 0 will get emitted and mapped and subscribed to down below
        }
      ), 
      map( // the map operator manipulates the data from the observable in some way before we access it in the subscription
        (data: number) => {
          return 'Round: ' + (data + 1);
        }
      )
    )
    .subscribe(
      data => { // this is the event data released by the observable (observer.next(data)); make sure to unsubscribe in OnDestroy to avoid memory leak
      console.log(data); // this runs as long as the observable is still running
      },
      error => { // this will run if the observer gives an error (observer.error(...)), so how we handle errors from our observer; do not need to unsubscribe if observable gives an error, but still do 
        console.log(error); // console log the error data as defined in the observable
        alert(error.message); // send an alert with the error data
      },
      () => { // this will run if our observer completes (observer.complete()); do not need to unsubscribe if observable completes, but still do
        console.log('Completed!');
      }
    );
  }

  ngOnDestroy(){
    this.firstObsSubscription.unsubscribe(); // need to unsubscribe during OnDestroy to prevent memory leak! If you check in console the interval
                                            // will now stop when leaving the home page and restart at the beginning if you go to home again
  }
}
