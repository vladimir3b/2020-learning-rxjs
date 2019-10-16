import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'fg-chapter2-subjects',
  templateUrl: './subjects.component.html'
})
export class Chapter2SubjectsComponent implements OnInit, OnDestroy {

  private _subscriptions: Array<Subscription> = [];
  results: Array<string> = [];
  subject: Subject<number> = new Subject();
  behaviorSubject: BehaviorSubject<number> = new BehaviorSubject(-1);
  replaySubject: ReplaySubject<number> = new ReplaySubject();
  asyncSubject: AsyncSubject<number> = new AsyncSubject();
  buttons: Array<boolean> = [false, false, false, false];
  asyncCompleted = false;

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  ngOnInit(): void {
    for(let i = 0; i <= 3; i++) {
      this._newStream();
      this._subscriptions.push(null);
    }
  }

  private _observer(index: number) {
    return  {
      next: value => this.results[index] += `${value} `,
      error: error => this.results[index] += `There has been an error: ${error}... `,
      complete: () => this.results[index] += 'completed '
    }  
  } 

  private _unsubscribe(): void {
    this._subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : null);
  }

  private _newStream(): number {
    this.results.push('');
    return this.results.length - 1;
  }

  subjectEmits(): void {
    const value = _.random(0, 255);
    console.log(`subject emitted ${value}...`);
    this.subject.next(value);
  }

  behaviorSubjectEmits(): void {
    const value = _.random(0, 255);
    console.log(`behavior subject emitted ${value}...`);
    this.behaviorSubject.next(value);
  }

  replaySubjectEmits(): void {
    const value = _.random(0, 255);
    console.log(`replay subject emitted ${value}...`);
    this.replaySubject.next(value);
  }

  asyncSubjectEmits(): void {
    const value = _.random(0, 255);
    console.log(`async subject emitted ${value}...`);
    this.asyncSubject.next(value);
  }

  connectStream1(): void {
    this.buttons[0] = true;
    this._subscriptions[0] = this.subject.subscribe(this._observer(0))
  }

  connectStream2(): void {
    this.buttons[1] = true;
    this._subscriptions[1] = this.behaviorSubject.subscribe(this._observer(1))
  }

  connectStream3(): void {
    this.buttons[2] = true;
    this._subscriptions[2] = this.replaySubject.subscribe(this._observer(2))
  }

  connectStream4(): void {
    this.buttons[3] = true;
    this._subscriptions[3] = this.asyncSubject.subscribe(this._observer(3))
  }

  completeAsyncSubject(): void {
    this.asyncCompleted = true;
    this.asyncSubject.complete();
  }

  disconnectStream(index: number): void {
    this.buttons[index] = false;
    this._subscriptions[index]
      .unsubscribe();
  }

}