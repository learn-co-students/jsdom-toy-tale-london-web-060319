const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
const makeToy = document.querySelector('.submit')
const toyURL = "http://localhost:3000/toys"
let addToy = false


// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', function(){
  fetchToys()
})

// READ
function fetchToys(){
  return fetch(toyURL)
  .then(resp => resp.json())
  .then(json => renderToys(json))
}

function renderToys(json){
  toyCollection.innerHTML = ""
  json.forEach(toy => {
  renderToy(toy)
  })
}

// function renderToy(toy){
//   const card = document.createElement('div')
//     card.className = "card"
//     card.innerHTML = `<h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar" /><p>${toy.likes} Likes </p><button class="like-btn">like</button>`
//     toyCollection.appendChild(card)
// }

function renderToy(toy){
  const card = document.createElement('div')
  card.className = "card"
  const header = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const btn = document.createElement('button')

  header.innerText = toy.name
  img.src = toy.image
  img.className = "toy-avatar"
  p.innerText = `${toy.likes} likes`
  btn.className = "like-btn"
  btn.innerText = "like toy"
  btn.addEventListener("click", () => handleLikeClick(toy))

  card.appendChild(header)
  card.appendChild(img)
  card.appendChild(p)
  card.appendChild(btn)
  toyCollection.appendChild(card)
}

// CREATE
function submitToy(toy_data){
  fetch(toyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify( {
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then((obj_toy) => {
    renderToy(obj_toy)
  })
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', event => {
      toyForm.style.display = 'none'
      event.preventDefault()
      submitToy(event.target)
      
    })
  } else {
    toyForm.style.display = 'none'
  }
})


// UPDATE --------- LIKES


// function submitLike(e){
//   // e.preventDefault()
//   let more = parseInt(e.likes.innerText) + 1

//   fetch(`http://localhost:3000/toys/${e.target.id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify( {
//       "likes": more
//     })
//   })
//   .then(res => res.json())
//   .then((like_obj => {
//     e.target.previousElementSibling.innerText = `${more} likes`;
//   }))
// }


const handleLikeClick = toy => {
  fetch(toyURL + `/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes + 1
  })
})
  .then(fetchAndRenderAllToys)
}

const fetchAndRenderAllToys = () => {
  fetchToys().then( renderAllToys )
}

fetchAndRenderAllToys()