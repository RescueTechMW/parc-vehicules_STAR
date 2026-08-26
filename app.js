console.log("APP VERSION 26-08-2026 10h40");

let dernierCompteur = 0;
const URL_APPS_SCRIPT =
"https://script.google.com/macros/s/AKfycbwx9_RWV5PfuLBtjpT0C_VNYQoc604fwTGZhC2Jl0nfYI8debfm6i-Sroka81JCJYdW/exec";

const vehicule =
document.getElementById("vehicule");

vehicule.value =
localStorage.getItem("vehicule")
|| "413";

vehicule.addEventListener("change", () => {

    localStorage.setItem(
        "vehicule",
        vehicule.value
    );

    chargerDernierReleve();

});

chargerDernierReleve();
async function chargerDernierReleve() {

    const vehiculeChoisi =
        document.getElementById("vehicule").value;

    const response =
        await fetch(
            URL_APPS_SCRIPT +
            "?vehicule=" +
            vehiculeChoisi
        );

    const data =
        await response.json();
    
   if(data){

    dernierCompteur =
    Number(data.compteur || 0);

    document.getElementById(
        "dernierVehicule"
    ).innerHTML = data.vehicule;

    document.getElementById(
        "dernierKm"
    ).innerHTML =
    dernierCompteur.toLocaleString("fr-CH")
    + " km";

    document.getElementById(
        "derniereDate"
    ).innerHTML =
    new Date(data.date)
    .toLocaleDateString("fr-CH");
}
    console.log(data);

    if(data){

        document.getElementById(
            "dernierVehicule"
        ).innerHTML =
        data.vehicule;

        document.getElementById(
            "dernierKm"
        ).innerHTML =
        Number(data.compteur)
        .toLocaleString("fr-CH")
        + " km";

        document.getElementById(
            "derniereDate"
        ).innerHTML =
        new Date(data.date)
        .toLocaleDateString("fr-CH");
    }
}
async function enregistrer() {

    const vehicule =
        document.getElementById("vehicule").value;

    const compteur =
        document.getElementById("kilometres").value;
    if(Number(compteur) <= dernierCompteur){

    document.getElementById(
        "message"
    ).innerHTML =
    "⚠️ Le kilométrage doit être supérieur au dernier relevé.";

    return;
}

    const aujourdHui =
        new Date();

    const mois =
        aujourdHui.toLocaleString(
            "fr-FR",
            { month: "long" }
        );

    const annee =
        aujourdHui.getFullYear();

    try {

        const response =
            await fetch(
                "https://script.google.com/macros/s/AKfycbwx9_RWV5PfuLBtjpT0C_VNYQoc604fwTGZhC2Jl0nfYI8debfm6i-Sroka81JCJYdW/exec",
                {
                    method: "POST",
                    body: JSON.stringify({
                        annee,
                        mois,
                        vehicule,
                        compteur
                    })
                }
            );

        const resultat =
            await response.json();

        if(resultat.success){
            localStorage.setItem(
    "dateDerniereSaisie",
    new Date().toISOString()
);

localStorage.setItem(
    "dernierVehiculeModifiable",
    vehicule.value
);
   const vehiculeChoisi =
document.getElementById("vehicule").value;

document.getElementById(
    "dernierVehicule"
).innerHTML =
vehiculeChoisi;

document.getElementById(
    "dernierKm"
).innerHTML =
Number(compteur).toLocaleString("fr-CH")
+ " km";

document.getElementById(
    "derniereDate"
).innerHTML =
new Date().toLocaleDateString("fr-CH");         

            document.getElementById(
                "message"
            ).innerHTML =
            "✅ Kilométrage enregistré";

        }

    } catch(error){

        document.getElementById(
            "message"
        ).innerHTML =
        "❌ Erreur d'enregistrement";

        console.error(error);

    }

}

function modifierDernier(){

    const dateSaisie =
    new Date(
        localStorage.getItem(
            "dateDerniereSaisie"
        )
    );

    const maintenant =
    new Date();

    const difference =
    (maintenant - dateSaisie)
    /
    1000
    /
    60;

    if(difference > 10){

        document.getElementById(
            "message"
        ).innerHTML =
        "❌ Modification expirée.";

        return;
    }

    document.getElementById(
        "kilometres"
    ).focus();

    document.getElementById(
        "message"
    ).innerHTML =
    "✏️ Modification possible";

}
`

