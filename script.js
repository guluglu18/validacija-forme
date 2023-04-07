let config = {
    'ime_prezime': {
        required: true,
        minlength: 3,
        maxlength: 50
    },
    'korisnicko_ime': {
        required: true,
        minlength: 5,
        maxlength: 50
    },
    'email': {
        email: true,
        required: true,
        minlength: 7,
        maxlength: 20 
    },
    'broj_telefona': {
        minlength: 9,
        maxlength: 13
    },
    'lozninka': {
        required: true,
        minlength: 7,
        maxlength: 20,
        matching: 'ponovi_lozinku'
    },
    'ponovi_lozinku': {
        required: true,
        minlength: 7,
        maxlength: 20,
        matching: 'lozinka'
    }
};

let validator = new Validator(config);