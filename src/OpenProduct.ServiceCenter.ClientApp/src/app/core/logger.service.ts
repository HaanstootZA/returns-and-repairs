import { Injectable } from '@angular/core';

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
}
