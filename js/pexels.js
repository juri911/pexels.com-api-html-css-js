//use the apikey you have generated
const apikey = "7rxxPBRm3iKAocSoChFsxptMreoTZMiY8yFrkBaluCqhNFFcL5wxNxtE"; 
////////////////////////////////////////////////////////////////////////////
const input = document.querySelector("input");
const search_btn = document.querySelector(".search_btn");
const showmore_btn = document.querySelector(".showmore");

let page_num = 1;
let search_text = "";
let search = false;

input.addEventListener("input", (event) => {
    event.preventDefault();
    search_text = event.target.value;
})

search_btn.addEventListener("click", () => {
    if (input.value === "") {
        alert("Please enter the some text")
        return;
    }
    cleargallery();
    search = true;
    SearchPhotos(search_text, page_num);
})

function cleargallery() {
    document.querySelector(".display_images").innerHTML = "";
    page_num = 1;
}

async function CuratedPhotos(page_num) {
    // fetch the data from api
    const data = await fetch(`https://api.pexels.com/v1/curated?page=${page_num}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: apikey,         //use the apikey you have generated
            },
        });
    const response = await data.json();     //convert the response to json 
    console.log(response);

    display_images(response);            // call the display_images method to display the images on page
}

function display_images(response) {
    //use forEach loop to iterate on each item
    response.photos.forEach((image) => {
        const photo = document.createElement("div");
        photo.classList.add('col-10', 'col-sm-6', 'col-md-4', 'col-lg-3');
        photo.innerHTML = 
        `<figure class="rounded rounded-4 overflow-hidden bsb-overlay-hover">
        <a>
            <img class="img-fluid bsb-scale-up bsb-hover-scale" src="${image.src.portrait}" alt="${image.alt}S">
        </a>
        <figcaption class>
            <h3 class="text-white text-center fs-5 bsb-hover-fadeInLeft my-auto">${image.alt}</h3>
            <div class="text-white bsb-hover-fadeInRight"><i class="fa-solid fa-camera fa-xl"></i> by <a class="btn btn-light" href="${image.photographer_url}" target="_blank"><strong>${image.photographer}</strong> <i class="fa fa-external-link" aria-hidden="true"></i></a></div>
            <div class="text-white bsb-hover-fadeInUp w-100 mb-0 mt-auto">
                <div class="dropup-center dropup w-100 ">
                    <a class="w-100  btn btn-success dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-download" aria-hidden="true"></i> Free Download
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="${image.src.original}" target="_blank">Original <span class="opacity-25">${image.width}x${image.height}</span></a></li>
                        <li><a class="dropdown-item" href="${image.src.large2x}" target="_blank">Large</a></li>
                        <li><a class="dropdown-item" href="${image.src.large}" target="_blank">Medium</a></li>
                        <li><a class="dropdown-item" href="${image.src.medium}" target="_blank">Small</a></li>
                    </ul>
                </div>
            </div>
        </figcaption>
    </figure>`;
    document.querySelector(".display_images").appendChild(photo);
    });
}

async function SearchPhotos(query, page_num) {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page_num}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: apikey,
            },
        });
    const response = await data.json();
    console.log(response);

    display_images(response);
}

showmore_btn.addEventListener("click", () => {
    if (!search) {
        page_num++;
        CuratedPhotos(page_num);
    }
    else {
        if (search_text.value === "")
            return;
        page_num++;
        SearchPhotos(search_text, page_num);
    }
})

CuratedPhotos(page_num);



