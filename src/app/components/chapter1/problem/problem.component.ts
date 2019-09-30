import { Component } from "@angular/core";

@Component({
  selector: 'fg-chapter1-problem',
  templateUrl: './problem.component.html',
})
export class Chapter1ProblemComponent {

  result: string = '';

  private _clearResult(): void {
    this.result = '';
  }

  arrayButton(): void {
    this._clearResult();
    const numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    const data = numbers
      .map(n => ({ number: n }))
      .filter(object => object.number <= 7);
    this.result = JSON.stringify(data);
  }

  intervalButton(): void {
    this._clearResult();
    let number = 0;
    let numbers = [];
    const handle = setInterval(() => {
      if (number <= 7) {
        const object = { number };
        numbers.push(object);
        this.result = JSON.stringify(numbers);
        number++;
      } else {
        clearInterval(handle);
      }
    }, 1000);
  }

  ajaxButton(): void {
    this._clearResult();
    const url = 'http://api.icndb.com/jokes/random/?limitTo=[nerdy]&escape=javascript';
    fetch(url)
      .then(response => response.json())
      .then(data => ({ 
        joke: data.value.joke,
        length: data.value.joke.length
      }))
      .then(object => {
        if (object.length >= 70) { 
          this.result = JSON.stringify(object);
        } else {
          this.result = 'This joke is too short...';
        }
      });
  }

}