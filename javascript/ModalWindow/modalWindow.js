class ModalWindow{

    constructor(){
        this.divModal = document.createElement('div');
        this._formModal();
        this.modalPlaceholdertextarea = document.getElementById('placeholder_textarea_id');
    }

    close(){
        this.divModal.classList.remove('open');
    }

    open(){
        this.divModal.classList.add('open');
    }

    hidePlaceholderTextarea(){
        this.modalPlaceholdertextarea.classList.add('unvisible');
    }

    showPlaceholderTextarea(){
        this.modalPlaceholdertextarea.classList.remove('unvisible');
    }

    _formModal(){
        const form = `
        <div class="modal_window">
            <div class="wrap_modal_window">
                <div class="title_modal_window">
                    <input type="text" placeholder="Название" id="modal_title_id">
                </div>
                <div class="body_modal_window">
                    <div class="wrap_body_modal">
                        <div class="placeholder_textarea" id="placeholder_textarea_id">
                            <span>Дополнительная информация</span>
                        </div>
                        <textarea type="text" id="textarea_modal_id"></textarea>
                        
                    </div>
                </div>
                <div class="wrap_add_modal_button">
                    <input type="button" id="add_modal_id">
                </div>
                <div class="wrap_cancel_modal_button">
                    <input type="button" id="cancel_modal_button">
                </div>
                
                
                
            </div>
        </div>`
        
        this.divModal.setAttribute('class', 'modal_window_create_new');
        this.divModal.insertAdjacentHTML('afterbegin', form);
        document.body.prepend(this.divModal);
        return this.divModal;
    }
}

export {ModalWindow};