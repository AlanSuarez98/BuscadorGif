let submitBtn = document.getElementById("submit-btn");

let generateGif = () => {
  // mostrar el cargador hasta que se cargue el gif
  let loader = document.querySelector(".loader");
  loader.style.display = "block";
  document.querySelector(".wrapper").style.display = "none";

  //Obtener valor de búsqueda (predeterminado => risa)
  let q = document.getElementById("search-box").value;
  //Necesitamos 10 gifs para mostrar en el resultado
  let gifCount = 24;
  //URL API =
  let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
  document.querySelector(".wrapper").innerHTML = "";

  //Hacer una llamada a la API
  fetch(finalURL)
    .then((resp) => resp.json())
    .then((info) => {
      console.log(info.data);
      //Todos los gifs
      let gifsData = info.data;
      gifsData.forEach((gif) => {
        //Generar tarjetas para cada gif
        let container = document.createElement("div");
        container.classList.add("container");
        let iframe = document.createElement("img");
        console.log(gif);
        iframe.setAttribute("src", gif.images.downsized_medium.url);
        iframe.onload = () => {
          //si los iframes se han cargado correctamente, reduzca el conteo cuando se cargue cada gif
          gifCount--;
          if (gifCount == 0) {
            //Si todos los gifs se han cargado, oculta el cargador y muestra la interfaz de usuario de los gifs
            loader.style.display = "none";
            document.querySelector(".wrapper").style.display = "grid";
          }
        };
        container.append(iframe);

        //Copiar botón de enlace
        let copyBtn = document.createElement("button");
        copyBtn.innerText = "Copy Link";
        copyBtn.onclick = () => {
          //Anexar el ID obtenido a la URL predeterminada
          let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
          //Copiar texto dentro del campo de texto
          navigator.clipboard
            .writeText(copyLink)
            .then(() => {
              alert("GIF copiado al portapapeles");
            })
            .catch(() => {
              //si el navegador no es compatible
              alert("GIF copiado al portapapeles");
              //crear entrada temporal
              let hiddenInput = document.createElement("input");
              hiddenInput.setAttribute("type", "text");
              document.body.appendChild(hiddenInput);
              hiddenInput.value = copyLink;
              //Seleccionar entrada
              hiddenInput.select();
              //Copiar el valor
              document.execCommand("copy");
              //elimina la entrada
              document.body.removeChild(hiddenInput);
            });
        };
        container.append(copyBtn);
        document.querySelector(".wrapper").append(container);
      });
    });
};

//Generar Gifs al cargar la pantalla o cuando el usuario hace clic en enviar
submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);