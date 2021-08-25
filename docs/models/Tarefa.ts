import * as uniqid from "uniqid";
import { ListaDeTarefas } from "./ListaDeTarefas";
export class Tarefa{
    id: string;
    feita: boolean;
    texto:string;
    prioridade: Prioridade

    constructor(texto:string, prioridade:Prioridade){
        this.id = uniqid();
        this.texto = texto;
        this.prioridade = prioridade;
        this.feita = false;
    }

    imprimir():void{
        console.log(`${this.feita?"X":" "} ${this.texto} ${this.prioridade}`);
    }

    toRow():HTMLTableRowElement{
        let tr = document.createElement('tr');
        tr.className = this.feita?"done":"";
        tr.setAttribute("id", this.id);
        tr.innerHTML = `<td><input type="checkbox"></td>
                            <td>${this.texto}</td>
                            <td><i class="material-icons">delete</i>
                        </td>`;
        
        //  Marcando / Desmarcando tarefa como feita
        let checkbox =  tr.querySelector("input");
        checkbox.addEventListener('click',()=>{
            this.feita = checkbox.checked;
            tr.className = this.feita ? "done":"";
        });      
        
        return tr;
    }

    

}

export enum Prioridade{
    Baixa=1,
    Media=2,
    Alta=3
}