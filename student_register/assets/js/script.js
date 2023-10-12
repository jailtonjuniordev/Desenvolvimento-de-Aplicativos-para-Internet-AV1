function localizarCep() {

    fetch(`https://viacep.com.br/ws/${document.querySelector("#cep").value}/json/`).then(data => {
        return data.json();
    })
        .then(data => {
            document.querySelector("#logradouro").value = data.logradouro
            document.querySelector("#cidade").value = data.localidade
            document.querySelector("#bairro").value = data.bairro
            document.querySelector("#estado").value = data.uf
        }).catch(error => {
        console.log(error)
    });
}

function salvarAluno() {
    let nomeCompleto = document.getElementById("nomeCompleto").value;
    let dataNascimento = document.getElementById("dataNascimento").value;
    let etapaEnsino = document.getElementById("etapaEnsino").value;
    let serie = document.getElementById("serie").value;
    let logradouro = document.getElementById("logradouro").value;
    let numero = document.getElementById("numero").value;
    let complemento = document.getElementById("complemento").value;
    let cidade = document.getElementById("cidade").value;
    let bairro = document.getElementById("bairro").value;
    let estado = document.getElementById("estado").value;
    let cep = document.getElementById("cep").value;

    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    let matricula = alunos.length + 1;

    let aluno = {
        matricula: matricula,
        nomeCompleto: nomeCompleto,
        dataNascimento: dataNascimento,
        etapaEnsino: etapaEnsino,
        serie: serie,
        endereco: {
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            cidade: cidade,
            bairro: bairro,
            estado: estado,
            cep: cep
        }
    };

    alunos.push(aluno);

    localStorage.setItem("alunos", JSON.stringify(alunos));

    alert("Aluno adicionado com sucesso!");
}

function popularTabela() {
    let tabela = document.querySelector("table tbody");
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    alunos.forEach(function(aluno, index) {
        let newRow = tabela.insertRow();
        newRow.insertCell().textContent = aluno.matricula;
        newRow.insertCell().textContent = aluno.nomeCompleto;
        newRow.insertCell().textContent = aluno.etapaEnsino;
        newRow.insertCell().textContent = aluno.serie;
        newRow.insertCell().textContent = aluno.endereco.cep;

        let cellAcao = newRow.insertCell();
        let icon = document.createElement("i");
        icon.classList.add("fas", "fa-trash-alt");
        icon.style.cursor = "pointer";
        icon.addEventListener("click", function() {
            excluirAluno(index);
        });
        cellAcao.appendChild(icon);
    });
}

function excluirAluno(index) {
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    if (index >= 0 && index < alunos.length) {
        alunos.splice(index, 1);

        localStorage.setItem("alunos", JSON.stringify(alunos));

        alert("Aluno excluído com sucesso!");

        location.reload();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    popularTabela();
});
