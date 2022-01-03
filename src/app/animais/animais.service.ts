import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from '../autenticacao/token.service';
import { Animais, animal } from './animais';

const API = environment.apiURL;
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {
  constructor(private htpp: HttpClient, private tokenService: TokenService) { }

   listaDeUsuario(nomeDeUsuario: string): Observable<Animais>{
     return this.htpp.get<Animais>(`${API}/${nomeDeUsuario}/photos`,);
   }

   buscaPorId(id: number): Observable<animal>{
    return this.htpp.get<animal>(`${API}/photos/${id}`);
   }

   excluiAnimal(id: number): Observable<animal>{
     return this.htpp.delete<animal>(`${API}/photos/${id}`);
   }

   curtir(id:number): Observable<boolean>{
    return this.htpp
    .post(`${API}/photos/${id}/like`,{},{ observe: 'response'})
    .pipe(
      mapTo(true),
      catchError((error) => {
        return error.status === NOT_MODIFIED ? of(false) : throwError(error);
      })
    );
   }
}
