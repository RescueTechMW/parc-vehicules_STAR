console.log("APP VERSION 14-08-2026 10h37");

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
    document.getElementById("kilometres").value;

    document.getElementById(
        "message"
    ).innerHTML =
    "✅ " +
    vehicule.value +
    " : " +
    km +
    " km enregistré";

}
