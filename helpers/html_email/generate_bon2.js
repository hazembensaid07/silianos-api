const generate_bon_html2 = ({
  nomHotel,
  rooms,
  arrive,
  dateD,
  nuits,
  Cin,
  name,
  tel,
  email,
  logement,
  occupation,
  message,
  _id,
  price,
  num,
}) => `    
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>voucher</title>
  </head>
  <body>
    <nav class="navbar">
      <div class="left-container">
        <div class="left-logo-container"><img src="https://res.cloudinary.com/dml9ph1zz/image/upload/v1655481113/logo1_qcqn4p.png" alt="" /></div>
      </div>
      <div class="right-container">
       
      
        <div class="right-logo-container">
          <img src="https://res.cloudinary.com/dml9ph1zz/image/upload/v1655481114/logo_1_azuoin.png" alt="" />
        </div>
      </div>
    </nav>
    <main>
     <h3>VOUCHER HÔTEL N° ${num}</h3>
      <div class="info-box">
        <div class="header-container">
          <h4>DÉTAILS DE VOTRE RÉSERVATION</h4>
        </div>
        <div class="info-container">
          <div class="one-info">
            <p class="info-title">N Bon de Réservation</p>
            <p class="detail"> Payé</p>
          </div>
          
        
          <div class="one-info">
            <p class="info-title">Distributeur :</p>
            <p class="detail">Silianos Voyage</p>
          </div>
          <div class="one-info">
            <p class="info-title">Nom du client :</p>
            <p class="detail">${name}</p>
          </div>
           <div class="one-info">
            <p class="info-title">CIN :</p>
            <p class="detail">${Cin}</p>
          </div>
        
        </div>
      </div>

      <div class="info-box">
        <div class="header-container">
          <h4>DÉTAILS DE VOTRE SÉJOUR</h4>
        </div>
        <div class="info-container">
          <div class="one-info">
            <p class="info-title">Hôtel :</p>
            <p class="detail">${nomHotel}</p>
          </div>
          <div class="one-info">
            <p class="info-title">Téléphone :</p>
            <p class="detail">${tel}</p>
          </div>
          <div class="one-info">
            <p class="info-title">Date d'arrivée :</p>
            <p class="detail">${arrive}</p>
          </div>
          <div class="one-info">
            <p class="info-title">Date de départ :</p>
            <p class="detail">${dateD}</p>
          </div>
          <div class="one-info">
            <p class="info-title">Durée du séjour :</p>
            <p class="detail"> ${nuits} nuits</p>
          </div>
       
           <div class="one-info">
            <p class="info-title">Arrangement  :</p>
            <p class="detail"> ${logement}</p>
          </div>
          <div class="one-info">
            <p class="info-title">NB: :</p>
            <p class="detail"> ${message}</p>
          </div>
        </div>
      </div>
      <div style="margin-top: 8px"></div>
      <div class="info-box">
        <table>
          <thead>
           
            <th>Adules</th>
            <th>Enfants</th>
            <th>Bébés</th>
            
          </thead>
             ${rooms
               .map(
                 (r) => ` <tr>
         
            <td><div class="center">${r.nombreAdulte}</div></td>
            <td><div class="center">${r.nombreEnfants12ans}</div></td>
            <td><div class="center">${r.nombreEnfants2ans}</div></td>
           
          </tr>`
               )
               .join("")}
              
         
        </table>
      </div>

      <div style="margin-top: 12px"></div>
      <div class="info-box">
        <div class="header-container">
          <h4>NOMS DES OCCUPANTS</h4>
        </div>
        <table>
          <thead>
            <th>Type</th>
            <th>Civilité</th>
            <th>Nom</th>
            <th>Prénom</th>
           
          </thead>
         
                ${occupation
                  .map((r) =>
                    r.map(
                      (el) => ` <tr>
            <td>${el.type}</td>
            <td>${el.civ}</td>
            <td>${el.firstname}</td>
            <td>${el.lastname}</td>
           
          </tr>`
                    )
                  )
                  .join("")}
          
        </table>
      </div>
      <div class="info-box">
        <div class="header-container">
          <h4>NOTE IMPORTANTE</h4>
        </div>
        <p class="bold-text">
          Une taxe touristique de séjour est appliquée à tous les clients (+12
          ans) par nuitée, payable par le client à son départ de l’hôtel contre
          un reçu de 2 DT/nuitée/Adulte (pour hôtel 2* et 3*) et 3
          DT/nuitée/Adulte (pour hôtel 4* et 5*) . Cette taxe n'est pas
          applicable à partir de la 8ème nuitée
        </p>
        <p class="small-text">
          Vous pouvez effectuer votre check-in à partir de 15:00 et le check-out
          doit être effectué au plus tard à 11:00
        </p>
          <p>8050 Hammamet - TuAvenue Bizerte 6100,Siliana,Tunisie</p>
        <p>Tel: +216 29 400 823</p>
      </div>
      <div
        class="info-box center"
        style="flex-direction: column; margin-top: 2rem"
      >
       
        <p class="note-important">
          Veuillez imprimer ce bon voucher et le présenter à la réception à
          votre arrivée à l'hôtel
        </p>
        
      </div>
    </main>
    <footer>
     
      <p class="bold-text">Page 1/1</p>
    </footer>
  </body>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }
    .navbar {
      display: flex;
      justify-content: space-between;

      padding-left: 2rem;
      padding-right: 2rem;
      padding-top: 12px;
    }
       .left-logo-container { 
      justify-content : center;
    }
    .left-logo-container > img {
      height: 100px;
    }
    .right-logo-container > img {
      height: 80px;
    }
    .right-container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .right-container p {
      margin-bottom: 0.15rem;
      text-align: right;
      width: 100%;
      color: gray;
      font-size: 10px;
    }
    .right-logo-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    main {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .info-box {
      margin-top: 0.5rem;
      width: 100%;
      max-width: 94%;
    }
    .header-container {
      -webkit-print-color-adjust: exact;
      padding-left: 0.5rem;
      width: 100%;
      font-size: 14px;
      font-weight: bold;
      background-color: #ededed;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      border-left: 4px solid #1573a1;
    }
    .info-container {
      margin-top: 14px;
      padding-bottom: 1rem;
      font-size: 15px;
      max-width: 94%;
      display: flex;
      flex-direction: column;
      padding-left: 4rem;
    }
    .one-info {
      margin-bottom: 4px;
      display: flex;
      flex-direction: row;
    }
    .info-title {
      color: black;
      font-size: 13px;
      font-weight: 400;
    }
    .detail {
      font-weight: bold;
      font-size: 14px;
      margin-left: 10px;
    }
    table {
      font-size: 12px;
      width: 100%;
      margin-top: 14px;
      max-width: 99%;
      margin-inline: auto;
    }
    table th {
      margin-left: 20px;
      border-bottom: #1573a1 1px solid;
      color: #1573a1;
    }
    table td {
      font-size: 13px;
      font-weight: 600px;
    }
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bold-text {
      font-size: 12px;
      font-weight: bold;
      padding-left: 2rem;
      padding-top: 0.75rem;
    }

    .small-text {
      font-size: 12px;
      font-weight: bold;
      width: fit-content;
      padding-left: 2rem;
      padding-top: 0.5rem;
    }
    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-left: 2rem;
      padding-right: 2rem;
    }
    .note-important {
      font-size: 14px;
    }

    .note-important + .center {
      flex-direction: column;
    }
  </style>
</html>         
`;

module.exports = generate_bon_html2;
