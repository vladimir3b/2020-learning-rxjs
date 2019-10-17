import { Component } from '@angular/core';
import { MatButton } from '@angular/material';
import { timer, Subscription, interval, Subject } from 'rxjs';
import { 
  map, 
  tap, 
  filter, 
  take, 
  takeLast, 
  takeWhile, 
  takeUntil} from 'rxjs/operators';

@Component({
  selector: 'fg-chapter3-basic-operators',
  templateUrl: './basic-operators.component.html'
})
export class Chapter3BasicOperatorsComponent {
  
  private _subscriptions: Array<Subscription> = [];
  results: Array<string> = [];
  takeUntilClicked = false;
  takeUntil$: Subject<void> = new Subject();

  private _newStream(): number {
    this.results.push('');
    return this.results.length - 1;
  }

  private _observer(index: number) {
    return  {
      next: value => this.results[index] += `${value} `,
      error: error => this.results[index] += `There has been an error: ${error}...`,
      complete: () => this.results[index] += 'XXX'
    }  
  } 

  private _isPrime(n: number): boolean {
    let isPrime = (n <= 3) &&  (n >= 1) || (n % 2 !== 0)  && (n % 3 !== 0) 
    if (isPrime) {
      for (let i = 5; i <= Math.floor(Math.sqrt(n)); i++) {
        if (n % i === 0) {
          isPrime = false;
          break;
        }
      }
    }
    return isPrime;
  }

  private _unsubscribe(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  ngOnDestroy(): void {
    this._unsubscribe();
  }

  tapOperator(button: MatButton): void {
    const index = this._newStream();
    button.disabled = true;
    this._subscriptions.push(
      timer(2000)
        .pipe(
          tap({ complete: () => button.disabled = false }),
          map(value => 'Something has been emitted...')
        )
        .subscribe(this._observer(index))
    );
  }

  filterOperator(): void {
    const index = this._newStream();
    this._subscriptions.push(
      interval(20)
        .pipe(
          filter(value => this._isPrime(value))
        )
        .subscribe(this._observer(index))
    );
  }

  takeOperator(): void {
    const index = this._newStream();
    this._subscriptions.push(
      interval(20)
        .pipe(
          filter(value => this._isPrime(value)),
          take(100)
        )
        .subscribe(this._observer(index))
    );
  }

  takeLastOperator(): void {
    const index = this._newStream();
    this._subscriptions.push(
      interval(20)
        .pipe(
          filter(value => this._isPrime(value)),
          take(100),
          takeLast(10)
        )
        .subscribe(this._observer(index))
    );
  }

  takeWhileOperator(): void {
    const index = this._newStream();
    this._subscriptions.push(
      interval(20)
        .pipe(
          filter(value => this._isPrime(value)),
          takeWhile(value => value <= 1000)
        )
        .subscribe(this._observer(index))
    );
  }

  takeUntilOperator(button: MatButton): void {
    if (!this.takeUntilClicked) {
      this.takeUntilClicked = true;
      const index = this._newStream();
      this._subscriptions.push(
        interval(20)
          .pipe(
            filter(value => this._isPrime(value)),
            takeUntil(this.takeUntil$)
          )
          .subscribe(this._observer(index))
      );
    } else {
      this.takeUntil$.next();
      button.disabled = true;
    }
  }
}