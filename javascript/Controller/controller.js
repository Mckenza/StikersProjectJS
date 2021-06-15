import {View} from '/javascript/View/view.js';
import {Model} from '/javascript/Model/model.js';
import {ModalWindow} from '/javascript/ModalWindow/modalWindow.js';
import {ItemList} from '/javascript/elementList/elementList.js';

class Controller{
    createButton = document.getElementById('create_new_task_button');

    constructor(){
        this.model = new Model();
        this.modalWindow = new ModalWindow();
        this.view = new View(this.modalWindow);
        this.modalWindowClose = document.getElementById('cancel_modal_button');
        this.modalWindowAdd = document.getElementById('add_modal_id');
        this.modalTitleText = document.getElementById('modal_title_id');
        this.modalTextArea = document.getElementById('textarea_modal_id');
        this.listDeals = document.getElementById('list_elements');
        this.modalTextArea.value = '';                                          // для того, что б курсор, при вызове окна, был в самом углу
        this.buttonCreate();
        this.buttonAddItem();
        this.buttonCancel();
        this.textareaFocus();
        this._addEvent();
    }

    /* слушатель кнопки "Создать" */
    buttonCreate(){
        this.createButton.onclick = ()=>{
            this._clearField();
            this.view.showModalWindow();
        }
    }

    /* слушатель кнопки "Добавить" */
    buttonAddItem(){
        this.modalWindowAdd.onclick = ()=>{
            const objData = {};
            objData['title'] = this.modalTitleText.value;
            objData['description'] = this.modalTextArea.value;
            const newItem = new ItemList(objData['title'], objData['description']);
            this.model.setDataItem(objData);
            this.view.addTask(newItem.create());
            this._clearField();

            this.modalWindow.close();
        }
    }

    /* слушатель кнопки "Отмена" */
    buttonCancel(){
        this.modalWindowClose.onclick = ()=>{
            this._clearField();
            this.view.closeModalWindow();
        }
    }

    textareaFocus(){
        this.modalTextArea.onfocus = ()=>{
            this.view.hidePlaceholderDescriptionModal();
        }
        this.modalTextArea.onblur = ()=>{
            if(this.modalTextArea.value === ''){
                this.view.showPlaceholderDescriptionModal();
            }
        }
    }
    
    _clearField(){
        this.modalTextArea.value = '';
        this.modalTitleText.value = '';
        this.view.showPlaceholderDescriptionModal();
    }

    _addEvent(){
        this.listDeals.addEventListener('click', (e)=>{
            console.log(e.target);
        })
    }
}

export {Controller};