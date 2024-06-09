import { Component } from '@angular/core';
import { menuService } from '../../services/menu.service';
import { OceanData } from '../../interfaces/oceanData'
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent {

    dados:OceanData[] = [];

    dadosForms: FormGroup = new FormGroup({});

    constructor(private service:menuService, private formBuilder: FormBuilder){

    }

    listar():void{
      this.service.listarOceanData().subscribe((listaDados) => (this.dados = listaDados));
    }

    ngOnInit():void{
      this.listar();
    }
}
