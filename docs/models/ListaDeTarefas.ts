import { Tarefa, Prioridade } from "./Tarefa"
export class ListaDeTarefas {
    tarefas: Tarefa[];
    input: HTMLInputElement;
    form: HTMLFormElement;
    tabela: HTMLTableElement;

    constructor(main: HTMLElement) {
        this.input = <HTMLInputElement>main.querySelector("#tf_2do");
        this.form = <HTMLFormElement>main.querySelector("#form");
        this.tabela = <HTMLTableElement>main.querySelector("#table");

        // Tentando carregar tarefas do localStorage
        let dados = window.localStorage.getItem("todolist");
        if (dados == null) {
            window.localStorage.setItem("todolist", "[]");
            this.tarefas = [];
        } else {

            this.tarefas = <Tarefa[]>JSON.parse(dados).map(
                t => {
                    let novaTarefa = new Tarefa(t.texto, t.prioridade);
                    novaTarefa.id = t.id;
                    return novaTarefa;
                }
            );
        }

        this.mostrarTarefas();

        // Quando o form for submetido, que adicione uma tarefa
        this.form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.adicionarTarefa();
        });
    }



    removerTarefa(t: Tarefa) {
        this.tarefas.splice(this.tarefas.indexOf(t), 1);
        window.localStorage.setItem("todolist", JSON.stringify(this.tarefas));
        document.getElementById(t.id).remove();
    }

    adicionarTarefa() {
        //verificar se o input tem alguma string, interrompe se não tiver!
        if (this.input.value == "") return;

        // Criar nova tarefa com prioridade baixa e com o texto digitado pelo usuario
        let t = new Tarefa(this.input.value, Prioridade.Baixa);

        // Adicionar a tarefa criada ao array de tarefas
        this.tarefas.push(t);

        // Salvar o array de tarefas no localstorage
        window.localStorage.setItem("todolist", JSON.stringify(this.tarefas));

        //criando a linha da tarefa
        let tr = t.toRow();
        tr.querySelector("i").addEventListener("click", () => {
            this.removerTarefa(t);
        })

        //Executar a exibir tarefas(tarefas)
        this.tabela.appendChild(tr);
        //Limpar o campo toda vez que a tarefa for adicionada
        this.input.value = "";
    }

    mostrarTarefas(): void {
        this.tabela.innerHTML = "";
        this.tarefas.forEach(
            t => {
                let tr = t.toRow();
                tr.querySelector("i").addEventListener("click",
                    () => {
                        this.removerTarefa(t);
                    }
                )
                this.tabela.appendChild(tr);
            }
        )
    }
}