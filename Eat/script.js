const game = document.getElementById("game")
const cat = document.getElementById("cat")
const scoreText = document.getElementById("score")

let foods = []
let score = 0

document.addEventListener("mousemove", e=>{
cat.style.left = e.clientX + "px"
})



function spawnFood(){

const food = document.createElement("img")
food.classList.add("food")

const types = [
"Makanan/a.png",
"Makanan/b.png",
"Makanan/c.png"
]

food.src = types[Math.floor(Math.random()*types.length)]

food.style.left = Math.random()*window.innerWidth + "px"
food.style.top = "0px"

game.appendChild(food)

foods.push({
el:food,
y:0
})

}

function update(){

const catRect = cat.getBoundingClientRect()

let foodNear = false

foods.forEach((f,index)=>{

f.y += 3
f.el.style.top = f.y + "px"

const foodRect = f.el.getBoundingClientRect()

const horizontalClose =
foodRect.left < catRect.right &&
foodRect.right > catRect.left

const verticalClose =
foodRect.bottom > catRect.top - 80

if(horizontalClose && verticalClose){
foodNear = true
}

if(
foodRect.bottom > catRect.top &&
horizontalClose
){

f.el.remove()
foods.splice(index,1)

score++
scoreText.innerText = "Skor: " + score

}

if(f.y > window.innerHeight){
f.el.remove()
foods.splice(index,1)
}

})

if(foodNear){
cat.src = "ammm.png"
}else{
cat.src = "emmm.png"
}

requestAnimationFrame(update)

}

setInterval(spawnFood,1000)

update()