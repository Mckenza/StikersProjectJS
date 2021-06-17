class ItemList {

    constructor(obj) {
        this.title = obj.title;
        this.description = obj.description;
    }
    textData = '14.04.2021 16:53';

    create() {
        const item = `<div class="item_for_list">
            <div class="title_item" id="title_item_id">
                ${this.title}
            </div>
            <div class="description_item">
                ${this.description}
            </div>
            <div class="time_create">
                Дата создания: 14.06.2021 16:43
            </div>
            <div class="mouseover_trigger" id="mouseover_trigger_id">
                <div class="buttons_manage" id="buttons_manage_id">
                    <div class="button_edit_item">
                        <input type="button" id="edit_button_id">
                    </div>
                    <div class="button_delete_item">
                        <input type="button" id="del_button_id">
                    </div>
                </div>
            </div>
            <div class="edit_element">
                <input type="text" class="input_title">
                <textarea class="textarea_item"></textarea>
                <div class="buttons_confirm_edit">
                    <input type="button" id="button_confirm_edit_id">
                    <input type="button" id="button_cancel_edit_id">
                </div>
            </div>
        </div>`
        return item;
    }
}

export { ItemList };