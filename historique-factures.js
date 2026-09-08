const URL_APPS_SCRIPT =
"https://script.google.com/macros/s/AKfycbwx9_RWV5PfuLBtjpT0C_VNYQoc604fwTGZhC2Jl0nfYI8debfm6i-Sroka81JCJYdW/exec";

async function chargerHistorique() {

    const response =
    await fetch(
        URL_APPS_SCRIPT +
        "?action=historiqueFactures"
    );

    const data =
    await response.json();

    const factures = data
        .slice(1)
        .sort((a,b) =>
            new Date(b[0]) -
            new Date(a[0])
        );

    // =====================
    // DERNIERES FACTURES
    // =====================

    const dernieres =
    document.getElementById(
        "dernieresFactures"
    );

    dernieres.innerHTML = "";

    factures
    .slice(0,3)
    .forEach(f => {

        const date =
        new Date(f[0])
        .toLocaleDateString("fr-CH");

        dernieres.innerHTML += `
        <div class="vehicule-card card-ok">

            <div class="card-header">
                <span>🚑 ${f[3]}</span>
                <span>CHF ${f[6]}</span>
            </div>

            <div class="card-km">
                ${f[5]}
            </div>

            <div class="card-date">
                ${date}
            </div>

        </div>
        `;

    });

    // =====================
    // GROUPE PAR VHC
    // =====================

    const groupes = {};

    factures.forEach(f => {

        const vhc = f[3];

        if(!groupes[vhc]){
            groupes[vhc] = [];
        }

        groupes[vhc].push(f);

    });

    const container =
    document.getElementById(
        "historiqueContainer"
    );

    container.innerHTML = "";

Object.keys(groupes)
.sort()
.forEach(vhc => {

    const liste = groupes[vhc];

    const anneeActuelle =
    new Date().getFullYear();

    const facturesAnnee =
    liste.filter(
        f =>
        new Date(f[0]).getFullYear() ===
        anneeActuelle
    );

    const totalAnnee =
    facturesAnnee.reduce(
        (somme, f) =>
        somme + Number(f[6] || 0),
        0
    );

    let preview = "";

    liste
    .slice(0,3)
    .forEach(f => {

        const date =
        new Date(f[0])
        .toLocaleDateString("fr-CH");

        preview += `
        <div style="margin-bottom:8px;">
            ${date}<br>
            ${f[5]}<br>
            CHF ${f[6]}
        </div>
        `;

    });

    let details = "";

    liste
    .slice(3)
    .forEach(f => {

        const date =
        new Date(f[0])
        .toLocaleDateString("fr-CH");

        details += `
        <div style="margin-bottom:10px;">
            ${date}<br>
            ${f[5]}<br>
            CHF ${f[6]}
        </div>
        `;

    });

    container.innerHTML += `

    <div class="vehicule-card card-ok">

        <div class="card-header">

            <span>🚑 ${vhc}</span>

            <span>
                ${facturesAnnee.length} facture(s) ${anneeActuelle}
                <br>
                CHF ${totalAnnee.toFixed(2)}
            </span>

        </div>

        <div class="preview">
            ${preview}
        </div>

        <button
            class="btn-factures"
            onclick="
            const bloc=this.nextElementSibling;
            bloc.classList.toggle('open');

            this.innerText =
            bloc.classList.contains('open')
            ? 'Masquer'
            : 'Voir tout';
            ">
            Voir tout
        </button>

        <div class="factures-details">
            ${details}
        </div>

    </div>

    `;

});

}

chargerHistorique();
