
//input list
const userDeck = [...document.querySelectorAll('.deck input[type=checkbox]')]

//composition
const composition = userDeck.map(beat => beat.checked)

//load composition
userDeck.forEach((beat,i) => beat.checked = composition[i])
