console.log("APP VERSION 14-08-2026 10h45");

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

});

function enregistrer(){

    const km =
    document.getElementById(
        "kilometres"
    ).value;

    document.getElementById(
        "dernierKm"
    ).innerHTML =
    km + " km";

    document.getElementById(
        "derniereDate"
    ).innerHTML =
    new Date().toLocaleDateString("fr-CH");

    document.getElementById(
        "message"
    ).innerHTML =
    "✅ Kilométrage enregistré";

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
