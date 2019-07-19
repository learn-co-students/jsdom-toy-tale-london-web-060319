const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!

window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then(toys => toys.json())
  .then(toysArr => showToys(toysArr));
})

const mainDiv = document.querySelector("#toy-collection");

function showToys(toysArr) {
  for (const toy of toysArr) {
    addToyToDom(toy)
  }
}

function submitNewToy(name, image, likes) {
  const formData = {
    name: name,
    image: image,
    likes: likes
  };
  let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  fetch("http://localhost:3000/toys", configObj)
  .then(response => response.json())
  .then(toy => addToyToDom(toy))
}

function addToyToDom(toy) {
  let toyDiv = document.createElement("div");
    mainDiv.appendChild(toyDiv);

    let nameH2 = document.createElement("h2");
    nameH2.innerText = `${toy.name}`;
    toyDiv.appendChild(nameH2);

    let toyImg = document.createElement("img");
    toyDiv.setAttribute("class", "card");
    toyImg.src = `${toy.image}`;
    toyImg.setAttribute("class", "toy-avatar");
    toyDiv.appendChild(toyImg);

    let likesP = document.createElement("p");
    likesP.id = "toy-" + toy.id
    likesP.innerText = `${toy.likes} Likes`;
    toyDiv.appendChild(likesP);

    let toyBtn = document.createElement("button");
    toyBtn.setAttribute("class", "like-btn");
    toyBtn.innerText = "Like <3";
    toyDiv.appendChild(toyBtn);
    toyBtn.addEventListener("click", () => {likeToy(toy.id)});
} 
const addToyForm = document.querySelector("form")

addToyForm.addEventListener("submit", e => {
  e.preventDefault();
  const formNode = e.target;
  let name = formNode[0].value;
  let image = formNode[1].value;
  submitNewToy(name, image, 0);
})

function likeToy(id) {
  fetch(`http://localhost:3000/toys/${id}`)
  .then(response => response.json())
  .then(toy => addToyLike(toy)) 
}

function addToyLike(toy) {
  const likesData = {
    likes: toy.likes + 1
  }
  let configObj = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(likesData)
  };
  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
  .then(response => response.json())
  .then(toy => updateToyLikeDom(toy));
}

function updateToyLikeDom(toy) {
  const newLikes = document.getElementById(`toy-${toy.id}`);
  newLikes.innerText = `${toy.likes} Likes`;
}