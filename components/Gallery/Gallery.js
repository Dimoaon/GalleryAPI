class Gallery {

    render() {
        const html = `
            <h1 class="gallery__title">Gallery API App</h1>
            <button class="gallery__btn">Load New Images</button>
        `
        
        ROOT_GALLERY.innerHTML = html

        this.getImg(9)
    }

    getImg(count) {
        fetch(`https://api.unsplash.com/photos/random?count=${count}&client_id=HlUyfa1tHH1cEHv4JZfIRjXymzbB1f3mpx-qVuHCi1s`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let html = '<div class="gallery__imges">';
            console.log(data);
            data.forEach(element => {
                html += `
                    <img class="gallery__img" src="${element.urls.small}" id="${element.id}"> 
                `;
            });
            html += '</div>';
    
            ROOT_GALLERY.innerHTML += html;
            this.eventListener();
        })
        .catch((error) => {
            ROOT_GALLERY.innerHTML += `<p class="error-message">Error: ${error.message}</p>`;
        });
    }    
    

    showModalWindow(event) {
        modalWindow.getModal(event)
    }

    eventListener() {
        const showModal = document.querySelectorAll('.gallery__img')
        const button = document.querySelector('.gallery__btn');

        showModal.forEach(element => {
            element.addEventListener('click', this.showModalWindow)
        })

        button.addEventListener('click', () => {
            this.render()
        });
    }
}

const gallery = new Gallery()