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
  private file: File;

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
      this.getFilePreview();
    }
  }

  public createFromFile(): void{
      this.alphabetService.createAlphabetFromFile('ua', this.file!).subscribe(
        res=>{
          console.log("Ok");
        }
      )
  }

  public initForm(): void{
    if(!this.alphabetGroup){
      this.findAllLanguages();
      this.alphabetGroup = this.formBuilder.group({
        alphabets: this.formBuilder.array([this.getAlphabetDataForForm()]),
      });
    }
  }

  public initLetters(index: number, numberOfLetters: string): void{
    const letters: string[] = [];
    const iterateOver = +numberOfLetters - 1;
    for (let i = 0; i < iterateOver; i++) {
      letters.push('');
    }
    this.setLetters(index, letters);  
  }

  public createFromForm(){
    console.log(this.alphabetGroup);
    const alphabetRequest = [this.alphabetGroup.value];
    this.alphabetService.createAlphabetFromForm(alphabetRequest).subscribe(
      res=>{
        console.log("Ok");
      }
    );
  }

  public addAlphabet(){
    this.alphabets.push(this.getAlphabetDataForForm());
  }

  public getLetters(index: number): FormArray{
    return this.alphabetGroup.get(`alphabets.${index}.letters`) as FormArray;
  }


  private getAlphabetDataForForm(languageCode: string = '', letters: string[] = []): FormGroup{
    return this.formBuilder.group({
      languageCode: [languageCode, [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
      letters: this.formBuilder.array(this.initLettersFromFile(letters))
    })
  }

  private initLettersFromFile(letters: string[] = []): FormControl[]{
    const lettersFormCotnrol: FormControl[] = [];
    if(letters.length !== 0){
      letters.forEach(letter => {
        lettersFormCotnrol.push(this.formBuilder.control(letter, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]));
      });
    }else{
      lettersFormCotnrol.push(this.formBuilder.control(letters, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]));
    }

    return lettersFormCotnrol;
  }

  private findAllLanguages(): void{
    this.languageService.findAllLanguages().subscribe(
      res=>{
        this.languages = res;
      }
    );
  }

  private getFilePreview(): void{
    this.alphabetService.getFilePreview(this.file).subscribe(
      res=>{
        this.initForm();
        const alpahbets: FormArray = this.formBuilder.array([]);
        res.forEach(alphabet => {
          alpahbets.push(this.getAlphabetDataForForm(alphabet.language.code, alphabet.letters));
        });
        this.alphabetGroup.setControl('alphabets', alpahbets)
        this.option = 'form'
      }
    )
  }

  private setLetters(index: number, values: string[]){
    const currentAlphabet = this.alphabets.get([index]) as FormGroup;
    currentAlphabet.setControl('letters', this.formBuilder.array(['']));
    values.forEach(value => {
      this.getLetters(index).push(this.formBuilder.control(value, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]));
    });
  }

  get alphabets(): FormArray{
    return this.alphabetGroup.get('alphabets') as FormArray;
  }
}
