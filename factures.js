console.log("APP VERSION 23-08-2026 12h12");

const vehicules = {
    "413": "VD 452753",
    "414": "VD 2632",
    "415": "VD 57590",
    "416": "VD 57601",
    "417": "VD 451038",
    "418": "VD 57687",
    "419": "VD 261616",
    "Logistique": "VD 395957",
    "SMART": "VD 57580"
};

const selectVehicule =
document.getElementById("vehicule");

const selectPlaque =
document.getElementById("plaque");

selectVehicule.addEventListener(
    "change",
    () => {

        selectPlaque.value =
        vehicules[
            selectVehicule.value
        ];

    }
);

selectPlaque.addEventListener(
    "change",
    () => {

        const vehicule =
        Object.keys(vehicules)
        .find(
            key =>
            vehicules[key] ===
            selectPlaque.value
        );

        if(vehicule){
            selectVehicule.value =
            vehicule;
        }

    }
);
const URL_APPS_SCRIPT =
"https://script.google.com/macros/s/AKfycbwx9_RWV5PfuLBtjpT0C_VNYQoc604fwTGZhC2Jl0nfYI8debfm6i-Sroka81JCJYdW/exec";

async function enregistrerFacture(){
    const dateFacture =
    document.getElementById("dateFacture").value;

    const vehicule =
    document.getElementById("vehicule").value;

    const plaque =
    document.getElementById("plaque").value;

   const detailListe =
document.getElementById(
    "detail"
).value;

const detailLibre =
document.getElementById(
    "detailLibre"
).value.trim();

let detailFinal = "";

if(
    detailListe !== "" &&
    detailLibre !== ""
){

    detailFinal =
    detailListe +
    " - " +
    detailLibre;

}
else if(
    detailListe !== ""
){

    detailFinal =
    detailListe;

}
else if(
    detailLibre !== ""
){

    detailFinal =
    detailLibre;

}

    const cout =
    document.getElementById("cout").value;

    let fournisseur =
document.getElementById(
    "fournisseur"
).value;

const nouveauFournisseur =
document.getElementById(
    "nouveauFournisseur"
).value;

if(nouveauFournisseur.trim() !== ""){
    fournisseur =
    nouveauFournisseur;
}

    const remarque =
    document.getElementById("remarque").value;

    const numeroFacture =
    document.getElementById("facture").value;

    const response =
    await fetch(
        URL_APPS_SCRIPT,
        {
            method:"POST",
            body: JSON.stringify({

    type:"facture",
    dateFacture,
    vehicule,
    plaque,
    detail: detailFinal,
    cout,
    fournisseur,
    remarque,
    numeroFacture

})
        }
    );

    const resultat =
    await response.json();

    if(resultat.success){

document.getElementById("vehicule").value = "";
document.getElementById("plaque").value = "";
document.getElementById("detail").value = "";
document.getElementById("detailLibre").value = "";
document.getElementById("cout").value = "";
document.getElementById("fournisseur").value = "";
document.getElementById("nouveauFournisseur").value = "";
document.getElementById("facture").value = "";
document.getElementById("remarque").value = "";
document.getElementById(
    "messageFacture"
).innerHTML =
"✅ Facture enregistrée avec succès";

setTimeout(() => {

    document.getElementById(
        "messageFacture"
    ).style.opacity = "0";

}, 4000);

setTimeout(() => {

    document.getElementById(
        "messageFacture"
    ).innerHTML = "";

    document.getElementById(
        "messageFacture"
    ).style.opacity = "1";

}, 5000);
       

    }

}
chargerListes();

async function chargerListes(){

    const repFournisseurs =
    await fetch(
        URL_APPS_SCRIPT +
        "?action=fournisseurs"
    );

    const fournisseurs =
    await repFournisseurs.json();

    const selectFournisseur =
    document.getElementById(
        "fournisseur"
    );

    selectFournisseur.innerHTML =
    "<option></option>";

    fournisseurs
    .slice(1)
    .forEach(f => {

        selectFournisseur.innerHTML += `
        <option>
            ${f[0]}
        </option>`;

    });

    const repDetails =
    await fetch(
        URL_APPS_SCRIPT +
        "?action=details"
    );

    const details =
    await repDetails.json();

   const selectDetail =
document.getElementById("detail");

selectDetail.innerHTML =
'<option value="">Choisir...</option>';
    

    details
    .slice(1)
    .forEach(d => {

        selectDetail.innerHTML += `
        <option>
            ${d[0]}
        </option>`;

    });

}
