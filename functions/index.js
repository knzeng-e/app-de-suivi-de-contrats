const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp(functions.config().firebase);

const checkValidity = (contract) => {
    const date = contract.data().validity;
    const firstRemind = contract.data().firstNotif;
    const secondRemind = contract.data().secondNotif;

    /*const currentTime = (new Date()).toLocaleDateString().split('/');
    const endDate = (new Date(date.seconds * 1000)).toLocaleDateString().split('/');
    const remind_once = (new Date(firstRemind.seconds * 1000)).toLocaleDateString().split('/');
    const remind_twice = (new Date(secondRemind.seconds * 1000)).toLocaleDateString().split('/');*/

    const currentTime = (new Date()).toLocaleDateString().split('/')
    const endDate = date.split('/');
    const remind_once = firstRemind.split('/');
    const remind_twice = secondRemind.split('/');

    console.log('*** Current Date: ', currentTime[0], '-', currentTime[1], '-', currentTime[2]);
    console.log('Contrat ', contract.data().title, ': (', endDate[0], '-', endDate[1], '-', endDate[2], ')');
    console.log('First remind: ', remind_once[0], remind_once[1], remind_once[2]);
    console.log('Second remind: ', remind_twice[0], remind_twice[1], remind_twice[2]);
    
    
    if (parseInt(currentTime[0]) === parseInt(endDate[1])){
        if (parseInt(currentTime[1]) === parseInt(endDate[0])){
            if (currentTime[2] === endDate[2])
                 console.log('Le contrat ', contract.data().title, 'arrive a expiration today')
        }
    } else if (parseInt(currentTime[0]) === parseInt(remind_once[1])){
            if (parseInt(currentTime[1]) === parseInt(remind_once[0])){
                if (currentTime[2] === remind_once[2])
                     console.log('Le contrat ', contract.data().title, 'arrive a expiration dans 6 mois');
            }
        }
        else {
            if (parseInt(currentTime[0]) === parseInt(remind_twice[1])){
                if (parseInt(currentTime[1]) === parseInt(remind_twice[0])){
                    if (currentTime[2] === remind_twice[2])
                         console.log('Le contrat ', contract.data().title, 'arrive a expiration dans 3 mois')
                }
            }
        }
    
    //console.log('current date', currentTime);
    //console.log('validity', newDate);

    //console.log('Contract ends on: ', date);
    //console.log('First remind at : ', firstRemind);
    //console.log('Second remind at : ', secondRemind);
}

exports.sendEmailWatcher = functions.https.onRequest((request, response) => {
   return admin.firestore().collection('contracts').get()
        .then(docs => {
            //console.log(contracts);
             docs.forEach(doc => {
                 checkValidity(doc);
                })
                response.send("OK");
        }).catch((err) => {
            console.log ('Something went badly wrong: ', err)
        })
    
});

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