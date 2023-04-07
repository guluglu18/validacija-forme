 class Validator {
    constructor(confing){
        this.elementsConfing = confing;
        this.errors = {};
        
        this.generateErrorsObject();

        this.inputListener();
    }
    // pravimo da za svako input polje imamo niz gde smestamo greske (field - kljuc)
    generateErrorsObject() {
        for(let field in this.elementsConfing){
            this.errors[field] = []; 
        }
    }

    inputListener(){
        let inputSelector = this.elementsConfing;

        for(let field in inputSelector){    
            let el = document.querySelector(`input[name="${field}"]`);

            el.addEventListener('input', this.validate.bind(this));
        }
    }
    // glavna funkcija validacije
    validate(e){
        let elFildes = this.elementsConfing;
        
        let field = e.target;

        let fieldName = field.getAttribute('name');
        let fieldValue = field.value;

        this.errors[fieldName] = [];

        if(elFildes[fieldName].required){
            if(fieldValue === ''){
                this.errors[fieldName].push('Polje je prazno!');
            }
        }
        if(elFildes[fieldName].email){
            if(!this.validateEmail(fieldValue)){
                this.errors[fieldName].push('Neispravna email adresa');
            }
        }
        if(fieldValue.length < elFildes[fieldName].minlength || fieldValue.length > elFildes[fieldName].maxlength){
            this.errors[fieldName].push(`Polje mora imati minimalno ${elFildes[fieldName].minlength} i maksimalno ${elFildes[fieldName].maxlength}`);
        }
        if(elFildes[fieldName].matching){
            let matchingEl = document.querySelector(`input[name="${elFildes[fieldName].matching}"]`);

            if(fieldValue !== matchingEl.value){
                this.errors[fieldName].push('Lozinke se nepodudaraju');
            }
        }
        // ispis greski
        this.populateErrors(this.errors);
    }
    
    populateErrors(errors){
        // brisanje nakon svakog inputa ul-a da se greske ne ponavljaju
        for(let elem of document.querySelectorAll('ul')){
            elem.remove();
        }
        // prolazak kroz greske
        for(let key of Object.keys(errors)){ // prolazak kroz kljuceve objekta errors koji su implementirani u funkciji validate

            // pravljenje ul taba u roditeljskom elementu inputa na kojem je trenutni target
            let parentElement = document.querySelector(`input[name="${key}"]`).parentElement;
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            // upisivanje greski u okviru ul-a kreirajuci li

            errors[key].forEach(error =>{
                let li = document.createElement('li');
                li.innerText = error;
                errorsElement.appendChild(li);
            });
        }
    }

    validateEmail(email){
        // provera validacije email-a
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            return true
        }
        return false
    }
 }

