import { View } from '/javascript/View/view.js';
import { Model } from '/javascript/Model/model.js';
import { ModalWindow } from '/javascript/ModalWindow/modalWindow.js';

class Controller {

    constructor() {
        this.modalWindow = new ModalWindow();
        this.view = new View(this.modalWindow);
        this.createButton = document.getElementById('create_new_task_button');
        this.modalWindowClose = document.getElementById('cancel_modal_button');
        this.modalWindowAdd = document.getElementById('add_modal_id');
        this.modalTitleText = document.getElementById('modal_title_id');
        this.modalTextArea = document.getElementById('textarea_modal_id');
        this.listDeals = document.getElementById('list_elements');
        this.model = new Model(this.listDeals, this.view);
        this.modalTextArea.value = '';                                          // для того, что б курсор, при вызове окна, был в самом углу
        this.buttonCreate();
        this.buttonAddItem();
        this.buttonCancel();
        this.textareaFocus();
        this.addEvent();
        this.nextPageButton();
        this.previousPageButton();
    }

    /* слушатель кнопки "Создать" */
    buttonCreate() {
        this.createButton.onclick = () => {
            this.clearField();
            this.view.showModalWindow();
        }
    }

    /* слушатель кнопки "Добавить" */
    buttonAddItem() {
        this.modalWindowAdd.onclick = () => {
            const id = this.model.setIdElement();
            const date = this.model.getDate(false);
            const objData = {
                title: this.modalTitleText.value,
                description: this.modalTextArea.value,
                id: id,
                date: date,
            };
            this.model.setDataItem(objData);
            this.clearField();
            this.model.pageView(true);

            this.modalWindow.close();

        }
    }

    /* слушатель кнопки "Отмена" */
    buttonCancel() {
        this.modalWindowClose.onclick = () => {
            this.clearField();
            this.view.closeModalWindow();
        }
    }

    /* Кнопка - следующая страница */
    nextPageButton() {
        document.getElementById('next_id').onclick = () => {
            this.model.setStart(true);
        }
    }

    /* Кнопка - предыдущая страница */
    previousPageButton() {
        document.getElementById('previous_id').onclick = () => {
            this.model.setStart(false);
        }
    }

    /* убираем или показываем надпись описания в модальном окне */
    textareaFocus() {
        this.modalTextArea.onfocus = () => {
            this.view.hidePlaceholderDescriptionModal();
        }
        this.modalTextArea.onblur = () => {
            if (this.modalTextArea.value) {
                this.view.showPlaceholderDescriptionModal();
            }
        }
    }

    /* очищаем поля в модальном окне */
    clearField() {
        this.modalTextArea.value = '';
        this.modalTitleText.value = '';
        this.view.showPlaceholderDescriptionModal();
    }

    /* добавляем ивенты для каждых кнопок */
    addEvent() {
        /* при наведении на элемент, появляются кнопки "удалить" и "редактировать" */
        this.listDeals.addEventListener('mouseover', (e) => {
            if (e.target.getAttribute('id') === 'mouseover_trigger_id') {
                const parentItem = e.target.parentNode;
                const viewButtons = parentItem.querySelector('.buttons_manage');
                const inputTitle = parentItem.querySelector('.title_item');
                this.view.showManageButtons(viewButtons, inputTitle);
            }
        });
        /* убираем кнопки "удалить" и "редактировать" */
        this.listDeals.addEventListener('mouseleave', (e) => {
            if (e.target.getAttribute('id') === 'mouseover_trigger_id') {
                const parentItem = e.target.parentNode;
                const viewButtons = parentItem.querySelector('.buttons_manage.mouseover');
                const inputTitle = parentItem.querySelector('.title_item.mouseover');
                this.view.hideManageButtons(viewButtons, inputTitle);
            }
        }, true);

        /* Двойным нажатием удаляем объект списка */
        this.listDeals.addEventListener('dblclick', (e) => {
            if (e.target.getAttribute('id') === 'del_button_id') {
                const item = e.target.closest('.item_for_list');
                const getId = Number(item.getAttribute('id'));              // определение ID удаляемого элемента
                this.model.delItemFromObj(getId);                           // удаляем объект из localStorage
                this.model.setDelId(getId);                                 // Метод по удалению ID из сохраненных и добавления в массив удаленных
                this.model.pageView(true);                                  // отрисовка
            }
        });

        /* Редактирование элемента */
        this.listDeals.addEventListener('click', (e) => {
            if (e.target.getAttribute('id') === 'edit_button_id') {
                const parentItem = e.target.closest('.item_for_list');
                const date = parentItem.querySelector('.time_create');
                const editItem = parentItem.querySelector('.edit_element');
                const titleElement = parentItem.querySelector('.title_item');
                const descriptionElement = parentItem.querySelector('.description_item');

                const titleContentInput = editItem.querySelector('.input_title');                   // Получаем input элемент - заголовок
                const descriptionContentTextArea = editItem.querySelector('.textarea_item');        // Получаем textarea элемент - описание

                titleContentInput.value = titleElement.textContent.trim();                          // input === div content (title)
                descriptionContentTextArea.value = descriptionElement.textContent.trim();           // textarea === div content (description)
                const bufTitle = titleElement.textContent.trim();                                   // буферное значени заголовка
                const bufDescription = descriptionElement.textContent.trim();                       // буферное значение описания
                titleElement.textContent = '';                                                      // очищаем div с тектом title
                descriptionElement.textContent = '';                                                // очищаем div с текстом description

                this.view.showEditElements(editItem);

                let timerLeave;                                                                     // таймер "без курсора" на элементе списка
                let trigger = true;

                editItem.onmouseover = () => {                                                        // Очищаем таймер если успели вернуть курсор
                    clearTimeout(timerLeave);
                }

                editItem.onmouseout = () => {                                                         // Запускаем таймер (снова) если убрали курсор с элемента
                    if (trigger) {
                        timerLeave = setTimeout(() => {
                            titleElement.textContent = bufTitle;
                            descriptionElement.textContent = bufDescription;
                            this.view.hideEditElements(editItem);
                        }, 3000);
                    }
                }

                /* Подтверждение редактирования */
                editItem.querySelector('#button_confirm_edit_id').onclick = () => {
                    trigger = false;
                    titleElement.textContent = titleContentInput.value;
                    descriptionElement.textContent = descriptionContentTextArea.value;
                    titleContentInput.value = '';
                    descriptionContentTextArea.value = '';
                    const dateNow = this.model.getDate(true);                               // Изменяем дату в момент изменения 
                    this.model.editItem({
                        title: titleElement.textContent,
                        description: descriptionElement.textContent,
                        id: parentItem.getAttribute('id'),
                        date: dateNow,
                    });
                    date.textContent = dateNow;
                    this.view.hideEditElements(editItem);
                }

                /* отмена введенных значений для изменения */
                editItem.querySelector('#button_cancel_edit_id').onclick = () => {
                    trigger = false;
                    titleElement.textContent = bufTitle;
                    descriptionElement.textContent = bufDescription;
                    this.view.hideEditElements(editItem);
                }
            }
        });
    }
}

export { Controller };