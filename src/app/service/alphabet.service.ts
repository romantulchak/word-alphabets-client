import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const API_URL = `${environment.API_URL}alphabet`;

@Injectable({
    providedIn:'root'
})
export class AlphabetService{

    constructor(private http: HttpClient){}

    public createLanguageFromFile(languageCode: string, file: File): Observable<void>{
        const formData = new FormData();
        formData.append('languageCode', languageCode);
        formData.append('file', file);
        return this.http.post<void>(`${API_URL}/create-from-file`, formData);
    }
}