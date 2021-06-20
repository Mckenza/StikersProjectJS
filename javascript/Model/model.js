import {ItemList} from '/javascript/elementList/elementList.js';

class Model{
    constructor(list, contextView){
        this.list = list;
        this.contextView = contextView;
        this.count = localStorage.getItem('count') ? localStorage.getItem('count') : localStorage.setItem('count', 0);                
        this.delId = localStorage.getItem('delArrayId') ? JSON.parse(localStorage.getItem('delArrayId')) : localStorage.setItem('delArrayId', JSON.stringify([]));                  // массив удаленных ID
        this.safeId = localStorage.getItem('safeArrayId') ? JSON.parse(localStorage.getItem('safeArrayId')) : localStorage.setItem('safeArrayId', JSON.stringify([]));              // Массив сохраненных ID
        this.render();
    }

    setDataItem(data){
        localStorage.setItem(data.id, JSON.stringify(data));                            // Добавляем в локал элемент списка в формате JSON

        const buffSafeArray = JSON.parse(localStorage.getItem('safeArrayId'));          // Получаем массив сохраненных ID из localStorage
        buffSafeArray.push(data.id);                                                    // Добавляем в буферный массив новый ID
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

    setDelId(delId){                                                                    
        const buffDelArray = JSON.parse(localStorage.getItem('delArrayId'));            // Получаем массив удаленных ID из localStorage
        const buffSafeArray = JSON.parse(localStorage.getItem('safeArrayId'));          // Получаем массив сохраненных ID из localStorage
        buffDelArray.push(delId);                                                       // Добавляем в массив удаленный ID

        for(let i = 0; i < buffSafeArray.length; i++){                                    
            if(buffSafeArray[i] === delId){                                             // Удаляем "Удаленнный ID" из массива сохраненных (текущих);
                buffSafeArray.splice(i, 1);
                break;
            }
        }

        localStorage.setItem('safeArrayId', JSON.stringify(buffSafeArray));             // Перезаписываем
        localStorage.setItem('delArrayId', JSON.stringify(buffDelArray));               // Перезаписываем
    }

    /* Удаляем из Localstorage элемент по ID */
    delItemFromObj(id){
        localStorage.removeItem(id);                                                   
    }

    /* Редактируем (перезаписываем) элемент в localStorage */
    editItem(obj){
        localStorage.setItem(obj.id, JSON.stringify(obj));                          
    }

    /* Отображаем элементы из LocalStorage при обновлени страницы */
    render(){
        const IDs = JSON.parse(localStorage.getItem('safeArrayId'));                // массив сохраненных ID в правильном порядке (как создавались)
        if(!IDs){
            return;
        }
        IDs.forEach(item =>{
            const element = new ItemList(JSON.parse(localStorage.getItem(item))).create();
            this.contextView.addTask(element);
        })
    }   
}

export {Model};