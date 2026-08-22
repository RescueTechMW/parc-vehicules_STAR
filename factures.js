console.log("APP VERSION 22-08-2026 10h20");

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

    const vehicule =
    document.getElementById("vehicule").value;

    const plaque =
    document.getElementById("plaque").value;

    const detail =
    document.getElementById("detail").value;

    const cout =
    document.getElementById("cout").value;

    const fournisseur =
    document.getElementById("fournisseur").value;

    const remarque =
    document.getElementById("remarque").value;

    const numeroFacture =
    document.getElementById("facture").value;

    const response =
    await fetch(
        URL_APPS_SCRIPT,
        {
            method:"POST",
            body:JSON.stringify({

                type:"facture",
                vehicule,
                plaque,
                detail,
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

        alert(
            "✅ Facture enregistrée"
        );

    }

}
