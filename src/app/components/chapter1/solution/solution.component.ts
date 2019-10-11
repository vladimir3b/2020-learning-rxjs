import { Component, OnDestroy } from '@angular/core';
import { Subscription, from, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'fg-chapter1-solution',
  templateUrl: './solution.component.html'  
})
export class Chapter1SolutionComponent implements OnDestroy {

  result: string = '';
  subscriptions: Array<Subscription> = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription =>  subscription.unsubscribe);
  }

  private _clearResult(): void {
    this.result = '';
  }     

  arrayButton(): void {
    this._clearResult();
    const numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    this.subscriptions.push(
      from(numbers)
        .pipe(
          map(number => ({ number })),
          filter(data => data.number <= 7),
          map(data => [data]),
          scan((previous, current) => previous.concat(current), [])
        ) 
        .subscribe(data => this.result = JSON.stringify(data))
    );
  }

  intervalButton(): void {
    this._clearResult();
    this.subscriptions.push(
      interval(1000)
        .pipe(
          map(number => ({ number })),
          filter(data => data.number <= 7),
          map(data => [data]),
          scan((previous, current) => previous.concat(current), [])
        )
        .subscribe(data => this.result = JSON.stringify(data))
    );
  }

  ajaxButton(): void {
    this._clearResult();
    const url = 'http://api.icndb.com/jokes/random/?limitTo=[nerdy]&escape=javascript';
    this.subscriptions.push(
      ajax.getJSON(url).pipe(
        map((response: any) => ({
          joke: response.value.joke,
          length: response.value.joke.length
        }))
      )
      .subscribe(data => this.result = JSON.stringify(data))
    )
  }

}