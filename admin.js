console.log("ADMIN VERSION 21-08-2026 17h07");

const URL_APPS_SCRIPT =
"https://script.google.com/macros/s/AKfycbwx9_RWV5PfuLBtjpT0C_VNYQoc604fwTGZhC2Jl0nfYI8debfm6i-Sroka81JCJYdW/exec";

const vehicules = [
    "413",
    "414",
    "415",
    "416",
    "417",
    "418",
    "419",
    "Logistique",
    "SMART"
];

async function chargerDashboard() {

    const response =
        await fetch(
            URL_APPS_SCRIPT +
            "?action=dashboard"
        );

    const data =
        await response.json();

    const container =
        document.getElementById(
            "vehiculesContainer"
        );

    container.innerHTML = "";

    let nbOk = 0;

    vehicules.forEach(v => {

        const ligne =
            data.find(
                item =>
                item[2].toString() === v.toString()
            );

        if(ligne){

            nbOk++;

            const date =
                new Date(ligne[4])
                .toLocaleDateString("fr-CH");

            container.innerHTML += `
            <div class="vehicule-card card-ok"
                 onclick="ouvrirHistorique('${v}')">

                <div class="card-header">
                    <span>${v}</span>
                    <span>✅</span>
                </div>

                <div class="card-km">
                    ${Number(ligne[3]).toLocaleString("fr-CH")} km
                </div>

                <div class="card-date">
                    ${date}
                </div>

            </div>
            `;

        } else {

            container.innerHTML += `
            <div class="vehicule-card card-ko"
                 onclick="ouvrirHistorique('${v}')">

                <div class="card-header">
                    <span>${v}</span>
                    <span>❌</span>
                </div>

                <div class="card-km">
                    Aucun relevé
                </div>

            </div>
            `;
        }

    });

    document.getElementById(
        "nbOk"
    ).innerHTML = nbOk;

    document.getElementById(
        "nbManquant"
    ).innerHTML =
    vehicules.length - nbOk;

}
chargerDashboard();
function ouvrirHistorique(vehicule){

    alert(
        "Historique du véhicule " +
        vehicule +
        " (à développer)"
    );

}
