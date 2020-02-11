document.addEventListener("DOMContentLoaded", function () { 

    const sounds =  document.querySelectorAll('.sound')
    const pads = document.querySelectorAll(".pads div")

    const samples = document.querySelectorAll(".sample")
    const  squares = document.querySelectorAll(".squares div")

    const sq1 = document.querySelector(".sq1")

    
    pads.forEach((pad,index) => {
        pad.addEventListener('click', function () {
            sounds[index].currentTime = 0
            sounds[index].play()
        })
    })

    squares.forEach((square,index) => {
        square.addEventListener('click', function () {
            samples[index].currentTime = 0
            samples[index].play()
        })
    })

    // sq1.addEventListener('click', function () {
       
    //     sq1.play()
    // })
console.log('hello')

})