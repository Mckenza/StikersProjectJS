class Model{
    constructor(){
        this.data = [];
        this.listItems = [];
    }

    setDataItem(data){
        this.data.push(data);
        console.log(this.data);
    }

    setTHMLitem(item){
        this.listItems.push(item);
    }
}

export {Model};