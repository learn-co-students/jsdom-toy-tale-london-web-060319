const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollectionDiv = document.querySelector('#toy-collection')
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

const formSubmitHandler = event => {
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
    body: JSON.stringify( toyObj )
  })
  .then( resp => resp.json() )
  .then( renderToyCard )
}

toyForm.addEventListener('submit', formSubmitHandler)

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

const renderToyCard = (toy) => {
  const newCard = document.createElement('div')
  newCard.className = "card"

  const headerEl = document.createElement('h2')
  headerEl.innerText = toy.name

  const imgEl = document.createElement('img')
  imgEl.src = toy.image
  imgEl.className = "toy-avatar"

  const pEl = document.createElement('p')
  pEl.innerText = `${toy.likes} Likes`

  const btnEl = document.createElement('button')
  btnEl.innerText = "Like <3"
  btnEl.className = "like-btn"
  btnEl.addEventListener('click', () => handleLikeClick(toy) )

  const HTMLEls = [headerEl, imgEl, pEl, btnEl]
  HTMLEls.forEach( el => newCard.appendChild(el) )
  
  // newCard.appendChild(headerEl)
  // newCard.appendChild(imgEl)
  // newCard.appendChild(pEl)
  // newCard.appendChild(btnEl)

  toyCollectionDiv.appendChild( newCard )

  // newCard.innerHTML = `
  //   <h2>${toy.name}</h2>
  //   <img src=${toy.image} class="toy-avatar" />
  //   <p>${toy.likes} Likes </p>
  //   <button class="like-btn">Like <3</button>

  // `

}

const renderAllToys = (toys) => {
  toyCollectionDiv.innerHTML = ""
  toys.forEach(renderToyCard)
}

const fetchAllToys = () => {
  return fetch(toysUrl)
  .then( resp => resp.json() )
}

const fetchAndRenderAllToys = () => {
  fetchAllToys().then( renderAllToys )
}

fetchAndRenderAllToys()


// OR HERE!
