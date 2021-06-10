const createButton = document.getElementById('create_new_task_button');
const modalWindow = document.querySelector('.modal_window_create_new');
const modalWindowClose = document.getElementById('cancel_modal_button');
const modalWindowAdd = document.getElementById('add_modal_id');
const modalTitleText = document.getElementById('modal_title_id');
const listDeals = document.getElementById('list_elements');

const loremTest = 'Lorem ipsum doloksdh fglkdsjfh glkdsjfhg lkjdhsfglkhdsflkg hdlksf hglkdsfhglkdsfhg lksdfjh glor sit, asdfsadf sadf sdf  sdfsa sadg dfg fdg sasd gd fg dfg amilique dolore consequuntur at hic.';

modalWindow.style.display = 'none';

createButton.onclick = () =>{
    console.log('тест кнопки Создать');
    modalWindow.style.display = '';
}

modalWindowAdd.onclick = () =>{
    console.log('тест добавления элемента в список');
    createItem();
}

modalWindowClose.onclick = () =>{
    console.log('тест кнопки закрыть модальное');
    modalWindow.style.display = 'none';
}

function createItem(){
    const divItem = document.createElement('div');
    divItem.setAttribute('class', 'item_for_list');
    const divTitle = document.createElement('div');
    divTitle.setAttribute('class', 'title_item');
    const divDescription = document.createElement('div');
    divDescription.setAttribute('class', 'description_item');
    divTitle.textContent = modalTitleText.value;
    divDescription.textContent = loremTest;

    divItem.appendChild(divTitle);
    divItem.appendChild(divDescription);

    listDeals.appendChild(divItem);

}


