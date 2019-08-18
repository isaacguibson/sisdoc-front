export interface Documento{
    id?:number;
    conteudo: string;
    identificador:string;
    dataInicial:Date;
    dataFinal:Date;
    tipoDocumentoId:number;
}