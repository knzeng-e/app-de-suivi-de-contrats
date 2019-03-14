const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const SENDER_EMAIL = '' //Email of the sender here;
const SENDER_PASSWORD = '' //Password of the sender here;

admin.initializeApp(functions.config().firebase);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    auth : {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const mailOptions = {
    from : '"Coucouya via Contrats_Papel" <thot.nzeng@gmail.com>',
    to: 'kevin.nzeng@gmail.com',
    subject : '',
    text: '',
    html: ''

};

const end_of_contract = (mailOptions, contract) => {
    mailOptions.subject = "Expiration du contrat \"" + contract.title + "\"";
    mailOptions.text = "Mbolo Papel!\nLe contract \"" + contract.title + "\" expire aujourd'hui.\n\n Ngwalio ! <3";
    transporter.sendMail(mailOptions).then(() => {
        console.log('Mail END_OF_CONTRACT envoyé à ', mailOptions.to);
    }).catch(err => console.log("Erreur envoi mail: ", err));
}

const six_months_notifier = (mailOptions, contract) => {
    mailOptions.subject = "6 mois avant expiration du contrat \"" + contract.title + "\"";
    mailOptions.text = "Mbolo Papel!\nLe contract \"" + contract.title + "\" expire dans 6 mois, le " + contract.validity + ".\n U ya Libn !\n\nNgwalio ! <3";
    transporter.sendMail(mailOptions).then(() => {
        console.log('SIX_MONTHS_NOTIFIER envoyé à ', mailOptions.to);
    }).catch(err => console.log("Erreur envoi mail: ", err));
}

const three_months_notifier = (mailOptions, contract) => {
    mailOptions.subject = "3 mois avant expiration du contrat \"" + contract.title + "\"";
    mailOptions.text = "Mbolo Papel!\nLe contract \"" + contract.title + "\" expire dans 3 mois, le " + contract.validity + ".\n U ya Libn !\n\nNgwalio ! <3";
    transporter.sendMail(mailOptions).then(() => {
        console.log('THREE_MONTHS_NOTIFIER envoyé à ', mailOptions.to);
    }).catch(err => console.log("Erreur envoi mail: ", err));
}


const checkValidity = (contract) => {
    const date = contract.data().validity;
    const firstRemind = contract.data().firstNotif;
    const secondRemind = contract.data().secondNotif;

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
            if (currentTime[2] === endDate[2]) {
                 console.log('Le contrat ', contract.data().title, 'arrive a expiration today')
                 //Envoi du mail end_of_contract
                 end_of_contract(mailOptions, contract.data());
                 updateColorStatus(contract, 'black');
            }
        }
    } else if (parseInt(currentTime[0]) === parseInt(remind_once[1])){
            if (parseInt(currentTime[1]) === parseInt(remind_once[0])){
                if (currentTime[2] === remind_once[2]){
                     console.log('Le contrat ', contract.data().title, 'arrive a expiration dans 6 mois');
                     //Envoi du mail six_months_notifier
                     six_months_notifier(mailOptions, contract.data());
                     updateColorStatus(contract, 'orange');
                }
            }
        }
        else {
            if (parseInt(currentTime[0]) === parseInt(remind_twice[1])){
                if (parseInt(currentTime[1]) === parseInt(remind_twice[0])){
                    if (currentTime[2] === remind_twice[2]) {
                         console.log('Le contrat ', contract.data().title, 'arrive a expiration dans 3 mois')
                         //Envoi du mail three_months_reminder
                         three_months_notifier(mailOptions, contract.data());
                         updateColorStatus(contract, 'red');
                    }
                }
            }
        }
}

exports.sendEmailWatcher = functions.https.onRequest((request, response) => {
   return admin.firestore().collection('contracts').get()
        .then(docs => {
            //console.log(contracts);
             docs.forEach(doc => {
                 checkValidity(doc);
                })
                response.send("OK Tracker");
        }).catch((err) => {
            console.log ('Something went badly wrong: ', err)
        })
    
});

const createNotification = ((notification) => {
    return admin.firestore().collection('notifications').add(notification).then((doc) => {
        console.log('Notfification added: ', doc)
    })
})

const updateColorStatus = ((contract, color) => {
    console.log (contract.id);
    const docId = contract.id;
    admin.firestore().collection('contracts').doc(docId).update({colorStatus: color});
    console.log(color);
});

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