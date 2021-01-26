import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable, OperatorFunction } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Logger {

  constructor() { }

  public unitOfWork(message: string): void {
    console.log(message);
  }

  public threadSensitive(message: string): void {
    console.log(message);

  }

  public behaviour(message: string): void {
    console.log(message);

  }

  public debug(message: string): void {
    console.log(message);

  }

  public debugResponse<TResult>(result: TResult | TResult[], target: string): void {
    if (result === null || (result instanceof Array && result.length === 0)) {
      this.debug(`${target} returned no result`);
      return;
    }

    this.debug(`${target} returned successfuly`);
  }

  public expectedError(message: string, error?: Error): void {
    console.log(message);
  }

  public resolveError(message: string, error: Error): void {
    console.log(message);
  }

  public failure(message: string, error: Error): void {
    console.log(message);
  }

  public crash(message: string, error: Error): void {
    console.log(message);
  }

  public handleError<T>(operation = 'operation'): OperatorFunction<T, T> {
    // tslint:disable-next-line: no-any
    return (error: any): Observable<T> => {
      this.resolveError(`${operation} failed: ${error.message}`, new Error(error));
      return throwError('An error has occurred while trying to access an HTTP server');
    };
  }
}
