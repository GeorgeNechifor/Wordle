
import './App.css';
import Navigation from "./components/Navigation.jsx";
import Table from "./components/Table.jsx";
import Keyboard from "./components/Keyboard.jsx";
import {useState} from "react";

export default function App(){
    const [collsNumber , setCollsNumber] = useState(5);

    return (
        <div className={"app"}>
            <Navigation></Navigation>
            <div className={"game"}>
                <Table collsNumber={collsNumber} setCollsNumber={setCollsNumber}></Table>
                <Keyboard number={collsNumber}></Keyboard>
            </div>
        </div>
    );
}
