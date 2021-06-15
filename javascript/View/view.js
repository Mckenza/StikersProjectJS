class View {

    listDeals = document.getElementById('list_elements');

    constructor(modalContext) {
        this.modalContext = modalContext;
    }

    
    /* показать модальное окно */
    showModalWindow(){
        this.modalContext.open();
    }

    /* скрыть модальное окно */
    closeModalWindow(){
        this.modalContext.close();
    }

    /* показать описание textArea */
    showPlaceholderDescriptionModal(){
        this.modalContext.showPlaceholderTextarea();
    }

     /* скрыть описание textArea */
    hidePlaceholderDescriptionModal(){
        this.modalContext.hidePlaceholderTextarea();
    }

    /* добавляем елемент списка заданий */
    addTask(element) {
        this.listDeals.insertAdjacentHTML('beforeend', element);
    }
}

export {View};