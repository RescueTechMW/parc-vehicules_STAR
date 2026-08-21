console.log("APP VERSION 21-08-2026 15h30");

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

const tbody =
document.querySelector(
    "#tableau tbody"
);

vehicules.forEach(v => {

    tbody.innerHTML += `
    <tr>
        <td>${v}</td>
        <td>-</td>
        <td>❌</td>
    </tr>
    `;

});
