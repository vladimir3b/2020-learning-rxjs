import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Subject, BehaviorSubject, ReplaySubject, interval, Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'fg-chapter2-cold-and-hot-observables',
  templateUrl: './cold-and-hot-observables.component.html'
})
export class Chapter2ColdAndHotObservablesComponent implements OnDestroy {

  private _subscriptionHot: Subscription = null;
  private _subscriptionCold: Subscription = null;
  private _subject$ = new Subject<number>();;
  hotStream = '';
  coldStream = '';
  connectedHot = false;
  connectedCold = false;

  ngOnDestroy() {
    this._subscriptionCold ? this._subscriptionCold.unsubscribe() : null;
    this._subscriptionHot ? this._subscriptionHot.unsubscribe() : null;
  }

  ngOnInit() {
    let number = 0;
    setInterval(() =>  { 
      number += 1;
      this._subject$.next(number);
    }, 300);
  }

  connectCold(): void {
    this.connectedCold = true;
    this._subscriptionCold = interval(300).subscribe(value => this.coldStream += value + ' ');
  }

  disconnectCold(): void {
    this.connectedCold = false;
    this._subscriptionCold.unsubscribe();
  }

  connectHot(): void {
    this.connectedHot = true; 
    const observable$ = this._subject$.asObservable();
    this._subscriptionHot = observable$.subscribe(value => this.hotStream += value + ' ');
  }

  disconnectHot(): void {
    this.connectedHot = false;
    this._subscriptionHot.unsubscribe();
  }

}