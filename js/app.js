class Game {
    constructor (name) {
        this.name = name
        this.hunger = 1
        this.sleepiness = 1
        this.boredom = 1
        this.age = 0
        this.alive = true
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

        //change all classes with .petName to this.name
        let lblPetName = document.querySelectorAll(".petName")
        for (let e of lblPetName) {
            e.innerText = this.name
        }
        
        console.log("updateStats() completed : All labels are updated.")
    }

    petDied = () => {
        clearInterval(hungerInterval)
        clearInterval(hungerSleepiness)
    }

    addHunger = () => {
        this.hunger +=1 
        this.updateStats()
        console.log("Hunger increased!")
        if (this.hunger >= 10) {
            alert("Your pet died.")
            this.alive = false
            this.petDied()
            console.log("Add Hunger stops")
        }
    }

    addSleepiness = () => {
        this.sleepiness +=1 
        this.updateStats()
        console.log("Sleepiness increased!")
        if (this.sleepiness >= 10) {
            alert("Your pet died.")
            this.alive = false
            this.petDied()
            console.log("Add Sleepiness stops")
        }
    }

    clickButtons = () => {
        let divButtons = document.querySelector(".buttons")
        console.log(divButtons)
        divButtons.addEventListener("click", () => {
            if (this.hunger > 0) {
                this.hunger -= 1
                this.updateStats()
            } else if (this.hunger <= 0) {
                alert("Your Pet is Full")
            }
        })
    }

    
}

let petName = prompt("Please name your pet")
const pet = new Game(petName)
pet.updateStats()
pet.clickButtons()

let hungerInterval = setInterval(pet.addHunger,5000)
console.log("Add Hunger Starts")
let hungerSleepiness = setInterval(pet.addSleepiness,10000)
console.log("Add Sleepiness Starts")




console.log(pet)
