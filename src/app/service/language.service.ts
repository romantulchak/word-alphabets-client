import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LanguageDTO } from "../dto/language.dto";

const API_URL = `${environment.API_URL}language`;

@Injectable({
    providedIn:'root'
})
export class LanguageService{

    constructor(private http: HttpClient){}

    public findAllLanguages(): Observable<LanguageDTO[]>{
        return this.http.get<LanguageDTO[]>(`${API_URL}/all`)
        .pipe(take(1));
    }
}