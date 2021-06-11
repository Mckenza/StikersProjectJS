class Model{
    constructor(){
        this.data = [];
    }

    setDataItem(data){
        this.data.push(data);
        console.log(this.data);
    }  
}

export {Model};