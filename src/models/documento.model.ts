import { GenericListObject } from './generic-list-object.model';
import { Reuniao } from './reuniao.model';
 
export class Documento{
    id?:number;
    assunto: string;
    conteudo: string;
    identificador:string;
    dataInicial:Date;
    dataFinal:Date;
    tipoDocumentoId:number;
    enviada: boolean;
    mensagemGeral: boolean; //indica se eh enviada para todos
    mensagemSetor: boolean; //indica se eh uma mensagem para setores
    listSetoresIds: [];
    destinatariosIds: [];
    requerido: number;
    vinculo: number;
    rotinas: number[];
    outrasRotinas: GenericListObject[];
    informacoes: GenericListObject[];
    reuniao: Reuniao;
}