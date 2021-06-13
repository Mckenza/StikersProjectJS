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

    /* добавляем елемент списка заданий; data - объект 1 - заголовок, 2 - описание*/
    addTask(data) {
        const divItem = document.createElement('div');
        divItem.setAttribute('class', 'item_for_list');
        const divTitle = document.createElement('div');
        divTitle.setAttribute('class', 'title_item');
        const divDescription = document.createElement('div');
        divDescription.setAttribute('class', 'description_item');
        divTitle.textContent = data['title'];
        divDescription.textContent = data['description'];

        divItem.appendChild(divTitle);
        divItem.appendChild(divDescription);

        this.listDeals.appendChild(divItem);
    }
}

export {View};