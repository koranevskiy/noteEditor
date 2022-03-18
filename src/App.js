import React from 'react';
import './App.scss';
import data from './data/data.json'
import Notes from "./Components/Pages/NotePage/Notes";

const App = () => {

    return (
        <div className="App">
            <Notes data={data.notes}/>
        </div>
    );
};

export default App;