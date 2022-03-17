import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LanguageDTO } from './dto/language.dto';
import { AlphabetService } from './service/alphabet.service';
import { LanguageService } from './service/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public createAlphabetFromForm: boolean = false;
  public fileName: string = 'Upload file';
  public option: 'form' | 'file' = 'file';
  public isFileSelected: boolean = false;
  public alphabetGroup: FormGroup;
  private file: File | undefined;
  private languages: LanguageDTO[];

  constructor(private alphabetService: AlphabetService,
              private languageService: LanguageService,
              private formBuilder: FormBuilder){}

  ngOnInit(): void {
  }

  public selectFile(files: FileList | null): void{
    if(files){
      this.file = files[0];
      this.fileName = this.file.name;
      this.isFileSelected = true;
    }
  }

  public createFromFile(): void{
      this.alphabetService.createLanguageFromFile('ua', this.file!).subscribe(
        res=>{
          console.log("Ok");
          
        }
      )
  }

  public initForm(): void{
    if(this.option !== 'form'){
      this.alphabetGroup = this.formBuilder.group({

      });
    }
  }

  private findAllLanguages(): void{
    this.languageService.findAllLanguages().subscribe(
      res=>{
        this.languages = res;
      }
    );
  }
}
