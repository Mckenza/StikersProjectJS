class View {

    constructor(modalContext) {
        this.modalContext = modalContext;
        this.listDeals = document.getElementById('list_elements');
        this.buttonNext = document.getElementById('next_id');
        this.buttonPrevious = document.getElementById('previous_id');
    }

    /* показать модальное окно */
    showModalWindow() {
        this.modalContext.open();
    }

    /* скрыть модальное окно */
    closeModalWindow() {
        this.modalContext.close();
    }

    /* показать описание textArea */
    showPlaceholderDescriptionModal() {
        this.modalContext.showPlaceholderTextarea();
    }

    /* скрыть описание textArea */
    hidePlaceholderDescriptionModal() {
        this.modalContext.hidePlaceholderTextarea();
    }

    /* добавляем элемент списка заданий */
    addTask(element) {
        this.listDeals.insertAdjacentHTML('beforeend', element);
    }

    /* очистить Div со всеми стикерами (для перерисовки) */
    clearList() {
        this.listDeals.innerHTML = '';
    }

    /* Меняем стили при наведении на элемента списка */
    showManageButtons(buttons, title) {
        buttons.classList.add('mouseover');
        title.classList.add('mouseover');
    }

    /* если курсор покидает элемент - стили исчезают */
    hideManageButtons(buttons, title) {
        buttons.classList.remove('mouseover');
        title.classList.remove('mouseover');
    }

    /* показать поля при редактировании */
    showEditElements(item) {
        item.classList.add('open');
    }

    /* скрыть поля редактирования */
    hideEditElements(item) {
        item.classList.remove('open');
    }

    /* скрыть кнопку next */
    hideNextButton() {
        this.buttonNext.classList.remove('showButtonNextAndPrev');
    }

    /* Показать кнопку next */
    showNextButton() {
        this.buttonNext.classList.add('showButtonNextAndPrev');
    }

    /* скрыть кнопку previous */
    hidePreviousButton() {
        this.buttonPrevious.classList.remove('showButtonNextAndPrev');
    }

    /* показать кнопку previous */
    showPreviousButton() {
        this.buttonPrevious.classList.add('showButtonNextAndPrev');
    }
}

export { View };