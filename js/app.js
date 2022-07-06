class Game {
    constructor (name) {
        this.name = name
        this.hunger = 1
        this.sleepiness = 1
        this.boredom = 1
        this.age = 0
        this.alive = true
        this.light = "on"
    }

    updateStats = () => {
        let lblName = document.querySelector("#petName")
        let lblHunger = document.querySelector("#hunger")
        let lblSleepiness = document.querySelector("#sleepiness")
        let lblBoredom = document.querySelector("#boredom")
        let lblAge = document.querySelector("#age")
        let lblLight = document.querySelector("#lightStatus")
        lblName.innerText = this.name
        lblHunger.innerText = this.hunger
        lblSleepiness.innerText = this.sleepiness
        lblBoredom.innerText = this.boredom
        lblAge.innerText = this.age
        if(this.light === "on"){
            lblLight.innerText = "off"
        } else if (this.light === "off") {
            lblLight.innerText = "on"
        }


        //change all classes with .petName to this.name
        let lblPetName = document.querySelectorAll(".petName")
        for (let e of lblPetName) {
            e.innerText = this.name
        }
        
        console.log("updateStats() completed : All labels are updated.")
    }

    petDied = () => {
        clearInterval(hungerInterval)
        clearInterval(sleepinessInterval)
        clearInterval(boredomInterval)
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

    addBoredom = () => {
        this.boredom +=1 
        this.updateStats()
        console.log("Boredom increased!")
        if (this.boredom >= 10) {
            alert("Your pet died.")
            this.alive = false
            this.petDied()
            console.log("Add Boredom stops")
        }
    }

    addAge = () => {
        this.age +=1 
        this.updateStats()
        console.log("Age increased!")
    }

    feedPet = () => {
        console.log("Feed Pet Initianted")
        if (this.hunger > 0) {
            this.hunger -= 1
            this.updateStats()
        } else if (this.hunger <= 0) {
            alert("Your Pet is Full")
        }
    }

    playPet = () => {
        console.log("Play Pet Initianted")
        if (this.boredom > 0) {
            this.boredom -= 1
            this.updateStats()
        } else if (this.boredom <= 0) {
            alert("Your Pet is not bored")
        }
    }

    lightSwitch = () => {
        if (this.light === "on") {
            alert("light is turned off")
            this.light = "off"
            this.updateStats()
        } else if (this.light === "off") {
            alert("light is turned on")
            this.light = "on"
            this.updateStats()
        }
        
    }

}

console.log("Sleep Pet Initianted")
        if (this.sleepiness > 0) {
            this.sleepiness -= 1
            this.updateStats()
        } else if (this.sleepiness <= 0) {
            alert("Your Pet is Fully Awake")
        }



let petName = prompt("Please name your pet")
const pet = new Game(petName)
pet.updateStats()


// +1 stats every interval
let hungerInterval = setInterval(pet.addHunger,5000)
console.log("Add Hunger Starts")
let sleepinessInterval = setInterval(pet.addSleepiness,20000)
console.log("Add Sleepiness Starts")
let boredomInterval = setInterval(pet.addBoredom,10000)
console.log("Add Boredom Starts")
let ageInterval = setInterval(pet.addAge,50000)


// buttons
const btnPet = document.querySelector("#btnFeed")
const btnLight = document.querySelector("#btnLight")
const btnPlay = document.querySelector("#btnPlay")
// console.log(petButton)
btnPet.addEventListener("click",pet.feedPet)
btnLight.addEventListener("click",pet.lightSwitch)
btnPlay.addEventListener("click",pet.playPet)



console.log(pet)
