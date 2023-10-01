import {useState , useEffect} from "react";
import '../styles/Keyboard.css';
import useTable from "../hooks/useTable.jsx";
import {Words} from "../data/Words.jsx";
export default function Keyboard(props){

    let Ind = 50;
    const FirstRow = ['Q' , 'W' , 'E' , 'R' , 'T' , 'Y' , 'U' , 'I' , 'O' , 'P'];
    const SecRow = ['A' , 'S' , 'D' , 'F' ,'G' ,'H' , 'J' , 'K' , 'L'];
    const ThirdRow = ['Delete' , 'Z' ,'X','C','V','B','N','M','Enter'];
    const [eventId , setEventId] = useState(15);
    const [ParentId , setParentId] = useState(1);
    const [word , setWord] = useState("code");
    const GetWord = () => {
        let start = 15;
        let finalWord = "";
        while(document.getElementById(`${start}`) != null){
            let element = document.getElementById(`${start}`);
            if(Number(element.parentElement.id) === ParentId){
                finalWord += element.textContent;
            }
            ++start;
        }
        return finalWord;
    }
    const HandleEventListener = (event) => {
           if(!useTable(true , ParentId)){
               document.getElementById(`${eventId}`).innerText = event.target.textContent;
               setParentId(Number(document.getElementById(`${eventId}`).parentElement.id));
               setEventId(prevId => prevId + 1);
           }
    }
    const HandleEnterDeleteEvent = (event) => {
        if(event.target.textContent === 'Delete' && useTable(false , ParentId)){
            setEventId(prevId => prevId - 1);
            document.getElementById(`${eventId - 1}`).innerText = '';

        } else if(event.target.textContent === 'Enter') {
            if(useTable(true , ParentId)){
                setWord(GetWord().split(" ").join("").toLowerCase());
            }
        }
    }
    const [RandomWord , setRandomWord] = useState("");
    function KeyboardColor(value , cls){
       let letter = document.getElementById(`${value.toUpperCase().charCodeAt(0)}`);
       letter.className =`${cls}`;

    }
    function TableColor(value , cls){
        let id = 0;
        for(let i = 15; i <= 15 + (props.number * 5) - 1;++i){
            let element = document.getElementById(`${i}`);
            if(Number(element.parentElement.id) === ParentId){
                if(id === value){
                    element.className = `${cls}`;
                }
                ++id;
            }
        }
    }
    function HandleError(cls){
        for(let i = 15; i < 15 + (5 * props.number);++i){
            let element = document.getElementById(`${i}`);
            if(Number(element.parentElement.id) === ParentId){
                element.className = `${cls}`;
            }
        }
    }
    const [wrong ,setWrong] = useState(0);
    const [loseDisplay , setLoseDisplay] = useState('none');
    useEffect(() => {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((response) => {
            if(response.ok && word !== 'code') {
                for(let i = 0; i < word.length;++i){
                    if(word.indexOf(word[i]) === RandomWord.indexOf(word[i]) && RandomWord.includes(word[i])){
                        KeyboardColor(word[i] , 'green'); TableColor(i, 'first');
                    }
                    else if(RandomWord.includes(word[i])){
                        KeyboardColor(word[i] , 'yellow'); TableColor(i , 'second');
                    }
                    else{
                        KeyboardColor(word[i] , 'gray'); TableColor(i , 'third');
                    }
                }
                setParentId(prev => prev + 1);
                if(word === RandomWord) {
                    setTimeout(() => {window.location.reload()} , 2500)
                }
                else setWrong(prev => prev + 1);
            }
            else if(word !== "code"){
                console.error("Not Found");
                HandleError('error')
                setTimeout(() => {HandleError('box')} , 1000)
            }
        })

    } , [word])

    useEffect(() => {
        if(wrong === 5) {
            let id = 15;
            const clear = setInterval(() => {
                if(id < 15 + props.number * 5){
                    let element = document.getElementById(`${id}`);
                    element.className = 'box';
                    element.textContent = '';
                    ++id;
                }
            } , 30)
            setTimeout(() => {clearInterval(clear)} , 30 * (5 * props.number));
            let newId = 15;
            let ind = 0;
            let showAnswer;
           setTimeout(() => {
               showAnswer = setInterval(() => {
                   if(newId < 15 + props.number){
                       let element = document.getElementById(`${newId}`);
                       element.className = 'first';
                       element.textContent = RandomWord[ind];
                       ind++ ; newId++;
                   }
               } , 100)
           } , 1000)
            setTimeout(() => {clearInterval(showAnswer)} , 100 * props.number);
        }
    }, [wrong]);

    useEffect(() => {
        let List = [];
        Words.commonWords.forEach(word => {
            if(word.length === props.number)
                List.push(word);
        })
        setRandomWord(List[Math.floor(Math.random() * List.length)]);
    }, [props.number]);

    return (
        <div className={"keyboard"}>
            <div className={"key-row"}>
                {FirstRow.map(char => {
                        return <div className={"key"} id={`${char.charCodeAt(0)}`} style={{width:`${70}px`}} onClick={
                            (event) => {HandleEventListener(event)}
                        } key={`${char.charCodeAt(0)}`}>{`${char}`} </div>
                    })}
            </div>
            <div className={"key-row"}>
                {SecRow.map(char => {
                    return <div className={"key"} id={`${char.charCodeAt(0)}`} style={{width:`${79}px`}} onClick={
                        (event) => {HandleEventListener(event)}
                    } key={`${char.charCodeAt(0)}`}>{`${char}`}</div>
                })}
            </div>
            <div className={"key-row"}>
                {ThirdRow.map(char => {
                    ++Ind;
                    if(char !== 'Delete' && char !== 'Enter') return <div className={"key"} id={`${char.charCodeAt(0)}`} onClick={
                        (event) => {HandleEventListener(event)}
                    } style={{width:'70px'}} key={`${char.charCodeAt(0)}`}>{`${char}`}</div>
                    else return <div className={"handle"} style={{width:'110px'}} onClick={
                        (event) => {HandleEnterDeleteEvent(event)}
                    } key={`${Ind}`}>{`${char}`}</div>
                })}
            </div>

        </div>
    );
}