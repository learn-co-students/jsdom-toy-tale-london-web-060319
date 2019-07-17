const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
const submitForm = document.querySelector("form.add-toy-form")

function postFetch(event) {
  event.preventDefault()
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: event.target.name.value,
      image: event.target.image.value
    })
  })
    .then(res => res.json())
    .then(json => {
      addDiv(json.name, json.image)
    })
}

submitForm.addEventListener("submit", postFetch)

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

const toyLists = document.querySelector("div#toy-collection")
function addDiv(name, image, like, id) {
  const newDiv = document.createElement("div")
  newDiv.className = "card"
  toyLists.append(newDiv)

  const newH2 = document.createElement("h2")
  newH2.innerText = name
  const newImg = document.createElement("img")
  newImg.src = image
  newImg.className = "toy-avatar"
  const newP = document.createElement("p")
  newP.innerText = like
  const newButton = document.createElement("button")
  newButton.innerText = "Like <3"
  newButton.className = "like-btn"
  const idHidden = document.createElement("p")
  idHidden.innerText = id
  idHidden.className = "toy" + id
  idHidden.style.display = "none"

  
  newDiv.appendChild(newH2)
  newDiv.appendChild(newImg)
  newDiv.appendChild(newP)
  newDiv.appendChild(newButton)
  newDiv.appendChild(idHidden)

}

function fetchData() {
  
  fetch("http://localhost:3000/toys")
    .then(toys => toys.json())
    .then(toysList  => {
      toysList.forEach(toy => {
        addDiv(toy.name, toy.image, toy.likes, toy.id)
      })
    })
    .then(() => {
      const likeClicks = document.querySelectorAll("#toy-collection .like-btn")
      addLikes(likeClicks)
    })
}


function fetchLikes(event) {
  const idvalue = event.target.parentElement.childNodes[4].innerText
  fetch(`http://localhost:3000/toys/${idvalue}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: event.target.parentElement.childNodes[2].innerText
    })
  })
  .then(res => res.json())
  .then(json => {
    let n = parseInt(document.querySelector(`#toy-collection .toy${json.id}`).parentElement.childNodes[2].innerText)
    n += 1
    document.querySelector(`#toy-collection .toy${json.id}`).parentElement.childNodes[2].innerText = n
  })
}

// event.target.parentElement.childNodes[2].innerText

function addLikes(likeClicks) {
  likeClicks.forEach (item => {
    item.addEventListener("click", fetchLikes)
    })
  }


document.addEventListener('DOMContentLoaded', () => {
  fetchData()
})

