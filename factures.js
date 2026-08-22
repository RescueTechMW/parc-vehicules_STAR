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
