import { Component } from '@angular/core';
import { menuService } from './../../services/menu.service';
import { ReactiveFormsModule } from '@angular/forms';
import { OceanData } from '../../interfaces/oceanData';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  dados: OceanData[] = [];
  dadosForm: FormGroup;

  constructor(private service: menuService, private formBuilder: FormBuilder) {
    this.dadosForm = this.formBuilder.group({
      regiao: [''],
      especies: [''],
      conservationStatus: [''],
      minTemperaturaAgua: [''],
      maxTemperaturaAgua: [''],
      phMin: [''],
      phMax: [''],
      nivelPoluicao: ['']
    });
  }

  ngOnInit(): void {
    this.dadosForm.valueChanges.subscribe(() => {
      this.listarFiltrado();
    });
    this.listar();
  }

  listar():void {
    const apiUrl = this.buildApiUrl();
    this.service.listarOceanData(apiUrl).subscribe((listaDados) => this.dados = listaDados);
  }

  listarFiltrado(): void {
    const apiUrl = this.buildApiUrl();
    this.service.listarOceanData(apiUrl).subscribe((listaDados) => {
      this.dados = listaDados;
    });
  }

  buildApiUrl(): string {
    let apiUrl = 'https://fiap-3sis-gs-20241.azurewebsites.net/OceanData?';

    const regiao = this.dadosForm.get('regiao')?.value || '';
    const especies = this.dadosForm.get('especies')?.value || '';
    const conservationStatus = this.dadosForm.get('conservationStatus')?.value || '';
    const minTemperaturaAgua = this.dadosForm.get('minTemperaturaAgua')?.value || '';
    const maxTemperaturaAgua = this.dadosForm.get('maxTemperaturaAgua')?.value || '';
    const phMin = this.dadosForm.get('phMin')?.value || '';
    const phMax = this.dadosForm.get('phMax')?.value || '';
    const nivelPoluicao = this.dadosForm.get('nivelPoluicao')?.value || '';

    if (regiao) {
      apiUrl += `${regiao}`;
    }
    if (especies) {
      apiUrl += `${especies}`;
    }
    if (conservationStatus) {
      apiUrl += `${conservationStatus}`;
    }
    if (minTemperaturaAgua) {
      apiUrl += `temperaturaMin=${minTemperaturaAgua}&`;
    }
    if (maxTemperaturaAgua) {
      apiUrl += `temperaturaMax=${maxTemperaturaAgua}&`;
    }
    if (phMin) {
      apiUrl += `phMin=${phMin}&`;
    }
    if (phMax) {
      apiUrl += `phMax=${phMax}&`;
    }
    if (nivelPoluicao) {
      apiUrl += `${nivelPoluicao}`;
    }
    
    console.log(`apiUrl: ${apiUrl}`);

    return apiUrl + '&pagina=1&qtde=20';
  }

  onSubmit(): void {
    this.listarFiltrado();
  }

}

