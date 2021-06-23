import { ItemList } from '/javascript/elementList/elementList.js';

class Model {
    constructor(list, contextView) {
        this.list = list;
        this.start = 0;
        this.finish = 5;
        this.contextView = contextView;
        this.count = localStorage.getItem('count') ? localStorage.getItem('count') : localStorage.setItem('count', 0);
        this.delId = localStorage.getItem('delArrayId') ? JSON.parse(localStorage.getItem('delArrayId')) : localStorage.setItem('delArrayId', JSON.stringify([]));                  // массив удаленных ID
        this.safeId = localStorage.getItem('safeArrayId') ? JSON.parse(localStorage.getItem('safeArrayId')) : localStorage.setItem('safeArrayId', JSON.stringify([]));              // Массив сохраненных ID
        this.pageView(true);
    }

    setDataItem(data) {
        localStorage.setItem(data.id, JSON.stringify(data));                            // Добавляем в локал элемент списка в формате JSON

        const buffSafeArray = JSON.parse(localStorage.getItem('safeArrayId'));          // Получаем массив сохраненных ID из localStorage
        buffSafeArray.unshift(data.id);                                                    // Добавляем в буферный массив новый ID
        localStorage.setItem('safeArrayId', JSON.stringify(buffSafeArray));             // "перезаписываем" массив уже с новым ID; 
    }

    /* для каждого элемента свой ID */
    setIdElement() {
        const arrayFromLocal = JSON.parse(localStorage.getItem('delArrayId'));          // Получаем массив удаленных ID из localStorage
        if (arrayFromLocal.length !== 0) {                                              // Если есть ID в массиве - получаем првый элемент из массива
            const idFromDel = arrayFromLocal.shift();                                   // Получаем и удаляем его
            localStorage.setItem('delArrayId', JSON.stringify(arrayFromLocal));         // "перезаписываем" массив уже с удаленным ID;
            return idFromDel;
        } else {                                                                        // Если в массиве нет ID - просто продолжаем счет, 
            let countBuff = Number(localStorage.getItem('count'));
            countBuff++;
            localStorage.setItem('count', countBuff)
            return countBuff;
        }
    }

    setDelId(delId) {
        const buffDelArray = JSON.parse(localStorage.getItem('delArrayId'));            // Получаем массив удаленных ID из localStorage
        const buffSafeArray = JSON.parse(localStorage.getItem('safeArrayId'));          // Получаем массив сохраненных ID из localStorage
        buffDelArray.push(delId);                                                       // Добавляем в массив удаленный ID

        for (let i = 0; i < buffSafeArray.length; i++) {
            if (buffSafeArray[i] === delId) {                                             // Удаляем "Удаленнный ID" из массива сохраненных (текущих);
                buffSafeArray.splice(i, 1);
                break;
            }
        }

        localStorage.setItem('safeArrayId', JSON.stringify(buffSafeArray));             // Перезаписываем
        localStorage.setItem('delArrayId', JSON.stringify(buffDelArray));               // Перезаписываем
    }

    /* Удаляем из Localstorage элемент по ID */
    delItemFromObj(id) {
        localStorage.removeItem(id);
    }

    /* Редактируем (перезаписываем) элемент в localStorage */
    editItem(obj) {
        localStorage.setItem(obj.id, JSON.stringify(obj));
    }

    /* Отображаем элементы из LocalStorage при обновлени страницы */
    render(start, finish, array) {
        this.contextView.clearList();
        if (!array) {
            return;
        }

        for (let i = start; i <= finish; i++) {
            const element = new ItemList(JSON.parse(localStorage.getItem(array[i]))).create();

            this.contextView.addTask(element);
        }
    }

    /* какую страницу отрисовать */
    pageView(trig = false) {
        const safeArrayId = JSON.parse(localStorage.getItem('safeArrayId'));
        const lengthArray = safeArrayId.length - 1;
        if (trig) {
            this.start = 0;
            this.finish = 5;
        }

        if (lengthArray <= this.finish) {
            this.render(this.start, lengthArray, safeArrayId);
            this.contextView.hideNextButton();
        } else {
            this.render(this.start, this.finish, safeArrayId);
            this.contextView.showNextButton();
        }

        if (this.start > 0) {
            this.contextView.showPreviousButton();
        } else {
            this.contextView.hidePreviousButton();
        }
    }

    /* реакция на нажатия кнопок next и previous */
    setStart(trigger) {
        const safeArrayId = JSON.parse(localStorage.getItem('safeArrayId'));
        const lengthArray = safeArrayId.length - 1;

        if (trigger) {
            this.start += 6;
            console.log(this.start);
            this.finish = lengthArray - this.finish > 5 ? this.finish += 6 : this.finish = lengthArray;
            console.log(this.finish);
            this.pageView();
        } else {
            this.finish = this.start - 1;
            this.start -= 6;
            console.log(this.finish);
            this.pageView();
        }
    }

    /* Текущая дата */
    getDate(isEdit) {
        let formDate;
        const date = new Date(Date.now());
        let day = date.getDate();
        let mouth = date.getMonth() + 1;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const year = date.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (mouth < 10) {
            mouth = '0' + mouth;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (isEdit) {
            formDate = `Изменен: ${day}.${mouth}.${year} ${hours}:${minutes}`;
        } else {
            formDate = `Дата создания: ${day}.${mouth}.${year} ${hours}:${minutes}`;
        }

        return formDate;
    }
}

export { Model };