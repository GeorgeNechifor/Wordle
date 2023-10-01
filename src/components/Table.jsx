import {useState , useEffect } from "react";
import '../styles/Table.css';
export default function Table(props){

    const PanelRows = Array(5).fill(true);
    let PanelCols = Array(props.collsNumber).fill(true);
    let IdNumberRows = 0 , IdNumberCols = 14;
    const [random , setRandom] = useState("");
    const Check = () => {
        for(let i = 15; i <= 15 + (props.collsNumber * 5) - 1;++i){
            if(document.getElementById(`${i}`).textContent !== '')
                return false;
        }
        return true;
    }

    return (
        <div className={"table"}>
            <div className={"settings"}>
                <div className={"settings-button"}>
                    <input type={"number"} value={props.collsNumber} className={"cols"} onChange={(event) => {
                        let number = Number(event.target.value);
                        if(Check()) {
                            number < 3 || number > 7 ? props.setCollsNumber(5) : props.setCollsNumber(number);
                        }
                    }}/>
                    <div className={"reset"} onClick={() => {window.location.reload()}}>Reset</div>
                </div>
            </div>
            <div className={"panels"}>
                {
                    PanelRows.map(element => {
                        ++IdNumberRows;
                        return  <div className={"row"} id={`${IdNumberRows}`} key={IdNumberRows}>
                            {
                                PanelCols.map(element => {
                                    ++IdNumberCols;
                                    return <div className={"box"} id={`${IdNumberCols}`} key={`${IdNumberCols}`}></div>
                                })
                            }
                        </div>
                    })
                }
            </div>

        </div>
    );
}