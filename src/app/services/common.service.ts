import { Injectable } from '@angular/core';
import { Configuration } from '../models/configuration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  // getConfigurations function to fetch configuration data from a JSON file
  // In real application, it would be an API call to the server.
  getConfigurations() {
    return this.http.get<Configuration>('assets/json/configuration.json');
  }
}
