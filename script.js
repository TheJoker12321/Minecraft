let id = 1
let rowGrid = 1
let columnGrid = 1

function createBlock() {

    for (let i = 0; i < 3000; i ++) {

        let div = document.createElement('div');
        div.id = id
        div.classList = 'block'
        div.style.width = '3rem'
        div.style.height = '3rem'
        addToGrid(div)
        div.style.backgroundColor = '#87ceeb' 
        div.style.border = 'none'
        checkIdToImage(div)
        const main = document.getElementById('board-game')
        main.appendChild(div)
        id++

    }

    let flags = true
    let distanceNow = 0
    while (flags) {

        console.log('neria');
        
        const result = createTree(distanceNow)
        if (!result) {

            flags = false
        }
        distanceNow += result
        console.log(distanceNow);

    }
}


function addImage(div) {

    let img = document.createElement('img')
    img.style.width = '100%'
    img.style.height = '100%'
    
    if (div.classList.value === 'tree') {

        div.style.backgroundImage = 'url("./images/tree.png")'
        div.style.backgroundPosition = 'center'
        div.style.backgroundRepeat = 'no-repeat'
        div.style.backgroundSize = 'cover'

    } else if (div.classList.value === 'land') {

        div.style.backgroundImage = 'url("./images/land.png")'
        div.style.backgroundPosition = 'center'
        div.style.backgroundRepeat = 'no-repeat'
        div.style.backgroundSize = 'cover'

    } else if (div.classList.value === 'up-land') {

        div.style.backgroundImage = 'url("./images/up-land.png")'
        div.style.backgroundPosition = 'center'
        div.style.backgroundRepeat = 'no-repeat'
        div.style.backgroundSize = 'cover'

    } else if (div.classList.value === 'wall') {

        div.style.backgroundImage = 'url("./images/wall.png")'
        div.style.backgroundPosition = 'center'
        div.style.backgroundRepeat = 'no-repeat'
        div.style.backgroundSize = 'cover'

    } else if (div.classList.value === 'race') {

        div.style.backgroundImage = 'url("./images/race.png")'
        div.style.backgroundPosition = 'center'
        div.style.backgroundRepeat = 'no-repeat'
        div.style.backgroundSize = 'cover'

    } else if (div.classList.value === 'black-wall') {

        div.style.backgroundImage = 'url("./images/black-wall.png")'
        div.style.backgroundPosition = 'center'
        div.style.backgroundRepeat = 'no-repeat'
        div.style.backgroundSize = 'cover'
     
    } else {

        div.backgroundImage = 'none'
        div.style.backgroundColor = '#87ceeb'
    }
}

function addToGrid(div) {

    div.style.gridColumn = `${columnGrid}`
    div.style.gridRow = `${rowGrid}`
    if (columnGrid === 100) {

        columnGrid = 1
        rowGrid ++

    } else {

        columnGrid ++
    }
}

function checkIdToImage(div) {


    if (2800 >= div.id && div.id> 1500) {

        div.classList = 'wall'
        
        addImage(div)

    } else if (3000 >= div.id && div.id > 2800) {

        div.classList = 'black-wall'
        addImage(div)
    } else if (div.id <= 1500 && div.id > 1100) {

        div.classList = 'land'
        addImage(div)
    } else if (div.id <= 1100 && div.id > 1000) {

        div.classList = 'up-land'
        addImage(div)
    }

}


function createTree( distanceBefore) {

    let flag = true
    let distance = 0

    while (flag) {

        const distanceForRace = Math.floor(Math.random() * 50)

        if (distanceForRace === 0) {

            continue

        }

        if (distanceBefore + distanceForRace > 100) {

            return false

        }

        if (distanceBefore + distanceForRace - 3 > distanceBefore || distanceBefore === 0) {
            
            distance += distanceForRace
            flag = false
    
        }

    }

    const heightRace = Math.floor(Math.random() * 3) + 3
    console.log(heightRace);
    
    let id = 900 + distanceBefore + distance
    console.log(id);
    


    for (let i = 0; i < heightRace; i++) {


        let race = document.getElementById(`${id}`)
        console.log(race);
        
        
        
        race.classList = 'race'
        addImage(race)
        id -= 100


    }

    createLeaves(id + 100)
    return  distance
    
}


function createLeaves(idUpRace) {

    for (let y = 0; y < 6; y ++) {

        for (let x = 1; x <= 3; x ++) {

            if ((y >= 2 && x === 3) || (y >= 4 && x > 1)) {

                continue
            }

            const elem = document.getElementById(`${idUpRace - (y * 100) + x}`)

            if ((idUpRace - (idUpRace % 100) + 100 - (y * 100)) < elem.id) {
                continue
            }

            elem.classList = 'tree'
            addImage(elem)
        }
    }

    for (let y = 0; y < 6; y ++) {

        for (let x = 1; x <= 3; x ++) {

            if ((y >= 2 && x === 3) || (y >= 4 && x > 1)) {

                continue
            }

            const elem = document.getElementById(`${idUpRace - (y * 100) - x}`)
            console.log(elem);
            
            if ((idUpRace - (idUpRace % 100) - (y * 100)) >= elem.id) {
                continue
            }
           
            elem.classList = 'tree'
            addImage(elem)
        }
    }

    for (let y = 1; y <= 5; y++) {

        const elem = document.getElementById(idUpRace - (y * 100))
        elem.classList = 'tree'
        addImage(elem)
    }
}


function click(){

    let tools = document.getElementsByClassName('tools')

    for (const pointer of tools) {

        pointer.addEventListener('click', () => {
            // pointer.style.cursor = `url("./images/toolsImages/${pointer.id}.png"), auto`;
            document.body.style.cursor = `url("./images/toolsImages/${pointer.id}.png"), auto`;

        })
    }

}

function changeImg() {

    document.addEventListener('click', (event) => {

        if (event.target.classList.value === 'race' && document.body.style.cursor === `url("./images/toolsImages/axe.png"), auto`) {
            
            event.target.classList = 'block'
            addImage(event.target)

        }

        console.log(event.target);
        
    })
}

changeImg()
click()


createBlock()



