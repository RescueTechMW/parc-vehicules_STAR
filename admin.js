console.log("ADMIN VERSION 21-08-2026 16h47");

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

    const tbody =
        document.querySelector(
            "#tableau tbody"
        );

    tbody.innerHTML = "";

    let nbOk = 0;

    vehicules.forEach(v => {

        const ligne =
            data.find(
                item =>
                String(item[2]) === String(v)
            );

        if(ligne){

            nbOk++;

            tbody.innerHTML += `
            <tr>
                <td>${v}</td>
                <td>${Number(ligne[3]).toLocaleString("fr-CH")}</td>
                <td>✅</td>
            </tr>
            `;

        } else {

            tbody.innerHTML += `
            <tr>
                <td>${v}</td>
                <td>-</td>
                <td>❌</td>
            </tr>
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
