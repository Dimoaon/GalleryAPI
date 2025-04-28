class ModalWindow {

    getModal(event) {
        const photoId = event.target.id;
        fetch(`https://api.unsplash.com/photos/${photoId}?client_id=HlUyfa1tHH1cEHv4JZfIRjXymzbB1f3mpx-qVuHCi1s`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let html = `
                <div class="modal-window__container">
                    <div class="modal-window__popup">
                        <div class="modal-window__add-comment">
                            <img class="add-comment__img" src="${data.urls.small}">
                            <input type="text" class="add-comment__name" placeholder="Name">
                            <input type="text" class="add-comment__text" placeholder="Comment">
                            <button class="add-comment__btn" data-id="${data.id}">Leave a comment</button>
                        </div>
    
                        <div class="modal-window__comments"></div>
    
                        <button class="modal-window__button">
                            <i class="fas fa-times button__img"></i>
                        </button>
                    </div>
                    <div class="modal-window__blur"></div>
                </div>
            `;
    
            ROOT_MODAL.innerHTML = html;
            this.eventListener();
        });
    }
    

    hideModalWindow() {
        ROOT_MODAL.innerHTML = ''
    }

    sendComment(event) {
        let name = document.querySelector('.add-comment__name').value;
        let comment = document.querySelector('.add-comment__text').value;
    
        if (name && comment) {
            let commentsEl = document.querySelector('.modal-window__comments');
            let newEl = `
                <div class="comment">
                    <span class="comments__name">${name}</span>
                    <span class="comments__text">${comment}</span>
                </div>
            `;
            commentsEl.innerHTML += newEl;
    
            document.querySelector('.add-comment__name').value = '';
            document.querySelector('.add-comment__text').value = '';
        }
    }
    

    eventListener() {
        const closeButton = document.querySelector('.modal-window__button');
        const blur = document.querySelector('.modal-window__blur');
        const sendComment = document.querySelector('.add-comment__btn');
    
        closeButton.addEventListener('click', this.hideModalWindow.bind(this));
        blur.addEventListener('click', this.hideModalWindow.bind(this));
        sendComment.addEventListener('click', this.sendComment.bind(this));
    }    

}

const modalWindow = new ModalWindow()