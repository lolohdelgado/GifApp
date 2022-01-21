import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial : string[] = [];
  private apiKey     : string = 'mjzmfeBI5CLrC2uMUbMowb0UoA5XpWHY';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  public resultados  : Gif[] = [];

  get historial() {

    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    /*   trabajara con observables los cuales son mas poderosos que las promesas */
    /* if (localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    } */

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }


  buscarGifs( query: string) {
    
    query = query.trim().toLocaleLowerCase();

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    console.log(params);

    if( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    }

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
        .subscribe( (resp) => {
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
        });

  }
}
