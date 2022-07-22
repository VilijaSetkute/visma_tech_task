const source = document.querySelector('body')
const grayscaleCheckbox = document.querySelector('.grayscale')
const blurSlider = document.querySelector('.blur-radius')
const filterImage = document.querySelector('.main-picture')
const imageAuthor = document.querySelector('.author')
const imageDimentions = document.querySelector('.dimensions')
const imageGallery = document.querySelector('.images')
const loader = document.querySelector('.loader')
const leftPane = document.querySelector('.left-pane')


let allImages = []
let pageNumber = 1

const getImages = async (page) => {    
    const url_api = `https://picsum.photos/v2/list?page=${page}`
    await fetch(url_api)
        .then(res => res.json())
        .then(data => {
            allImages.push(...data)
            showImages()
        })
}
getImages(pageNumber)

leftPane.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement

    if (scrollTop + clientHeight >= scrollHeight) {
        pageNumber++;
        getImages(pageNumber);
    }
}, {
    passive: true
});

const showImages = () => {
    filterImage.src = `${allImages[0].download_url}`
    imageAuthor.innerText = `Author: ${allImages[0].author}`
    imageDimentions.innerText = `Width x Height: ${allImages[0].width} px x ${allImages[0].height} px`

    allImages.forEach(singleImage => {
        const newImage = document.createElement('div')
        newImage.style.backgroundImage = `url(${singleImage.download_url})`
        newImage.style.width = '200px'
        newImage.style.height = '200px'
        newImage.style.backgroundSize = 'cover'
        newImage.style.backgroundPosition = 'center'
        newImage.style.cursor = 'pointer'
        newImage.style.margin = '10px 20px 10px 10px'
        newImage.setAttribute('oncontextmenu', 'return false')
        newImage.onclick = () => {
            filterImage.src = `${singleImage.download_url}`
            imageAuthor.innerText = `Author: ${singleImage.author}`
            imageDimentions.innerText = `Width x Height: ${singleImage.width} px x ${singleImage.height} px`
        }
        imageGallery.appendChild(newImage)
    });
}

function applyImageFilter() {
    if (grayscaleCheckbox.checked) {
        filterImage.style.filter = `grayscale(100%) blur(${Number(blurSlider.value)}px)`
    } else {
        filterImage.style.filter = `grayscale(0%) blur(${Number(blurSlider.value)}px)`
    }
}

