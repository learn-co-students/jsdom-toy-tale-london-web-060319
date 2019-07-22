const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const allToysDiv = document.querySelector("#toy-collection")
let addToy = false

const baseUrl = "http://localhost:3000"
const toysUrl = baseUrl + "/toys"
// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})




// OR HERE!

const  formSubmitHandler = event => {
  event.preventDefault()
  const toyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0,
  }

  fetch(toysUrl, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    },
    body: JSON.stringify(toyObj)
  })
  .then( resp=>resp.json())
  .then( renderToy )
}

toyForm.addEventListener("submit", formSubmitHandler )

const handleLikeClick = toy => {
  fetch(toysUrl + `/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: toy.likes + 1
    })
  })
  .then( fetchAndRenderAllToys )
}
const renderToy = toy => {
  const newCardElement = document.createElement("div")
  newCardElement.className = "card"

  const newHeader =  document.createElement("h2")
  newHeader.innerHTML = toy.name 

  const newImage = document.createElement("img")
  newImage.src = toy.image 
  newImage.className = "toy-avatar"

  const newLikes = document.createElement("p")
  newLikes.innerHTML = `${toy.likes} Likes`

  const newLikeBtn = document.createElement("button")
  newLikeBtn.innerText = "Like <3"
  newLikeBtn.className = "like-btn"
  newLikeBtn.addEventListener( "click", () => handleLikeClick(toy) )

  // const HTMLEls = [headerEl, imgEl, pEl, btnEl]
  // HTMLEls.forEach( el => newCard.appendChild(el) )

  newCardElement.appendChild( newHeader )
  newCardElement.appendChild( newImage )
  newCardElement.appendChild( newLikes )
  newCardElement.appendChild( newLikeBtn )

  allToysDiv.appendChild( newCardElement )
}



const renderAllToys = (toys) => {
  allToysDiv.innerHTML = ""
  toys.forEach(renderToy)
}

const fetchAllToys = () => {
  return fetch(toysUrl)
  .then(resp => resp.json())
}

const fetchAndRenderAllToys = () => {
  fetchAllToys().then( renderAllToys )
}

fetchAndRenderAllToys()