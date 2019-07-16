const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
const btn = document.getElementsByTagName('button')
let addToy = false

document.addEventListener('DOMContentLoaded', function() {
  fetchToys()
})

function addLike(element) {
  const likes = element.parentElement.querySelector('p');
  const currentLikes = parseInt(likes.innerText.split(" ")[0]);
  const updatedLikes = currentLikes+1;
  let patchURL =`http://localhost:3000/toys/${element.id}`
  let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": updatedLikes
      })
    }
    return fetch(patchURL, configObj)
    .then((response) => {
        return response.json();
    })
    .then((like_obj) => {
      likes.innerText = `${updatedLikes} Like`
    })
}

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
    event.preventDefault()
    addData(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

function addData(data) {
  let postURL = 'http://localhost:3000/toys'
  let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": data.name.value,
        "image": data.image.value,
        "likes": 0
      })
    };
  return fetch(postURL, configObj)
  .then((response) => {
      return response.json();
  })
  .then((obj_toy) => {
    buildCards(obj_toy)
  })
}

function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => {
      buildCards(toy)
    })
  })
}

function buildCards(data) {
    toyCollection.innerHTML += `
    <div class="card">
    <h2>${data.name}</h2>
    <img src="${data.image}" class="toy-avatar" />
    <p>${data.likes} Likes </p>
    <button id=${data.id} class="like-btn" onclick="addLike(this)"> Like <3</button>
    </div>`;
}

