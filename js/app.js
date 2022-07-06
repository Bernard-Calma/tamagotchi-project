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
        let lblLight2 = document.querySelector("#lblLight")
        lblName.innerText = this.name
        lblHunger.innerText = this.hunger
        lblSleepiness.innerText = this.sleepiness
        lblBoredom.innerText = this.boredom
        lblAge.innerText = this.age
        lblLight2.innerText = this.light
        console.log("light",this.light)
        // if light status is on, make button show turn off lights. Viceversa
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
        if(this.light === "off"){
            return
        }
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
        if(this.light === "off"){
            return
        }
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

    decreaseSleepiness = () => {
        console.log("decerease Sleepiness Initiated")
        if (this.sleepiness > 0) {
            this.sleepiness -= 1
            this.updateStats()
        } else if (this.sleepiness <= 0) {
            alert("Your Pet is not sleepy")
        }
    }

    increaseSleepiness = () => {
        console.log("add Sleepiness Initiated")
        if (this.sleepiness < 10) {
            this.sleepiness += 1
            this.updateStats()
        } else if (this.sleepiness >= 10) {
            alert("Your pet died.")
            this.alive = false
            this.petDied()
            console.log("Add Sleepiness stops")
        }
    }

    lightSwitch = () => {
        if (this.light === "on") {
            // alert("light is turned off")
            this.light = "off"
            this.updateStats()
        } else if (this.light === "off") {
            // alert("light is turned on")
            this.light = "on"
            this.updateStats()
        }
        
    }

    // decrease sleepienss if light is on. Vise-Versa
    updateSleepiness = () => {
        console.log("Update Sleepines Start")
        console.log("Update Sleepiness:",this.light)
        if (this.light === "on") {
            this.addSleepiness()
        } else if (this.light === "off") {
            this.decreaseSleepiness()
        }
    }

    // +1 stats every interval
    updateStatsInterval = () => {
    let hungerInterval = setInterval(this.addHunger,5000)
    console.log("Add Hunger Starts")
    let sleepinessInterval = setInterval(this.updateSleepiness,20000)
    console.log("Update Sleepiness Starts")
    let boredomInterval = setInterval(this.addBoredom,10000)
    console.log("Add Boredom Starts")
    let ageInterval = setInterval(this.addAge,50000)
    }

}

const playGame = () => {
    let petName = prompt("Please name your pet")
    const pet = new Game(petName)
    pet.updateStats()
    pet.updateStatsInterval()
    
    
    
        // buttons
        const btnPet = document.querySelector("#btnFeed")
        const btnLight = document.querySelector("#btnLight")
        const btnPlay = document.querySelector("#btnPlay")
        // console.log(petButton)
        btnPet.addEventListener("click",pet.feedPet)
        btnLight.addEventListener("click",pet.lightSwitch)
        btnPlay.addEventListener("click",pet.playPet)

    console.log(pet)
}

let petImage = document.querySelector("#idPetImage")
petImage.addEventListener("click", playGame)


    
    
    