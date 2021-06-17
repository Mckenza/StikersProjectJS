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

    /* Меняем стили при наведении на элемента списка */
    showManageButtons(buttons, title){
        buttons.classList.add('mouseover');
        title.classList.add('mouseover');
    }

    /* если курсор покидает элемент - стили исчезают */
    hideManageButtons(buttons, title){
        buttons.classList.remove('mouseover');
        title.classList.remove('mouseover');
    }

    /* показать поля при редактировании */
    showEditElements(inputEditTitle, inputEditDescription){
        inputEditTitle.classList.add('show');
        inputEditDescription.classList.add('show');
    }
}

export {View};