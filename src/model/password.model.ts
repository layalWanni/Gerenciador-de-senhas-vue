import {AbstractEntity} from "./abstract-entity.model";

export class Password extends AbstractEntity{
    descricao! : string
    url! : string
    senha! : string

    constructor(){
        super();
        this.ativo = true
    }
}
