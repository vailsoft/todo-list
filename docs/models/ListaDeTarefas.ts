import { Tarefa, Prioridade} from "./Tarefa"
export class ListaDeTarefas{
    tarefas:Tarefa[];
    input:HTMLInputElement;
    form:HTMLFormElement;
    tabela:HTMLTableElement;

    constructor(main:HTMLElement){
        this.input  = <HTMLInputElement>main.querySelector("#tf_2do");
        this.form   = <HTMLFormElement>main.querySelector("#form");
        this.tabela = <HTMLTableElement>main.querySelector("#table");
        this.tarefas = [];

        // Quando o form for submetido, que adicione uma tarefa
        this.form.addEventListener("submit",(evt)=>{
            evt.preventDefault();
            this.adicionarTarefa();
        });
    }



    removerTarefa(t:Tarefa){
        this.tarefas.splice(this.tarefas.indexOf(t),1);
        document.getElementById(t.id).remove(); 
        console.log(this.tabela);      
    }

    adicionarTarefa(){
        //verificar se o input tem alguma string, interrompe se não tiver!
        if(this.input.value == "") return;
        // Criar nova tarefa com prioridade baixa e com o texto digitado pelo usuario
        let t = new Tarefa(this.input.value, Prioridade.Baixa);
        // Adicionar a tarefa criada ao array de tarefas
        this.tarefas.push(t);

        //criando a linha da tarefa
        let tr = t.toRow();
        tr.querySelector("i").addEventListener("click",()=>{
            this.removerTarefa(t);
        })

        //Executar a exibir tarefas(tarefas)
        this.tabela.appendChild(tr);
        //Limpar o campo toda vez que a tarefa for adicionada
        this.input.value = "";
        console.log(this.tabela);

    }

    mostrarTarefas():void{
        // Limpar tabela
        this.tabela.innerHTML = "";
        // Mostrar tarefas no HTML
        for(let tarefa of this.tarefas){
            this.tabela.appendChild(tarefa.toRow());
        }
    } 
}