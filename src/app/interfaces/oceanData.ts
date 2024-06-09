import { Especies } from './especies';
import {ProjetoConservacao} from './projetoConservacao';

export interface OceanData {
    regiao:String;
    temperaturaAgua: number;
    pH: number;
    nivelPoluicao: string;
    especies: Especies[];
    projetosConservacao: ProjetoConservacao[];
}