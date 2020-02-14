const compositionURL = "http://127.0.0.1:3000/compositions/"


function saveComposition(composition, cb) {
    fetch(compositionURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({composition: composition})
    })
    .then(resp => resp.json())
    .then(cb)
}

function getUserCompositions(userId, cb) {
    fetch(compositionURL + 'list/' + userId, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(cb)
}



//////////////////////////////////

function sequencer() {


    const kick = new Tone.Player("http://127.0.0.1:3000/sounds/kick-acoustic01").toDestination()
    const snare = new Tone.Player("http://127.0.0.1:3000/sounds/snare1").toDestination()
    const hiHat = new Tone.Player("http://127.0.0.1:3000/sounds/hi-hat1").toDestination()
    const tom = new Tone.Player("http://127.0.0.1:3000/sounds/tom1").toDestination()
    const ride = new Tone.Player("http://127.0.0.1:3000/sounds/ride-acoustic01").toDestination()
    const crash = new Tone.Player("http://127.0.0.1:3000/sounds/crash-acoustic").toDestination()


    let index = 0

    Tone.Transport.scheduleRepeat(repeat, "16n")

    const startStopButton = document.querySelector('#startStop')

    startStopButton.addEventListener('click', () => {
        if (startStopButton.checked) {
            Tone.Transport.start()
        } else {
            Tone.Transport.stop()
        }
    }
    )


    function repeat() {
        let step = index % 16

        let kickInputs = document.querySelector(`.kick input:nth-child(${step + 1})`)
        if (kickInputs.checked) {
            kick.start()
        }

        let snareInputs = document.querySelector(`.snare input:nth-child(${step + 1})`)
        if (snareInputs.checked) {
            snare.start()
        }

        let rideInputs = document.querySelector(`.ride input:nth-child(${step + 1})`)
        if (rideInputs.checked) {
            ride.start()
        }

        let hiHatInputs = document.querySelector(`.hi-hat input:nth-child(${step + 1})`)
        if (hiHatInputs.checked) {
            hiHat.start()
        }

        let tomInputs = document.querySelector(`.tom input:nth-child(${step + 1})`)
        if (tomInputs.checked) {
            tom.start()
        }

        let crashInput = document.querySelector(`.crash input:nth-child(${step + 1})`)
        if (crashInput.checked) {
            crash.start()
        }

        index++
    }

}