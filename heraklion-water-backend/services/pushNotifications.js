const Area = require("../models").Area;

let admin = require("firebase-admin");

let serviceAccount = require("./heraklion-water-firebase-adminsdk-b62u8-9ee85a0116.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function sendPushNotification(areaId, status) {
  const area = await Area.findOne({
    _id: areaId,
  }).exec();
  // format area name before sending notification
  switch (area.name) {
    case "ΑΛΙΚΑΡΝΑΣΣΟΣ-ΓΕΩΡΓΙΚΑ":
      area.name = "Αλικαρνασσός - Γεωργικά";
      break;
    case "ΑΛΙΚΑΡΝΑΣΣΟΣ-ΘΑΛΑΣΣΙΝΑ":
      area.name = "Αλικαρνασσός - Θαλασσινά";
      break;
    case "ΑΝΩ ΑΛΙΚΑΡΝΑΣΣΟΣ":
      area.name = "Άνω Αλικαρνασσός";
      break;
    case "ΒΕΛΟΝΙ ΚΑΜΠΟΣ-ΝΕΟΣ ΚΟΣΜΟΣ-ΑΓ.ΙΩΑΝΝΗΣ ΧΩΣΤΟΣ-ΤΕΙ":
      area.name = "Βελόνι Κάμπος - Νέος Κόσμος - Αγ.Ιωάννης Χωστός - ΤΕΙ";
      break;
    case "ΗΡΑΚΛΕΙΟ -ΑΓ.ΤΡΙΑΔΑ":
      area.name = "Αγ.Τριάδα";
      break;
    case "ΗΡΑΚΛΕΙΟ EΝΤΟΣ ΤΕΙΧΩΝ-ΠΡΟΑΣΤΙΑ":
      area.name = "Ηράκλειο Eντός Τείχων - Προάστια";
      break;
    case "ΗΡΑΚΛΕΙΟ ΣΥΝΟΙΚΙΑ ΑΤΣΑΛΕΝΙΟ Ι":
      area.name = "Ατσαλένιο Ι";
      break;
    case "ΗΡΑΚΛΕΙΟ-ΠΕΡΙΟΧΗ ΛΑΚΟΣ-ΠΑΝΑΝΕΙΟ":
      area.name = "Ηράκλειο - Περιοχή Λάκος - Πανάνειο";
      break;
    case "ΗΡΑΚΛΕΙΟ-ΣΥΝΟΙΚΙΑ ΑΤΣΑΛΕΝΙΟ ΙΙ":
      area.name = "Ατσαλένιο ΙΙ";
      break;
    case "ΗΡΑΚΛΕΙΟ-ΣΥΝΟΙΚΙΑ ΜΑΣΤΑΜΠΑΣ":
      area.name = "Μασταμπάς";
      break;
    case "ΣΥΝΟΙΚΙΑ - ΚΑΤΣΑΜΠΑΣ ΙΙ":
      area.name = "Κατσαμπάς ΙΙ";
      break;
    case "ΣΥΝΟΙΚΙΑ -ΘΕΡΙΣΣΟΣ Ι":
      area.name = "Θέρισσος Ι";
      break;
    case "ΣΥΝΟΙΚΙΑ ΑΓ. ΑΙΚΑΤΕΡΙΝΗΣ -ΕΡΓΑΤΙΚΕΣ ΚΑΤΟΙΚΙΕΣ":
      area.name = "Αγ.Αικατερίνη - Εργατικές Κατοικίες";
      break;
    case "ΣΥΝΟΙΚΙΑ ΑΓ. ΑΙΚΑΤΕΡΙΝΗΣ Ι":
      area.name = "Αγ.Αικατερίνης Ι";
      break;
    case "ΣΥΝΟΙΚΙΑ ΑΓ. ΙΩΑΝΝΗΣ":
      area.name = "Αγ.Ιωάννης";
      break;
    case "ΣΥΝΟΙΚΙΑ ΑΓ.ΑΙΚΑΤΕΡΙΝΗΣ ΙΙ - ΤΜΗΜΑ ΠΑΤΕΛΩΝ-ΤΜΗΜΑ ΦΙΛΟΘΕΗΣ":
      area.name = "Αγ.Αικατερίνης ΙΙ - Τμήμα Πατελών - Τμήμα Φιλοθέης";
      break;
    case "ΣΥΝΟΙΚΙΑ ΑΓ.ΑΙΚΑΤΕΡΙΝΗΣ ΙΙΙ":
      area.name = "Αγ.Αικατερίνης ΙΙΙ";
      break;
    case "ΣΥΝΟΙΚΙΑ ΔΕΙΛΙΝΑ":
      area.name = "Δειλινά";
      break;
    case "ΣΥΝΟΙΚΙΑ ΘΕΡΙΣΣΟΣ ΙΙ-ΠΕΡΙΟΧΗ ΜΙΧΑΗΛ ΑΡΧΑΓΓΕΛΟΥ":
      area.name = "Θέρισσος ΙΙ - Μιχαήλ Αρχάγγελου";
      break;
    case "ΣΥΝΟΙΚΙΑ ΚΑΜΙΝΙΑ":
      area.name = "Καμίνια";
      break;
    case "ΣΥΝΟΙΚΙΑ ΚΗΠΟΥΠΟΛΗ ΙΙ":
      area.name = "Κηπούπολη ΙΙ";
      break;
    case "ΣΥΝΟΙΚΙΑ ΚΗΠΟΥΠΟΛΗ Ι":
      area.name = "Κηπούπολη Ι";
      break;
    case "ΣΥΝΟΙΚΙΑ ΠΑΤΕΛΕΣ":
      area.name = "Πατέλες";
      break;
    case "ΣΥΝΟΙΚΙΑ ΠΟΡΟΣ ΙΙ":
      area.name = "Πόρος ΙΙ";
      break;
    case "ΣΥΝΟΙΚΙΑ ΠΟΡΟΣ Ι":
      area.name = "Πόρος Ι";
      break;
    case "ΣΥΝΟΙΚΙΑ-ΚΑΤΣΑΜΠΑΣ Ι":
      area.name = "Κατσαμπάς Ι";
      break;
    case "ΦΟΙΝΙΚΙΑ":
      area.name = "Φοινικιά";
      break;
  }

  // set body and title according to area status
  let title = "";
  let body = "";

  if (status == "ΝΑΙ") {
    title = `Επαναφορά Υδροδότησης`;
    body = `${area.name}`;
  } else {
    title = `Διακοπή Υδροδότησης`;
    body = `${area.name}`;
  }

  //loop through each subscription, create message and send notification
  let areaMessage =
    status === "ΝΑΙ"
      ? "Η υδροδότηση της περιοχής επανήλθε"
      : "Η υδροδότηση της περιοχής διεκόπη";
  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: {
      areaId: areaId,
      areaName: area.name,
      areaMessage: areaMessage,
    },
    topic: areaId,
  };
  // Send a message to devices subscribed to the provided topic.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}

module.exports = { sendPushNotification };
