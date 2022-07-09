
// DOM
let lblName = document.querySelector("#petName")
let lblHunger = document.querySelector("#hunger")
let lblsleepiness = document.querySelector("#sleepiness")
let lblBoredom = document.querySelector("#boredom")
let lblAge = document.querySelector("#age")
let lblLight = document.querySelector("#lightStatus")
let lblLight2 = document.querySelector("#lblLight")
let petImage = document.querySelector("#idPetImage")
let lblPopUp = document.querySelector("#lblPopUp")

// buttons
let btnPlayRestart = document.querySelector("#btnPlayRestart")
let lblStatusMessage = document.querySelector("#lblStatusMessage")
let inputName = document.querySelector("#inputName")
const btnPet = document.querySelector("#btnFeed")
const btnLight = document.querySelector("#btnLight")
const btnPlay = document.querySelector("#btnPlay")

class Game {
    constructor (name) {
        this.name = name
        this.hunger = 1
        this.sleepiness = 1
        this.boredom = 1
        this.age = 0
        this.alive = true
        this.light = "on"
        this.petImage = "images/light_blue_egg.png"

        // +1 stats every interval
        this.hungerInterval = setInterval(this.addHunger,5000)
        // console.log("Add Hunger Starts")
        this.sleepinessInterval = setInterval(this.updateSleepiness,20000)
        // console.log("Update Sleepiness Starts")
        this.boredomInterval = setInterval(this.addBoredom,10000)
        // console.log("Add Boredom Starts")
        this.ageInterval = setInterval(this.addAge,30000)
        //call movealive
        this.moveInterval = setInterval(this.moveAlive,500)    
    }

    updateStats = () => {
        
        lblName.innerText = this.name
        lblHunger.innerText = this.hunger
        lblsleepiness.innerText = this.sleepiness
        lblBoredom.innerText = this.boredom
        lblAge.innerText = this.age
        lblLight2.innerText = this.light
        // console.log("light",this.light)
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
        
        //change image according to Age
        // console.log(this.alive)
        if (this.name === "" && this.alive === true) {
            this.petImage = "images/light_blue_egg.png"
        } else if (this.age >= 0 && this.age < 5 && this.alive === true) {
            this.petImage = "images/baby_blue_dragon.png"
        } else if (this.age > 5 && this.alive === true) {
            this.petImage = "images/adult_dragon.gif"
        } else if (this.alive === false) {
            this.petImage = "images/tombstone.png"
        }
        petImage.attributes[0].value = this.petImage

        // console.log("updateStats() completed : All labels are updated.")
        // console.log(petImage.attributes[0].value)
        // console.log(this.petImage)

        //clear message
        lblStatusMessage.setAttribute("hidden",true)
        lblPopUp.setAttribute("hidden",true)
    }

    sleeping = () => {
        // sleeping mode
        //disable buttons
        disableFooter()
        //enable turn on light
        btnLight.removeAttribute("disabled")
        lblPopUp.innerHTML = "&nbsp; z<br>&nbsp;z<br>z"
        //animate zzz 
        this.sleepAdd = setInterval(()=>{
            lblPopUp.setAttribute("hidden",true)    
            // console.log("Sleep added")           
        },1000)
        this.sleepRemove = setInterval(()=>{
            lblPopUp.removeAttribute("hidden")     
            // console.log("Sleep removed")             
        },2000)
        //stop pet moving
        this.stopMove()
    }

    petDied = () => {
        clearInterval(this.hungerInterval)
        clearInterval(this.sleepinessInterval)
        clearInterval(this.boredomInterval)
        clearInterval(this.ageInterval)
        this.name = name
        this.hunger = 0
        this.sleepiness = 0
        this.boredom = 0
        this.age = 0
        this.alive = false
        this.light = "on"
        this.petImage = "images/tombstone.png"
        this.updateStats()
        btnPlayRestart.innerText = "Play Again"
        btnPlayRestart.removeAttribute("hidden")
        lblStatusMessage.removeAttribute("hidden")
        this.stopMove()
        disableFooter()
    }

    addHunger = () => {
        if(this.light === "off"){
            return
        }
        this.hunger +=1 
        this.updateStats()
        // console.log("Hunger increased!")
        if (this.hunger >= 10) {
            lblStatusMessage.innerText = `${this.name} died from hunger.`
            this.petDied()
            // console.log("Add Hunger stops")
        }
    }

    addSleepiness = () => {
        this.sleepiness +=1 
        this.updateStats()
        // console.log("Sleepiness increased!")
        if (this.sleepiness >= 10) {
            lblStatusMessage.innerText = `${this.name} died from lack of sleep.`
            this.petDied()
            // console.log("Add Sleepiness stops")
        }
    }

    addBoredom = () => {
        if(this.light === "off"){
            return
        }
        this.boredom +=1 
        this.updateStats()
        // console.log("Boredom increased!")
        if (this.boredom >= 10) {
            lblStatusMessage.innerText = `${this.name} died from boredom.`
            lblStatusMessage.removeAttribute("hidden")
            this.petDied()
            console.log("Add Boredom stops")
        }
    }

    addAge = () => {
        this.age +=1 
        this.updateStats()
        // console.log("Age increased!")
    }

