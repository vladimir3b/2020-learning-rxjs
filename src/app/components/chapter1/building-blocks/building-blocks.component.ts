import { Component, OnDestroy } from "@angular/core";
import { Subscription, interval } from 'rxjs';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'fg-chapter1-building-blocks',
  templateUrl: './building-blocks.component.html'
})
export class Chapter1BuildingBlocksComponent implements OnDestroy {

  results: Array<string> = [];
  subscriptions: Array<Subscription> = [];
  stream$ = interval(250);

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  intervalButton(): void {
    this.results.push('');
    const index = this.results.length - 1;
    const observer = {
      next: value => this.results[index] += `${value} `
    }
    this.subscriptions.push(
      this.stream$.subscribe(observer)
    );
  }

  takeButton(): void  {
    this.results.push('');
    const index = this.results.length - 1;
    const observer = {
      next: value => this.results[index] += `${value} `,
      completed: () => this.results[index] = 'completed'
    }
    this.subscriptions.push(
      this.stream$
        .pipe(
          take(5)
        )
        .subscribe(observer)
    );
  }

  filterButton(): void  {
    this.results.push('');
    const index = this.results.length - 1;
    const observer = {
      next: value => this.results[index] += `${value} `,
      completed: () => this.results[index] = 'completed'
    }
    this.subscriptions.push(
      this.stream$
        .pipe(
          filter(value => value % 2 === 1)
        )
        .subscribe(observer)
    );
  }

  filterTakeButton(): void  {
    this.results.push('');
    const index = this.results.length - 1;
    const observer = {
      next: value => this.results[index] += `${value} `,
      completed: () => this.results[index] = 'completed'
    }
    this.subscriptions.push(
      this.stream$
        .pipe(
          filter(value => value % 2 === 1),
          take(5)
        )
        .subscribe(observer)
    );
  }

  takeFilterButton(): void  {
    this.results.push('');
    const index = this.results.length - 1;
    const observer = {
      next: value => this.results[index] += `${value} `,
      completed: () => this.results[index] = 'completed'
    }
    this.subscriptions.push(
      this.stream$
        .pipe(
          take(5),
          filter(value => value % 2 === 1)
        )
        .subscribe(observer)
    );
  }

  unsubscribe(): void {
    console.log('we are unsubscribing...');
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}