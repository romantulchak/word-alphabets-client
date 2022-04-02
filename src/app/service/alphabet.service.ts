import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateAlphabetRequest } from "../request/create-alphabet.request";
import { take } from 'rxjs/operators';
import { FilePreviewDTO } from "../dto/file-preview.dto";

const API_URL = `${environment.API_URL}alphabet`;

@Injectable({
    providedIn:'root'
})
export class AlphabetService{

    constructor(private http: HttpClient){}

    public createAlphabetFromFile(languageCode: string, file: File): Observable<void>{
        const formData = new FormData();
        formData.append('languageCode', languageCode);
        formData.append('file', file);
        return this.http.post<void>(`${API_URL}/create-from-file`, formData)
        .pipe(take(1));
    }
    
    public createAlphabetFromForm(alphabetRequest: CreateAlphabetRequest[]): Observable<void>{
        return this.http.post<void>(`${API_URL}/create`, alphabetRequest)
        .pipe(take(1));
    }

    public getFilePreview(file: File): Observable<FilePreviewDTO[]>{
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<FilePreviewDTO[]>(`${API_URL}/preview`, formData);
    }
}