    feedPet = () => {
        // console.log("Feed Pet Initianted")
        
        
        if (this.hunger > 0) {
            this.moveToEat()
            lblStatusMessage.innerText = `You feed ${this.name}` 
            lblPopUp.innerHTML = "<img src=\"images/food.png\"/>"
            this.hunger -= 1
            this.updateStats()
        } else if (this.hunger <= 0) {
            lblPopUp.setAttribute("hidden",true)
            lblStatusMessage.innerText = `${this.name} is full.`
        }
        lblPopUp.removeAttribute("hidden")
        lblStatusMessage.removeAttribute("hidden")
    }

    playPet = () => {
        // console.log("Play Pet Initianted")
        lblStatusMessage.innerText = `You play with ${this.name}` 
        
        lblPopUp.innerHTML = "<img src=\"images/playHeart.png\"/>"
        if (this.boredom > 0) {
            this.boredom -= 1
            this.updateStats()
        } else if (this.boredom <= 0) {
            // console.log(this.boredom)
            lblStatusMessage.innerText = `${this.name} is not bored.`
        }
        lblPopUp.removeAttribute("hidden")
        lblStatusMessage.removeAttribute("hidden")
    }

    decreaseSleepiness = () => {
        // console.log("decerease Sleepiness Initiated")
        if (this.sleepiness > 0) {
            this.sleepiness -= 1
            this.updateStats()
        } else if (this.sleepiness <= 0) {
            lblStatusMessage.innerText = this.name+" is not sleepy anymore"
            lblStatusMessage.removeAttribute("hidden")
        }
    }

    increaseSleepiness = () => {
        // console.log("add Sleepiness Initiated")
        if (this.sleepiness < 10) {
            this.sleepiness += 1
            this.updateStats()
        } else if (this.sleepiness >= 10) {
            this.petDied()
            // console.log("Add Sleepiness stops")
        }
    }

    lightSwitch = () => {
        let backgroundLight = document.querySelector(".petImage")
        if (this.light === "on") {
            console.log("light is turned off")
            lblLight.innerText = "on"
            backgroundLight.style.backgroundColor = "rgb(0, 0, 50)"
            lblStatusMessage.innerText = "You turned off the lights"
            lblStatusMessage.removeAttribute("hidden")
            this.light = "off"      
            this.sleeping()
            // this.updateStats()
            
        } else if (this.light === "off") {
            console.log("light is turned on")
            lblLight.innerText = "off"
            backgroundLight.style.backgroundColor = "rgb(0, 255, 255)"
            lblStatusMessage.innerText = "You turned on the lights"
            lblStatusMessage.removeAttribute("hidden")
            // lblStatusMessage.setAttribute("hidden",true)
            this.light = "on"
            clearInterval(this.sleepAdd)
            clearInterval(this.sleepRemove)
            document.querySelector("#lblPopUp").setAttribute("hidden",true)
            // this.updateStats()
            enableFooter()
            // move pet
            this.moveInterval = setInterval(this.moveAlive,100)
        }
        
        
    }

    // decrease sleepienss if light is on. Vise-Versa
    updateSleepiness = () => {
        // console.log("Update Sleepines Start")
        // console.log("Update Sleepiness:",this.light)
        if (this.light === "on") {
            this.addSleepiness()
        } else if (this.light === "off") {
            this.decreaseSleepiness()
        }
    }

    // move pet left and right when alive
    moveAlive = () => {
        // console.log("Pet moved")
        let petImagePosition = document.querySelector("#idPetImage")
        petImagePosition.style.animation = "move 1s infinite"
        // console.log("move alive;",petImagePosition.style.left)
    }

    // function to stop pet to move
    stopMove = () => {
        let petImagePosition = document.querySelector("#idPetImage")
        petImagePosition.removeAttribute("style")
        clearInterval(this.moveInterval)

    }
}



//disable buttons at first load
const disableFooter = () => {
btnPet.setAttribute("disabled",true)
btnLight.setAttribute("disabled",true)
btnPlay.setAttribute("disabled",true)
}

const enableFooter = () => {
    btnPet.removeAttribute("disabled")
    btnLight.removeAttribute("disabled")
    btnPlay.removeAttribute("disabled")
    }

const playGame = () => {
    // console.log(btnPlayRestart.innerText)
    if (btnPlayRestart.innerText === "Play Again"){
        location.reload()
    }
    // console.log(inputName.value)
    if (inputName.value === "") {

    } else {
        //disable play button and label message
        btnPlayRestart.setAttribute("hidden",true)
        lblStatusMessage.setAttribute("hidden", true)
        inputName.setAttribute("hidden",true)
        //enable footer buttons
        enableFooter()

        let petName = inputName.value
        const pet = new Game(petName)
        pet.updateStats()

        // console.log(petButton)
        btnPet.addEventListener("click",pet.feedPet)
        btnLight.addEventListener("click",pet.lightSwitch)
        btnPlay.addEventListener("click",pet.playPet)

        //pet is alive
        // console.log(pet)
    }
}


disableFooter()
btnPlayRestart.addEventListener("click", playGame)


// move variables on top
// seperate pet class to game class