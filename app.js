console.log("APP VERSION 18-08-2026 14h30");

const vehicule =
document.getElementById("vehicule");

vehicule.value =
localStorage.getItem("vehicule")
|| "413";

vehicule.addEventListener(
    "change",
    chargerDernierReleve
);

    localStorage.setItem(
        "vehicule",
        vehicule.value
    );

});
async function chargerDernierReleve() {

    const vehicule =
        document.getElementById(
            "vehicule"
        ).value;

}
async function enregistrer() {

    const vehicule =
        document.getElementById("vehicule").value;

    const compteur =
        document.getElementById("kilometres").value;

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

    document.getElementById(
        "kilometres"
    ).focus();

    document.getElementById(
        "message"
    ).innerHTML =
    "✏️ Modification possible";
}

