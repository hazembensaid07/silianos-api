const Hotel = require("../../models/hotel");

exports.getBooking = async (req, res) => {
  try {
    const PAGE_SIZE = 5;
    const page = parseInt(req.query.page || "0");
    const { rooms, nombres_nuits, region } = req.body;
    let hotels = [];
    let bookings = [];
    hotels = await Hotel.find();
    if (region && region !== "") {
      hotels = hotels.filter((item) =>
        item.ville.toLowerCase().includes(region)
      );
    }
    hotels = hotels.filter((item) => item.totalchambre !== 0);
    for (const obj of hotels) {
      for (const price of obj.prices) {
        if (price.discount !== 0) {
          pricelpd =
            price.pricelpdadulte -
            price.pricelpdadulte * (price.discount / 100);
          pricepc =
            price.pricepcadulte - price.pricepcadulte * (price.discount / 100);
          pricedp =
            price.pricedpadulte - price.pricedpadulte * (price.discount / 100);
          priceallinsoft =
            price.priceallinsoftadulte -
            price.priceallinsoftadulte * (price.discount / 100);
          priceallin =
            price.priceallinadulte -
            price.priceallinadulte * (price.discount / 100);
          price.pricelpdadulte = pricelpd;
          price.pricepcadulte = pricepc;
          price.pricedpadulte = pricedp;
          price.priceallinsoftadulte = priceallinsoft;
          price.priceallinadulte = priceallin;
        }
      }
    }

    if (hotels.length === 0) {
      res.status(400).send({ message: "Pas d'offres disponible" });
    } else {
      for (const item of hotels) {
        for (const price of item.prices) {
          var price_lpd = 0;
          var price_dp = 0;
          var price_pc = 0;
          var price_all_in_soft = 0;
          var price_all_in = 0;
          for (const el of rooms) {
            if (
              el.nombres_adultes === 1 &&
              el.nombre_enfants2ans == 0 &&
              el.nombre_enfants12ans === 0
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd = price_lpd + price.pricelpdadulte + price.supsingle;
              }
              if (price.pricedpadulte !== 0) {
                price_dp += price.pricedpadulte + price.supsingle;
              }
              if (price.pricepcadulte !== 0) {
                price_pc += price.pricepcadulte + price.supsingle;
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  price.priceallinsoftadulte + price.supsingle;
              }
              if (price.priceallinadulte !== 0) {
                price_all_in += price.priceallinadulte + price.supsingle;
              }
            }
            if (
              el.nombres_adultes === 0 &&
              el.nombre_enfants2ans === 1 &&
              el.nombre_enfants12ans === 0
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd = price_lpd + price.pricelpdadulte + price.supsingle;
              }
              if (price.pricedpadulte !== 0) {
                price_dp += price.pricedpadulte + price.supsingle;
              }
              if (price.pricepcadulte !== 0) {
                price_pc += price.pricepcadulte + price.supsingle;
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  price.priceallinsoftadulte + price.supsingle;
              }
              if (price.priceallinadulte !== 0) {
                price_all_in += price.priceallinadulte + price.supsingle;
              }
            }
            if (
              el.nombres_adultes === 0 &&
              el.nombre_enfants2ans === 0 &&
              el.nombre_enfants12ans === 1
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd = price_lpd + price.pricelpdadulte + price.supsingle;
              }
              if (price.pricedpadulte !== 0) {
                price_dp += price.pricedpadulte + price.supsingle;
              }
              if (price.pricepcadulte !== 0) {
                price_pc += price.pricepcadulte + price.supsingle;
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  price.priceallinsoftadulte + price.supsingle;
              }
              if (price.priceallinadulte !== 0) {
                price_all_in += price.priceallinadulte + price.supsingle;
              }
            }

            if (
              el.nombres_adultes === 0 &&
              el.nombre_enfants2ans === 1 &&
              el.nombre_enfants12ans === 1
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd +=
                  (price.pricelpdadulte -
                    price.pricelpdadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricelpdadulte -
                    price.pricelpdadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricedpadulte !== 0) {
                price_dp +=
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricepcadulte !== 0) {
                price_pc +=
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinadulte !== 0) {
                price_all_in +=
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
            }
            if (
              el.nombres_adultes === 0 &&
              el.nombre_enfants2ans === 0 &&
              el.nombre_enfants12ans > 1
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd +=
                  (price.pricelpdadulte -
                    price.pricelpdadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricelpdadulte -
                    price.pricelpdadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricedpadulte !== 0) {
                price_dp +=
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricepcadulte !== 0) {
                price_pc +=
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinadulte !== 0) {
                price_all_in +=
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
            }
            if (
              el.nombres_adultes === 0 &&
              el.nombre_enfants2ans > 1 &&
              el.nombre_enfants12ans === 0
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd +=
                  (price.pricelpdadulte -
                    price.pricelpdadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricelpdadulte -
                    price.pricelpdadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricedpadulte !== 0) {
                price_dp +=
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricepcadulte !== 0) {
                price_pc +=
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinadulte !== 0) {
                price_all_in +=
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
            }
            if (
              el.nombres_adultes === 0 &&
              el.nombre_enfants2ans > 1 &&
              el.nombre_enfants12ans === 1
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd +=
                  (price.pricelpdadulte -
                    price.pricelpdadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricelpdadulte -
                    price.pricelpdadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricedpadulte !== 0) {
                price_dp +=
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricepcadulte !== 0) {
                price_pc +=
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinadulte !== 0) {
                price_all_in +=
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
            }
            if (
              el.nombres_adultes === 0 &&
              el.nombre_enfants2ans === 1 &&
              el.nombre_enfants12ans > 1
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd +=
                  (price.pricelpdadulte -
                    price.pricelpdadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricelpdadulte -
                    price.pricelpdadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricedpadulte !== 0) {
                price_dp +=
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricepcadulte !== 0) {
                price_pc +=
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinadulte !== 0) {
                price_all_in +=
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
            }
            if (
              el.nombres_adultes === 0 &&
              el.nombre_enfants2ans > 1 &&
              el.nombre_enfants12ans > 1
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd +=
                  (price.pricelpdadulte -
                    price.pricelpdadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricelpdadulte -
                    price.pricelpdadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricedpadulte !== 0) {
                price_dp +=
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricepcadulte !== 0) {
                price_pc +=
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinadulte !== 0) {
                price_all_in +=
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantsingle / 100)) *
                    el.nombre_enfants2ans;
              }
            }

            if (
              el.nombres_adultes === 1 &&
              el.nombre_enfants2ans === 1 &&
              el.nombre_enfants12ans === 0
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd +=
                  price.pricelpdadulte +
                  (price.pricelpdadulte -
                    price.pricelpdadulte * (price.reductionenfantadulte / 100));
              }
              if (price.pricedpadulte !== 0) {
                price_dp +=
                  price.pricedpadulte +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantadulte / 100));
              }
              if (price.pricepcadulte !== 0) {
                price_pc +=
                  price.pricepcadulte +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantadulte / 100));
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  price.priceallinsoftadulte +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantadulte / 100));
              }
              if (price.priceallinadulte !== 0) {
                price_all_in +=
                  price.priceallinadulte +
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantadulte / 100));
              }
            }
            if (
              el.nombres_adultes === 1 &&
              el.nombre_enfants2ans === 0 &&
              el.nombre_enfants12ans === 1
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd +=
                  price.pricelpdadulte +
                  (price.pricelpdadulte -
                    price.pricelpdadulte * (price.reductionenfantadulte / 100));
              }
              if (price.pricedpadulte !== 0) {
                price_dp +=
                  price.pricedpadulte +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfantadulte / 100));
              }
              if (price.pricepcadulte !== 0) {
                price_pc +=
                  price.pricepcadulte +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfantadulte / 100));
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  price.priceallinsoftadulte +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfantadulte / 100));
              }
              if (price.priceallinadulte !== 0) {
                price_all_in +=
                  price.priceallinadulte +
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfantadulte / 100));
              }
            }
            if (
              el.nombres_adultes === 2 &&
              el.nombre_enfants2ans === 0 &&
              el.nombre_enfants12ans === 0
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd += price.pricelpdadulte * 2;
              }
              if (price.pricedpadulte !== 0) {
                price_dp += price.pricedpadulte * 2;
              }
              if (price.pricepcadulte !== 0) {
                price_pc += price.pricepcadulte * 2;
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft += price.priceallinsoftadulte * 2;
              }
              if (price.priceallinadulte !== 0) {
                price_all_in += price.priceallinadulte * 2;
              }
            }
            if (
              el.nombres_adultes === 3 &&
              el.nombre_enfants2ans === 0 &&
              el.nombre_enfants12ans === 0
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd +=
                  price.pricelpdadulte * 2 +
                  (price.pricelpdadulte -
                    price.pricelpdadulte * (price.reduction3lit / 100));
              }
              if (price.pricedpadulte !== 0) {
                price_dp +=
                  price.pricedpadulte * 2 +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reduction3lit / 100));
              }
              if (price.pricepcadulte !== 0) {
                price_pc +=
                  price.pricepcadulte * 2 +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reduction3lit / 100));
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  price.priceallinsoftadulte * 2 +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte * (price.reduction3lit / 100));
              }
              if (price.priceallinadulte !== 0) {
                price_all_in +=
                  price.priceallinadulte * 2 +
                  (price.priceallinadulte -
                    price.priceallinadulte * (price.reduction3lit / 100));
              }
            }
            if (
              el.nombres_adultes === 4 &&
              el.nombre_enfants2ans === 0 &&
              el.nombre_enfants12ans === 0
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd +=
                  price.pricelpdadulte * 2 +
                  (price.pricelpdadulte -
                    price.pricelpdadulte * (price.reduction3lit / 100)) +
                  (price.pricelpdadulte -
                    price.pricelpdadulte * (price.reduction4lit / 100));
              }
              if (price.pricedpadulte !== 0) {
                price_dp +=
                  price.pricedpadulte * 2 +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reduction3lit / 100)) +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reduction4lit / 100));
              }
              if (price.pricepcadulte !== 0) {
                price_pc +=
                  price.pricepcadulte * 2 +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reduction3lit / 100)) +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reduction4lit / 100));
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  price.priceallinsoftadulte * 2 +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte * (price.reduction3lit / 100)) +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte * (price.reduction4lit / 100));
              }
              if (price.priceallinadulte !== 0) {
                price_all_in +=
                  price.priceallinadulte * 2 +
                  (price.priceallinadulte -
                    price.priceallinadulte * (price.reduction3lit / 100)) +
                  (price.priceallinadulte -
                    price.priceallinadulte * (price.reduction4lit / 100));
              }
            }
            if (
              el.nombres_adultes >= 2 &&
              (el.nombre_enfants2ans > 0 || el.nombre_enfants12ans > 0)
            ) {
              if (price.pricelpdadulte !== 0) {
                price_lpd +=
                  price.pricelpdadulte * el.nombres_adultes +
                  (price.pricelpdadulte -
                    price.pricelpdadulte * (price.reductionenfant12ans / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricelpdadulte -
                    price.pricelpdadulte * (price.reductionenfant2ans / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricedpadulte !== 0) {
                price_dp +=
                  price.pricedpadulte * el.nombres_adultes +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfant12ans / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricedpadulte -
                    price.pricedpadulte * (price.reductionenfant2ans / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.pricepcadulte !== 0) {
                price_pc +=
                  price.pricepcadulte * el.nombres_adultes +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfant12ans / 100)) *
                    el.nombre_enfants12ans +
                  (price.pricepcadulte -
                    price.pricepcadulte * (price.reductionenfant2ans / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinsoftadulte !== 0) {
                price_all_in_soft +=
                  price.priceallinsoftadulte * el.nombres_adultes +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfant12ans / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinsoftadulte -
                    price.priceallinsoftadulte *
                      (price.reductionenfant2ans / 100)) *
                    el.nombre_enfants2ans;
              }
              if (price.priceallinadulte !== 0) {
                price_all_in +=
                  price.priceallinadulte * el.nombres_adultes +
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfant2ans / 100)) *
                    el.nombre_enfants12ans +
                  (price.priceallinadulte -
                    price.priceallinadulte *
                      (price.reductionenfant2ans / 100)) *
                    el.nombre_enfants2ans;
              }
            }
          }
          price.pricelpdadulte = price_lpd * nombres_nuits;
          price.pricedpadulte = price_dp * nombres_nuits;
          price.pricepcadulte = price_pc * nombres_nuits;
          price.priceallinsoftadulte = price_all_in_soft * nombres_nuits;
          price.priceallinadulte = price_all_in * nombres_nuits;
        }
        bookings.push({
          item,
        });
      }

      const book = bookings.slice(PAGE_SIZE * page).slice(0, PAGE_SIZE);

      res.status(200).send({
        message: "L'hotel est trouvé ",
        book,
        totalPages: Math.ceil(bookings.length / PAGE_SIZE),
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
