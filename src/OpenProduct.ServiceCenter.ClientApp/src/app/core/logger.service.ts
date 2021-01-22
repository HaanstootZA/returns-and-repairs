import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable, OperatorFunction } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Logger {

  constructor() { }

  public unitOfWork(message: string): void {

  }

  public threadSensitive(message: string): void {

  }

  public behaviour(message: string): void {

  }

  public debug(message: string): void {

  }

  public expectedError(message: string, error?: Error): void {

  }

  public resolveError(message: string, error: Error): void {

  }

  public failure(message: string, error: Error): void {

  }

  public crash(message: string, error: Error): void {

  }

  public handleError<T>(operation = 'operation'): OperatorFunction<T, T> {
    // tslint:disable-next-line: no-any
    return (error: any): Observable<T> => {
      this.resolveError(`${operation} failed: ${error.message}`, new Error(error));
      return throwError('An error has occurred while trying to access an HTTP server');
    };
  }
}
