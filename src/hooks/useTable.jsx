

export default function useTable(value , ParentId){
    let start = 15;
    while(document.getElementById(`${start}`) != null){
        let element = document.getElementById(`${start}`);
        if(Number(element.parentElement.id) === ParentId){
            if(value){
                if(element.textContent === '') return false;
            }
            else{
                if(element.textContent !== '') return true;
            }
        }
        ++start;
    }
    return !!value;
}