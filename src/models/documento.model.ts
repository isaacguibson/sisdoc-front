export interface Documento{
    id?:number;
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
}