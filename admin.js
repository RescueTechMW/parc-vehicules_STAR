console.log("ADMIN VERSION 24-08-2026 17h10");

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
const maintenant =
new Date();

const moisActuel =
maintenant.toLocaleString(
    "fr-FR",
    { month: "long" }
);

const anneeActuelle =
maintenant.getFullYear();
    vehicules.forEach(v => {

      const ligne =
    data.find(
        item =>
        item[0] == anneeActuelle &&
        item[1] == moisActuel &&
        item[2].toString() === v.toString()
    );
        console.log("vehicule recherché :", v);
console.log("ligne trouvée :", ligne);

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
async function ouvrirHistorique(vehicule){

    const response =
    await fetch(
        URL_APPS_SCRIPT +
        "?action=historiqueVehicule" +
        "&vehicule=" +
        vehicule
    );

    const data =
    await response.json();

    const contenu =
    document.getElementById(
        "contenuModal"
    );

    contenu.innerHTML =
    `<h2>🚑 Véhicule ${vehicule}</h2>`;

   const historique =
data.sort((a,b) => {

    return a[0] - b[0];

});

for(let i = historique.length -1; i > 0; i--){

    const compteurActuel =
    Number(historique[i][3]);

    const compteurPrecedent =
    Number(historique[i-1][3]);

    const kmMois =
    compteurActuel -
    compteurPrecedent;

    contenu.innerHTML += `
    <div class="last-km">

        <div class="last-label">
            ${historique[i][1]} ${historique[i][0]}
        </div>

        <div class="last-value">
            ${kmMois.toLocaleString("fr-CH")} km
        </div>

    </div>
    `;
}

    contenu.innerHTML += `

    <button
        class="btn-factures"
        onclick="fermerModal()">

        Fermer

    </button>

    `;

    document.getElementById(
        "modalVehicule"
    ).style.display =
    "block";

}
function fermerModal(){

    document.getElementById(
        "modalVehicule"
    ).style.display =
    "none";

}
chargerDashboard();

window.onclick = function(event){

    const modal =
    document.getElementById(
        "modalVehicule"
    );

    if(event.target == modal){

        fermerModal();

    }

}

