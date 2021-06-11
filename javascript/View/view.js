class View {

    modalWindow = document.querySelector('.modal_window_create_new');
    listDeals = document.getElementById('list_elements');
    modalTitleText = document.getElementById('modal_title_id');

    constructor() {
        this.isViewModal = false;
        this.setIsViewModal(this.isViewModal);
    }

    /* Окно добавления новой задачи */
    setIsViewModal(isView) {
        if (isView) {
            this.modalWindow.style.display = '';
        } else {
            this.modalWindow.style.display = 'none';
        }
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