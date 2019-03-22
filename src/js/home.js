/* console.log('hola mundo!'); */
const a = "Manuel";
let b = "123Manuel";

/* Simple function */
function cambiar(x) {
    b = x;
}

/* Arrow function */
cambiaMe = (x) => {
    b = x;
}

/* const getEmail = new Promise(function (todoBien, todoMal) {
    setTimeout(() => {
        todoBien();
    }, 5000)
})

const getUser = new Promise(function (todoBien, todoMal) {
    setTimeout(() => {
        todoBien();
    }, 2000)
}) */

/* getUser
    .then(() => {
        console.log("Todo ha ido bien.")
    })
    .catch(() => {
        console.log("Todo ha ido mal.")
    }) */

/* Promise.all([
    getUser,
    getEmail,
])
.then(()=>{
    console.log("Bien, puto amo")
})
.catch(()=>{
    console.log("Mal. No te raie")
}) */

/* Promise.race([
    getUser,
    getEmail
])
.then(()=>{
    console.log("Bien, puto amo")
})
.catch(()=>{
    console.log("Mal. No te raie")
}) */

/* $.ajax('https://randomuser.me/api/', {
    method: 'GET',
    success: (data) => {
        console.log(data); // Nos trae todo el objeto, user en este caso
        console.log(data.results[0].name.first); // Nos trae un elemento del user en particular
    },
    error: (error) => {
        console.log(error)
    }
}) */

/* fetch('https://randomuser.me/api/')
    .then((response) => {
        console.log(response)
        return response.json()
    })
    .then((user) => {
        console.log(user.results[0].name.first);
    })
    .catch(() => {
        console.log("Error :(")
    }); */

(async function load() {
    async function getData(URL) {
        const request = await fetch(URL); //Realiza una petición a la URL
        const data = await request.json();
        return data;
    }

    //await: indica que se debe de terminar con el fragmento de código para continuar con la ejecución de la función.
    const actionList = await getData("https://yts.am/api/v2/list_movies.json?genre=action");
    const dramaList = await getData("https://yts.am/api/v2/list_movies.json?genre=drama");
    const animationList = await getData("https://yts.am/api/v2/list_movies.json?genre=animation");

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

    renderMovieList = (list, $container) => {
        $container.children[0].remove();
        list.forEach((movie) => {
            const htmlString = videoItemTemplate(movie);
            $container.append(createTemplateHTML(htmlString));
        })
    }

    const $animationContainer = document.getElementById("animation");
    renderMovieList(animationList.data.movies, $animationContainer);

    const $actionContainer = document.getElementById("action");
    renderMovieList(actionList.data.movies, $actionContainer);

    const $dramaContainer = document.querySelector("#drama"); //Otra forma de nombrarlo, aunque más larga
    renderMovieList(dramaList.data.movies, $dramaContainer);

    const $modal = document.getElementById("modal");
    const $overlay = document.getElementById("overlay");
    const $home = document.getElementById("home");

    const $modalTittle = $modal.querySelector("h1");
    const $modalDescription = $modal.querySelector("p");
    const $modalImage = $modal.querySelector("img");

    const $featuringContainer = document.getElementById("featuring");
    const $form = document.getElementById("form");

})();


/* (async function jili (){
    async function getUser (URL){
        const request= await fetch(URL); //Realiza una petición a la URL
        const data= await request.json();
        return data;
    }

    //await: indica que se debe de terminar con el fragmento de código para continuar con la ejecución de la función.
    const actionList= await getUser("https://swapi.co/api/people/1");

    console.log("user", actionList);
})(); */