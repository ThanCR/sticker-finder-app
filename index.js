

/* animations and styling */
var searchContainer = document.querySelector('.search-container');
var searchIcon = document.querySelector('.search-button');
var searchInput = document.querySelector('.search-box');
var currentFocus = false;

searchContainer.addEventListener('mouseover', () => {
    searchContainer.style.backgroundColor = 'var(--darkPrimary)'
    searchContainer.style.border = '2px solid var(--accent)'
    searchIcon.style.color = 'var(--accent)'
    searchInput.style.color = 'var(--accent)'
})

searchContainer.addEventListener('mouseout', (event) => {
    if (currentFocus) {

    } else {
        searchContainer.style.backgroundColor = 'var(--accent)'
        searchIcon.style.color = 'var(--darkPrimary)'
        searchInput.style.color = 'var(--darkPrimary)'
    }
})

searchInput.addEventListener('focus', () => {
    currentFocus = true;
    searchInput.style.caretColor = 'var(--accent)'
    searchInput.style.color = 'var(--accent)'
    searchContainer.style.backgroundColor = 'var(--darkPrimary) !important'
})

searchInput.addEventListener('focusout', () => {
    currentFocus = false;
    searchInput.style.caretColor = 'var(--black)'
    searchIcon.style.color = 'var(--darkPrimary)'
    searchInput.style.color = 'var(--darkPrimary)'
    searchContainer.style.backgroundColor = 'var(--accent)'
})

searchInput.addEventListener('keydown', ({ key }) => {
    if (key == 'Enter') {
        searchSticker();
    }

})

resultsContainer = document.querySelector('.results-container');

const openPanel = () => {
    resultsContainer.style.height = '25rem'
    resultsContainer.style.width = 'min(90%, 80rem)'
}

const closePanel = () => {
    resultsContainer.style.height = '0'
    resultsContainer.style.width = '0'
}

/*  fetching data */

stickerList = '';


const searchSticker = () => {
    resultsList = document.querySelector('.results-list')
    resultsList.innerHTML = ''
    closePanel();

    setTimeout(() => {
        const apikey = 'wcjXOiCheW5TGPktU6TF6Cj8q87TcwWj';
        const limit = 48;
        var searchQuery = document.querySelector('.search-box').value;
        const apiURL = `https://api.giphy.com/v1/stickers/search?api_key=${apikey}&q=${searchQuery}&limit=${limit}`;

        fetch(apiURL)
            .then(response => response.json())
            .then(data => buildStickerObjects(data))
            .catch(error => console.log(error))
    }, 300);


    setTimeout(() => {
        openPanel();
    }, 1000);

}

const buildStickerObjects = ({ data }) => {
    stickerList = '';
    resultsList = document.querySelector('.results-list')
    if (data.length == []) {
        setTimeout(() => {
            resultsList.innerHTML = `
            <div class="results-not-found">
                <p class="not-found-text">I couldn't find your sticker</p>
                <i class="fa-regular fa-face-sad-tear not-found-icon"></i>
            </div>
            `;

        }, 500)
    } else {
        data.forEach(({ images }) => {
            stickerList += `
                <li class="list-item"><img src="${images.original.url}" loading="lazy" width="100" height="75" frameBorder="0" class="giphy-embed"/></li> 
                `;
        });
        resultsList.innerHTML = stickerList;
    }

}


