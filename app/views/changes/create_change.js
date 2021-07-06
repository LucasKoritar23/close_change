function create_change() {
    event.preventDefault();
    Swal.fire({
        title: 'Deseja solicitar o encerramento da change com os dados inseridos?',
        text: "Confirme os campos preenchidos",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não, preciso corrigir campos',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            create_html_body();
        } else if (result.isDenied) {
        }
    })
}

function format_date(date, time) {
    event.preventDefault();
    return date + "T" + time + ":00"
}

function validate_dates(initial_date, final_date) {
    event.preventDefault();

    init = Date.parse(initial_date)
    final = Date.parse(final_date)
    current = new Date();

    if (init > final) {
        console.log("Datas incorretas");
        return true
    }

    if (init > current || final > current) {
        console.log("Datas superiores a atual");
        return true
    }
}

function create_html_body() {
    let uri = "http://localhost:8080/changes"
    let nome = document.getElementById("nome").value
    let tribo = document.getElementById("tribo").value
    let squad = document.getElementById("squad").value
    let numero_change = document.getElementById("numero_change").value
    let link_change = document.getElementById("link_change").value
    let rollback = document.querySelector('input[name="rollback"]:checked').value
    let hotfix = document.querySelector('input[name="hotfix"]:checked').value

    let date_ini = document.getElementById("date_ini").value
    let time_ini = document.getElementById("time_ini").value

    let date_fin = document.getElementById("date_fin").value
    let time_fin = document.getElementById("time_fin").value

    initial_date = format_date(date_ini, time_ini);
    final_date = format_date(date_fin, time_fin);

    if (validate_dates(initial_date, final_date)) {
        Swal.fire({
            icon: 'error',
            title: 'Existem inconsistências nas datas',
            text: 'Corrija e tente novamente!'
        })
        window.location.href();
    }

    let lead = document.getElementById("lead").value
    let link_evidencia = document.getElementById("link_evidencia").value
    let observacoes = document.getElementById("observacoes").value

    body = {
        "qa": nome,
        "tribo": tribo,
        "squad": squad,
        "numero_change": numero_change,
        "link_change": link_change,
        "rollback": rollback,
        "hotfix": hotfix,
        "horario_change": initial_date,
        "horario_fim_change": final_date,
        "lead": lead,
        "link_evidencia": link_evidencia,
        "observacoes": observacoes
    }

    console.log("Campos Recebidos do Front:" + JSON.stringify(body))
    post_create_change(uri, body)
}

function post_create_change(uri, body) {
    event.preventDefault();
    let request = new XMLHttpRequest()
    request.open("POST", uri, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function () {
        console.log(this.responseText)
        let status = this.status
        var id_change = JSON.parse(this.responseText).id
        var lead = JSON.parse(this.responseText).lead
        console.log(status)
        if (status == 201) {
            Swal.fire(
                'Solicação de encerramento de Change enviada ao Lead: ' + lead,
                'Id da Change: ' + id_change,
                'success'
            ).then(function () {
                window.location.reload();
            })
        } else {
            Swal.fire(
                'Falha ao solicitar o encerramento da Change enviada ao Lead: ' + lead,
                'code: ' + this.status + ' error: ' + this.responseText,
                'error'
            ).then(function () {
                window.location.reload();
            })
        }
    }
}
