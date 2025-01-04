let pet;
let defaultName = "Gotchi";
let causeOfDeath;

let newPetBtn = document.getElementById("newPetBtn");
newPetBtn.addEventListener("click", newPet);
let feedBtn   = document.getElementById("feedBtn");
feedBtn.addEventListener("click", feedPet);
let playBtn   = document.getElementById("playBtn");
playBtn.addEventListener("click", playPet);
let sleepBtn  = document.getElementById("sleepBtn");
sleepBtn.addEventListener("click", sleepPet);
let petName   = document.getElementById("petName");
petName.addEventListener("click", namePet);

function namePet() {
    if (pet === undefined) { alert("No pet!"); return; }
    if (!isAlive()) { deathMessage(); return; }
    let newPetName = prompt("What do you want to call me?", defaultName);
    if (newPetName === null) { return; }
    pet.name = newPetName;
    displayStats();
}

function newPet() {
    pet = {
        name: defaultName,
        fullness:  100,
        happiness: 100,
        energy:    100,
    };    
    namePet();
    causeOfDeath = "Alive";
    // displayStats();
}    

function displayState() {
    let state = "";
    if (pet.fullness  <= 20) { state += "😩 "; }
    if (pet.fullness  >= 80) { state += "🤤 "; }
    if (pet.happiness <= 20) { state += "😭 "; }
    if (pet.happiness >= 80) { state += "😃 "; }
    if (pet.energy    <= 20) { state += "🥱 "; }
    if (pet.energy    >= 80) { state += "🤩 "; }
    console.log(state);
    displayStats();
}    

function displayStats() {
    console.table(pet);
    // let petName = document.getElementById("petName");
    petName.innerHTML = `${pet.name}`;
    let fullness = document.getElementById("fullness");
    fullness.innerHTML = `${pet.fullness}%`;
    let happiness = document.getElementById("happiness");
    happiness.innerHTML = `${pet.happiness}%`;
    let energy = document.getElementById("energy");
    energy.innerHTML = `${pet.energy}%`;
}    

function feedPet() {
    if (pet === undefined) { alert("No pet!"); return; }
    if (!isAlive()) { deathMessage(); return; }
    pet.fullness += 10;
    keepInRange(); // not needed for feeding
    displayState();
    if (!isAlive()) { deathMessage(); }
}    
function playPet() {
    if (pet === undefined) { alert("No pet!"); return; }
    if (!isAlive()) { deathMessage(); return; }
    pet.fullness  -= 20;
    pet.happiness += 20;
    pet.energy    -= 20;
    keepInRange();
    displayState();
    if (!isAlive()) { deathMessage(); }
}    
function sleepPet() {
    if (pet === undefined) { alert("No pet!"); return; }
    if (!isAlive()) { deathMessage(); return; }
    pet.fullness -= 10;
    pet.energy   += 20;
    keepInRange();
    displayState();
    if (!isAlive()) { deathMessage(); }
}    

function isAlive() {
    if (pet.fullness  > 100) { causeOfDeath = "Overfeeding"; return false; }
    if (pet.fullness  === 0) { causeOfDeath = "Starvation"; return false; }
    if (pet.happiness === 0) { causeOfDeath = "Depression"; return false; }
    if (pet.energy    === 0) { causeOfDeath = "Exhaustion"; return false; }
    return true;
}

function game() {
    newPet();
    displayState();

    while (
        pet.fullness  <= 100 &&
        pet.fullness  >  0   &&
        pet.happiness >  0   &&
        pet.energy    >  0
    ) {
        let input = prompt("Choose input to interact\n[1] Feed\n[2] Play\n[3] Sleep");
        switch (input) {
            case "1":
                pet.fullness  += 10;
                break;
            case "2":
                pet.fullness  -= 20;
                pet.happiness += 20;
                pet.energy    -= 20;
                break;
            case "3":
                pet.fullness  -= 10;
                pet.energy    += 20;
                break;
            default:
                console.log("Wrong input, it must be [1], [2] or [3]!");
                const rate = 5;
                pet.fullness  -= rate;
                pet.happiness -= rate;
                pet.energy    -= rate;
                break;
        }
        keepInRange();
        displayState();
        isAlive();
    }
    deathMessage();
}

function deathMessage() {
    const message = `☠ ${pet.name} has died! 😢\nCause of death: ${causeOfDeath}`;
    console.log(message);
    alert(message);
}

function keepInRange() {
    if (pet.happiness > 100) { pet.happiness = 100; }
    if (pet.energy    > 100) { pet.energy    = 100; }
    if (pet.fullness  < 0)   { pet.fullness  = 0; }
    if (pet.happiness < 0)   { pet.happiness = 0; }
    if (pet.energy    < 0)   { pet.energy    = 0; }
} 
