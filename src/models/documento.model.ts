import { GenericListObject } from './generic-list-object.model';
import { Reuniao } from './reuniao.model';
 
export class Documento{
    id?:number;
    assunto: string;
    conteudo: string;
    identificador:string;
    dataCriacao:string;
    dataInicial:Date;
    dataFinal:Date;
    tipoDocumentoId:Number;
    enviada: boolean;
    mensagemGeral: boolean; //indica se eh enviada para todos
    mensagemSetor: boolean; //indica se eh uma mensagem para setores
    listSetoresIds: [];
    destinatariosIds: any[];
    faltasIds: any[];
    requerido: number;
    vinculo: number;
    rotinas: number[];
    outrasRotinas: GenericListObject[];
    informacoes: GenericListObject[];
    reuniao: Reuniao;
    usuarioId: number;
    origem: String;
}