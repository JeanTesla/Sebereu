import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl: String = "https://viacep.com.br/ws/"

@Injectable({
    providedIn: 'root'
})
export class GetCepInfoService {

    constructor(private httpClient: HttpClient) { }

    get(cep: string | null): Observable<any> {
        return this.httpClient.get(baseUrl + `${cep}/json/`);
    }
}
