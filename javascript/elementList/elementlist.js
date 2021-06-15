class ItemList{

    constructor(title, description){
        this.title = title;
        this.description = description;
    }
    textData = '14.04.2021 16:53';

    create(){
        const item = `<div class="item_for_list" id="item_for_list_id">
                        <div class="buttons_manage">
                            <div class="button_edit_item">
                                <input type="button">
                            </div>
                            <div class="button_delete_item">
                                <input type="button">
                            </div>
                        </div>
                        <div class="title_item">
                            ${this.title}
                        </div>
                        <div class="description_item">
                            ${this.description}
                        </div>
                        <div class="time_create">
                            Дата создания: ${this.textData}
                        </div>
                    </div>`
        return item;
    }

    delete(){

    }

    edit(){
        
    }
}

export {ItemList};