const URL_APPS_SCRIPT =
"https://script.google.com/macros/s/AKfycbwx9_RWV5PfuLBtjpT0C_VNYQoc604fwTGZhC2Jl0nfYI8debfm6i-Sroka81JCJYdW/exec";

async function chargerHistorique(){

    const response =
    await fetch(
        URL_APPS_SCRIPT +
        "?action=historiqueFactures"
    );

    const data =
    await response.json();

    const container =
    document.getElementById(
        "historiqueContainer"
    );

    container.innerHTML = "";

   const factures = data
  .slice(1)
  .sort((a, b) => {
      return new Date(b[0]) - new Date(a[0]);
  });

factures.forEach(f => {

        const date =
        new Date(f[0])
        .toLocaleDateString("fr-CH");

        container.innerHTML += `
        <div class="vehicule-card card-ok">

            <div class="card-header">

                <span>${f[3]}</span>

                <span>
                CHF ${f[6]}
                </span>

            </div>

            <div class="card-km">
                ${f[7]}
            </div>

            <div class="card-date">
                ${f[5]}
            </div>

            <div class="card-date">
                ${date}
            </div>

        </div>
        `;

    });

}

chargerHistorique();
