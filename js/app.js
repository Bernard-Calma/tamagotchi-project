class Game {
    constructor (name) {
        this.name = name
        this.hunger = 1
        this.sleepiness = 1
        this.boredom = 1
        this.age = 0
    }

    updateStats = () => {
        let lblName = document.querySelector("#petName")
        let lblHunger = document.querySelector("#hunger")
        let lblSleepiness = document.querySelector("#sleepiness")
        let lblBoredom = document.querySelector("#boredom")
        let lblAge = document.querySelector("#age")
        lblName.innerText = this.name
        lblHunger.innerText = this.hunger
        lblSleepiness.innerText = this.sleepiness
        lblBoredom.innerText = this.boredom
        lblAge.innerText = this.age
        
    }

}

const pet = new Game("Tamagochi")
pet.updateStats()

console.log(pet)