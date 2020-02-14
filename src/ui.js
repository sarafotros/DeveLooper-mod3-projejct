document.addEventListener("DOMContentLoaded", function (e) {
    let userCompositions = []
    let loggedUser = null

    const registerForm = document.querySelector("#registerForm form")
    const loginForm = document.querySelector("#loginForm form")
    const saveLoopBtn = document.querySelector('.save-button')
    const compositionForm = document.querySelector('#composition-form')
    const tempoSlider = document.querySelector('#tempo-slider')
    const bpmOutput = document.querySelector('#bpm-output')
    const compositionNameInput = document.querySelector('#composition-name')
    const compositionList = document.querySelector('#composition-list')
    const userDeck = [...document.querySelectorAll('.deck input[type=checkbox]')]
    const sequencerDiv = document.querySelector('.sequencer')

    compositionForm.style.visibility = "hidden";
    compositionList.style.visibility = "hidden";
    sequencerDiv.style.visibility = "hidden";


    compositionList.addEventListener('change', e => {
        console.log(e.target.value)
        const selectedComposition = userCompositions.filter(composition => composition.id == e.target.value)[0]
        const parsedLayout = JSON.parse(selectedComposition.layout)
        userDeck.forEach((beat,i) => beat.checked = parsedLayout[i])
        tempoSlider.value = selectedComposition.bpm
        tempoSlider.dispatchEvent(new Event('change'))
        tempoSlider.dispatchEvent(new Event('input'))
    })

    let context = new AudioContext();

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault()

        let bodyForm = {
                name: registerForm.username.value, 
                email: registerForm.email.value 
        }  


        newUser(bodyForm, newUser => {
            loggedUser = newUser
            compositionForm.style.visibility = "visible";
            compositionList.style.visibility = "visible";
            sequencerDiv.style.visibility = "visible";
            compositionList.style.visibility = "visible";
            registerForm.style.display = "none";
            loginForm.style.display = "none";
            const welcomeDiv = document.querySelector('#welcome')
            welcomeDiv.style.visibility = "visible";
            const h3 = document.createElement('h3')
            h3.innerText = `Welcome ${loggedUser.name}`
            welcomeDiv.appendChild(h3)

            registerForm.reset()

        })

        
    })

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault()

        let bodyForm = {

                name: loginForm.username.value, 
                email: loginForm.email.value
        }  


        loginUser(bodyForm, user => {
            loggedUser = user

            compositionForm.style.visibility = "visible";
            compositionList.style.visibility = "visible";
            sequencerDiv.style.visibility = "visible";
            compositionList.style.visibility = "visible";
            registerForm.style.display = "none";
            loginForm.style.display = "none";
            const welcomeDiv = document.querySelector('#welcome')
            welcomeDiv.style.visibility = "visible";
            const h3 = document.createElement('h3')
            h3.innerText = `Welcome ${loggedUser.name}`
            welcomeDiv.appendChild(h3)

            loginForm.reset()

            
            getUserCompositions(loggedUser.id, compositions => {
                userCompositions = compositions
                populateCompositionDropDown(compositions)
            })

        })

        
    })

    compositionForm.addEventListener('submit', function (e) {
        e.preventDefault()
        
        const userDeck = [...document.querySelectorAll('.deck input[type=checkbox]')];
        const layout = userDeck.map(beat => beat.checked);
        
        

        saveComposition({
            name: compositionNameInput.value,
            layout: JSON.stringify(layout),
            bpm: tempoSlider.value,
            user_id: loggedUser.id
        }, () => {
            getUserCompositions(loggedUser.id, compositions => {
                userCompositions = compositions
                populateCompositionDropDown(compositions)
            })
            
        })
        
        compositionForm.reset()
    })

    tempoSlider.addEventListener('input', () => bpmOutput.innerText = tempoSlider.value)
    tempoSlider.addEventListener('change', e => Tone.Transport.bpm.value = e.target.value)

    sequencer()

///////////////////////////////

    function populateCompositionDropDown(compositions){
        while (compositionList.hasChildNodes()) {
            compositionList.removeChild(compositionList.lastChild);
        }
        let firstOption = document.createElement('option')
        firstOption.innerText = "Select Composition"
        compositionList.appendChild(firstOption)
        compositions.forEach(composition => {
            let optionLi = document.createElement('option')
            optionLi.value = composition.id
            optionLi.innerText = composition.name
            compositionList.appendChild(optionLi)
        });
    }
})

