//Selectors
const mainDiv = document.querySelector(".show-info")
const formShow = document.querySelector(".find-show")
const findShow = document.querySelector(".search-input")
const searchButton = document.querySelector(".submit")
const clear = document.querySelector(".clear i");

//Event Listener
searchButton.addEventListener("click",(e) => {
    e.preventDefault()
    try {
        clearScreen()
    } catch (error) {
        console.log(error)
    }
    finally {
        const content = document.createElement("main");
        content.setAttribute("class", "main-show-container");
        mainDiv.appendChild(content);
        showSearch()
    }
})

clear.addEventListener("click", (e) => {
    e.preventDefault()
    clearScreen()
    findShow.value = "" 
})

//Axios
async function showSearch () {
    try {
        const userSearch = findShow.value
        const config = {
            params: {
                q: userSearch
            }
        }
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)
        const data = res.data
        console.log(data)
        info(data)  
    } catch (error) {
        console.log(error)
        // const content = document.querySelector("main")
        const warning = document.createElement("div")
        warning.setAttribute("class", "warning-container");
        const warningImage = document.createElement("img")
        warningImage.setAttribute("src", "https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjF8fHR2JTIwdW5wbHVnZ2VkfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=180&q=60")
        warningImage.setAttribute("class", "warning-image")
        warning.appendChild(warningImage);
        const warningText = document.createElement("p")
        warningText.setAttribute("class", "warning-text")
        warningText.textContent = `Yikes! Try again later`
        warning.appendChild(warningText);
        mainDiv.appendChild(warning)
    }
}
//Function
function info(shows) {
    for (const output of shows) {
        const title = output.show.name
        const showPoster = output.show.image
        const content = document.querySelector("main");
        //Show Details Div
        const showDetails = document.createElement("div");
            showDetails.setAttribute("class", "show-details-div");
        //Show Images
        const showImage = document.createElement("img"); 
        if (showPoster === null || showPoster.medium === null) {
            showImage.setAttribute("src", "https://via.placeholder.com/210x295/146d6d/9bf3f3?text=Image+Not+Found");
            showImage.setAttribute("class", "show-image");
            showDetails.appendChild(showImage);
        }
        else {
            showImage.setAttribute("src", showPoster.medium);
            showImage.setAttribute("class", "show-image");
            showDetails.appendChild(showImage);
        }
        //Show Name
        const showName = document.createElement("h3");
            showName.textContent = title
            showName.setAttribute("class", "show-name");
            showDetails.appendChild(showName);
        //Append to main
        content.appendChild(showDetails);
    }
}

function clearScreen () {
    // while(content.children){
    //     console.log
    // content.removeChild(content.children)
    // }
    const content = document.querySelector("main")
    if (content) {
    content.remove()
    }
    const warning = document.querySelector(".warning-container")
    if (warning) {
    warning.remove()
    }

}  