document.addEventListener('DOMContentLoaded', function () {
    

	const onBtn = document.querySelector('button');
    onBtn.innerText = 'START';
    
    const kick1 = new Tone.Player('./sounds/sample/kick-acoustic01.wav').toMaster();

    function firstK() {
        onBtn.addEventListener('click', function() {
            // console.log(e)
            kick1.play();
        })
    }
    

	function sequencer() {
		const kick = new Tone.Player(
			'./sounds/sample/kick-acoustic01.wav'
		).toMaster();
		const snare = new Tone.Player(
			'sounds/sample/snare-acoustic01.wav'
		).toMaster();

        let index = 0;

		Tone.Transport.scheduleRepeat(repeat, '8n');
		Tone.Transport.start();
		function repeat() {
			let step = index % 8;

			let kickInputs = document.querySelector(
				`.kick input:nth-child(${step + 1})`
			);
			
			if (kickInputs.checked) {
				kick.start();
			}
			index++;
		}
    }


    firstK()
});
