const API_KEY = 'KbexBR8qeJpCEXQqTnGUfIn5uuFrBkihM67TpoeY0oA'
let imagesList = []
const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let readyState = false
let totalImages = 0
let loadCount = 5
const API = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${loadCount}`
const setAttributes = (el, attr) => {
    for (const key in attr) {
        el.setAttribute(key, attr[key])
    }
}
const loadingState = () => {
    totalImages++
    if (totalImages === imagesList.length) {
        readyState = true
        loader.hidden = true
        loadCount = 20
    }
}
const displayPhotos = () => {
    totalImages = 0
    imagesList.forEach(photo => {
        const link = document.createElement('a')
        const img = document.createElement('img')
        setAttributes(link, {
            href: photo.links.html,
            target: "_blank"
        })
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description || photo.description,
            title: photo.alt_description || photo.description
        })
        img.addEventListener("load", loadingState)
        link.appendChild(img)
        imageContainer.appendChild(link)
    })
}

const getPhotos = async () => {
    try {
        const response = await fetch(API)
        imagesList = await response.json()
        displayPhotos()
    } catch (error) {
        console.log(error);
    }
}
window.addEventListener("scroll", (e) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyState) {
        readyState = false
        getPhotos()
    }
})
getPhotos()