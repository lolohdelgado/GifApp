import { Component} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultaods',
  templateUrl: './resultaods.component.html',
  styles: [
  ]
})
export class ResultaodsComponent{

  get resultados() {
    return this.gifsService.resultados;
  }

  constructor(private gifsService: GifsService) {}

}
