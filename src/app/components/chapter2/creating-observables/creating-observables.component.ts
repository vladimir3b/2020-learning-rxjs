import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { 
  Subscription, 
  of, 
  EMPTY, 
  NEVER, 
  throwError, 
  fromEvent, 
  timer, 
  from,
  Observable} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fg-chapter2-creating-observables',
  templateUrl: './creating-observables.component.html',
  styleUrls: ['./creating-observables.component.scss']
})
export class Chapter2CreatingObservablesComponent implements OnInit, OnDestroy {
  
  results: Array<string> = [];
  subscriptions: Array<Subscription> = [];
  @ViewChild('drawingZone', {static: true}) canvas: ElementRef<HTMLCanvasElement>;



  ngOnDestroy(): void {
    this._unsubscribe();
  }

  ngOnInit(): void {
   this.createFromEvent();
  }

  private _newStream(): number {
    this.results.push('');
    return this.results.length - 1;
  }

  private _observer(index: number) {
    return  {
      next: value => this.results[index] += `${value} `,
      error: error => this.results[index] += `There has been an error: ${error}...`,
      complete: () => this.results[index] += 'completed'
    }  
  } 

  private _unsubscribe(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  createOf(): void  {
    const index = this._newStream();;
    const values = [
      'Jimmy',
      45,
      {
        street: 'St. Eduard',
        number: 7
      }
    ]
    this.subscriptions.push(
      of(values).subscribe(this._observer(index))
    );
  }

  createEmpty(): void {
    const index = this._newStream();
    this.subscriptions.push(
      EMPTY.subscribe(this._observer(index))
    );    
  }

  createNever(): void {
    const index = this._newStream();
    this.subscriptions.push(
      NEVER.subscribe(this._observer(index))
    );    
  }

  createThrowError(): void {
    const index = this._newStream();
    this.subscriptions.push(
      throwError('There was a critical error!').subscribe(this._observer(index))
    );    
  }

  createFromEvent(): void {
    this.subscriptions.push(
      fromEvent(this.canvas.nativeElement, 'mousemove')
        .subscribe((event: MouseEvent) => {
          const context = this.canvas.nativeElement.getContext('2d');
          const x = event.clientX - this.canvas.nativeElement.offsetLeft;
          const y = event.clientY - this.canvas.nativeElement.offsetTop;
          context.fillRect(x, y , 2, 2);
        })
    );
  }

  createTimer(): void {
    const index = this._newStream();
    const startTime = new Date();
    startTime.setSeconds(startTime.getSeconds() + 10);
    this.subscriptions.push(
      timer(startTime, 500)
        .subscribe(this._observer(index))
    );
  }
   
  createFromArray(): void {
    const index = this._newStream();
    const girls = [
      'Iulia',
      'Alexandra',
      'Gabriela',
      'Dana',
      'Miruna',
      'Cristina',
      'Andreea'
    ];
    this.subscriptions.push(
      from(girls)
        .subscribe(this._observer(index))
    );
  }

  createFromPromise(): void {
    const index = this._newStream();
    const promise = new Promise(resolve => setTimeout(() => resolve(new Date('03-28-2011')), 200));
    this.subscriptions.push(
      from(promise)
        .subscribe(this._observer(index))
    );
  }

  createAjax1(): void {
    const url = 'http://api.icndb.com/jokes/random/?limitTo=[nerdy]&escape=javascript';
    const index = this._newStream();
    this.subscriptions.push(
      ajax(url)
        .pipe(
          map(object => (object as any).response.value.joke)
        )
        .subscribe(this._observer(index))
    );
  }

  createAjax2(): void {
    const url = 'http://api.icndb.com/jokes/random/?limitTo=[nerdy]&escape=javascript';
    const index = this._newStream();
    this.subscriptions.push(
      ajax.getJSON(url)        
        .pipe(
          map(object => (object as any).value.joke)
        )
        .subscribe(this._observer(index))
    );
  }

  createCustomObservable(): void {
    const index = this._newStream();
    this.subscriptions.push(
      Observable
        .create(subscriber => {
          const handle = setInterval(() => {
            const message = `time: ${new Date().toLocaleTimeString()}`;
            console.log(message);
            subscriber.next(message);
          }, 1000);
          return () => clearInterval(handle);
        })
        .subscribe(this._observer(index))
    );
  }
  
}