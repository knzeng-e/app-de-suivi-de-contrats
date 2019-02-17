const functions = require('firebase-functions');
const admin = require('firebase-admin');
//const nodemailer = require('nodemailer');

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Dieu n'est pas Koudou.. Mbolo!!");
});

const createNotification = ((notification) => {
    return admin.firestore().collection('notifications').add(notification).then((doc) => {
        console.log('Notfification added: ', doc)
    })
})

exports.contractCreated = functions.firestore
    .document('contracts/{contractId}')
    .onCreate((doc) => {
        const contract = doc.data();
        const notification = {
            content: 'Nouveau contrat ajouté !',
            user: `${contract.authorFirstName} ${contract.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
    })