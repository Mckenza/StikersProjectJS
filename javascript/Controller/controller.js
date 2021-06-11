import {View} from '/javascript/View/view.js';
import {Model} from '/javascript/Model/model.js';

class Controller{
    createButton = document.getElementById('create_new_task_button');
    modalWindowClose = document.getElementById('cancel_modal_button');
    modalWindowAdd = document.getElementById('add_modal_id');
    modalTitleText = document.getElementById('modal_title_id');

    loremTest = 'Lorem ipsum doloksdh fglkdsjfh glkdsjfhg lkjdhsfglkhdsflkg hdlksf hglkdsfhglkdsfhg lksdfjh glor sit, asdfsadf sadf sdf  sdfsa sadg dfg fdg sasd gd fg dfg amilique dolore consequuntur at hic.';

    constructor(){
        this.view = new View;
        this.model = new Model;
    }

    /* слушатель кнопки "Создать" */
    buttonCreate(){
        this.createButton.onclick = ()=>{
            this.view.setIsViewModal(true);
        }
    }

    /* слушатель кнопки "Добавить" */
    buttonAddItem(){
        this.modalWindowAdd.onclick = ()=>{
            const objData = {};
            objData['title'] = this.modalTitleText.value;
            objData['description'] = this.loremTest;
            this.view.addTask(objData);
            this.model.setDataItem(objData);
            this.view.setIsViewModal(false);
        }
    }

    /* слушатель кнопки "Отмена" */
    buttonCancel(){
        this.modalWindowClose.onclick = ()=>{
            this.view.setIsViewModal(false);
        }
    }
}

export {Controller};