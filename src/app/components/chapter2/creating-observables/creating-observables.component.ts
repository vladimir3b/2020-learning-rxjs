import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { Subscription, of, EMPTY, NEVER, throwError, fromEvent } from 'rxjs';

@Component({
  selector: 'fg-chapter2-creating-observables',
  templateUrl: './creating-observables.component.html',
  styleUrls: ['./creating-observables.component.scss']
})
export class Chapter2CreatingObservablesComponent implements OnInit, OnDestroy {
  
  results: Array<string> = [];
  subscriptions: Array<Subscription> = [];
  @ViewChild('drawingZone', {static: true}) canvas: ElementRef<HTMLCanvasElement>;

  observer(index: number) {
    return  {
      next: value => this.results[index] += `${value} `,
      error: error => this.results[index] += `There has been an error: ${error}...`,
      complete: () => this.results[index] += 'completed'
    }  
  } 

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      fromEvent(this.canvas.nativeElement, 'mousemove')
        .subscribe((event: MouseEvent) => {
          const context = this.canvas.nativeElement.getContext('2d');
          const x = event.clientX - this.canvas.nativeElement.offsetLeft;
          const y = event.clientY - this.canvas.nativeElement.offsetTop;
          context.fillRect(x, y , 2, 2);
        })
    )
  }

  unsubscribe(): void {
    console.log('we are unsubscribing...');
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  createOf(): void  {
    this.results.push('');
    const index = this.results.length - 1;
    const values = [
      'Jimmy',
      45,
      {
        street: 'St. Eduard',
        number: 7
      }
    ]
    this.subscriptions.push(
      of(values).subscribe(this.observer(index))
    );
  }

  createEmpty(): void {
    this.results.push('');
    const index = this.results.length - 1;
    console.log(this.results);
    this.subscriptions.push(
      EMPTY.subscribe(this.observer(index))
    );    
  }

  createNever(): void {
    this.results.push('');
    const index = this.results.length - 1;
    console.log(this.results);
    this.subscriptions.push(
      NEVER.subscribe(this.observer(index))
    );    
  }

  createThrowError(): void {
    this.results.push('');
    const index = this.results.length - 1;
    console.log(this.results);
    this.subscriptions.push(
      throwError('There was a critical error!').subscribe(this.observer(index))
    );    
  }

}