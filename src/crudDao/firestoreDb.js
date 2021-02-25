let firestoreDb = null;

exports.initFirestoreDb = ({ projectId, keyFilename }) => {
    if (!firestoreDb) {
        // if developing locally, then use key file for service account information
        if (projectId) {
            const Firestore = require('@google-cloud/firestore');
            firestoreDb = new Firestore({ projectId, keyFilename });

        } else {
            // running as actual GCP Cloud Function so the function already has service-account
            const admin = require('firebase-admin');
            admin.initializeApp();
            firestoreDb = admin.firestore();
        }
    }
    return firestoreDb;
};

exports.firestoreDb = () => {
    if (!firestoreDb) {
        throw new Error('Firestore DB could not be created; Make sure to call initFirestoreDB() before making calls');
    }

    return firestoreDb;
};
