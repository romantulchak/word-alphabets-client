import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public languages: LanguageDTO[];
  private file: File | undefined;

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
    if(!this.alphabetGroup){
      this.findAllLanguages();
      this.alphabetGroup = this.formBuilder.group({
        languageCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
        letters: this.formBuilder.array([''])
      });
    }
  }

  public initLetters(numberOfLetters: string): void{
    const letters: string[] = [];
    const iterateOver = +numberOfLetters - 1;
    for (let i = 0; i < iterateOver; i++) {
      letters.push('');
    }
    this.setLetters = letters;  
  }

  private findAllLanguages(): void{
    this.languageService.findAllLanguages().subscribe(
      res=>{
        this.languages = res;
      }
    );
  }

  get letters(){
    return this.alphabetGroup.get('letters') as FormArray;
  }

  set setLetters(values: string[]){
    this.alphabetGroup.setControl('letters', this.formBuilder.array(['']));
    values.forEach(value => {
      this.letters.push(this.formBuilder.control(value));
    });
    this.letters.reset();
  }
}
