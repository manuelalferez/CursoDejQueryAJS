(async function load() {
    async function getData(URL) {
        const request = await fetch(URL); //Realiza una petición a la URL
        const data = await request.json();
        return data;
    }

    const $form = document.getElementById("form");
    const $home = document.getElementById("home");
    const $modal = document.getElementById("modal");
    const $hideModal = document.getElementById('hide-modal');
    const $overlay = document.getElementById("overlay");
    const $modalTittle = $modal.querySelector("h1");
    const $modalDescription = $modal.querySelector("p");
    const $modalImage = $modal.querySelector("img");
    const $featuringContainer = document.getElementById("featuring");

    const BASE_API = "https://yts.am/api/v2/";

    setAttributes = ($element, attributes) => {
        for (const attribute in attributes) {
            $element.setAttribute(attribute, attributes[attribute]); // (height, attributes[height]= 50)
        }
    }

    featuringTemplate = (pelicula) => {
        return (
            `<div class="featuring">
        <div class="featuring-image">
          <img src="${pelicula.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${pelicula.title}</p>
        </div>
      </div>`
        )
    }

    $form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Con esto conseguimos que no se recargue la página cada vez que realizamos una entrada. Aumentamos el rendimiento 
        $home.classList.add("search-active");
        $loader = document.createElement("img");
        setAttributes($loader, {
            src: "src/images/loader.gif",
            height: "50",
            widht: "50"
        })
        $featuringContainer.append($loader);
        const data = new FormData($form); //Datos suministrados por el formulario
        const {
            data: {
                movies: pelis
            }
        } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get("name")}`); //Nos traemos la película de la API de películas
        $featuringContainer.innerHTML = featuringTemplate(pelis[0]);
    })

    //await: indica que se debe de terminar con el fragmento de código para continuar con la ejecución de la función.
    const actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
    const dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`);
    const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`);

    videoItemTemplate = (movie) => {
        return (
            `<div class="primaryPlaylistItem">
                <div class="primaryPlaylistItem-image">
                <img src="${movie.medium_cover_image}">
                </div>
                <h4 class="primaryPlaylistItem-title">
                ${movie.title}
                </h4>
            </div>`
        )
    }

    createTemplateHTML = (htmlString) => {
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = htmlString;
        return html.body.children[0];
    }

    addEventClick = ($element) => {
        $element.addEventListener("click", () => {
            showModal();
        })
    }

    showModal = () => {
        $overlay.classList.add("active");
        $modal.style.animation = 'modalIn .8s forwards';
    }

    hideModal = () => {
        $overlay.classList.remove("active");
        $modal.style.animation = 'modalOut .8s forwards';
    }

    renderMovieList = (list, $container) => {
        $container.children[0].remove();
        list.forEach((movie) => {
            const htmlString = videoItemTemplate(movie);
            const movieElement = createTemplateHTML(htmlString);
            $container.append(movieElement);
            addEventClick(movieElement);
        })
    }

    const $animationContainer = document.getElementById("animation");
    renderMovieList(animationList.data.movies, $animationContainer);

    const $actionContainer = document.getElementById("action");
    renderMovieList(actionList.data.movies, $actionContainer);

    const $dramaContainer = document.querySelector("#drama"); //Otra forma de nombrarlo, aunque más larga
    renderMovieList(dramaList.data.movies, $dramaContainer);

    $hideModal.addEventListener("click", hideModal);
})();