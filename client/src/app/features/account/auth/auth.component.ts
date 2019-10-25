import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/app/shared/model/country.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  private apiUrl = 'https://localhost:5001/weatherforecast';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<Country[]>(this.apiUrl).subscribe(
      request => console.log(request)
    );
  }

}
