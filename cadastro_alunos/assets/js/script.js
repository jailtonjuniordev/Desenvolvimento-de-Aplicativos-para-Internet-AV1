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
