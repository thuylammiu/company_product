import { Component } from "react";

class App extends Component{
    constructor()
    {
        super();
        this.state = {value:true}
    }
    render()
    {
       
        return (
            <div style = {{fontSize:20, paddingLeft:20}}></div>
        )
    }
}

export default App;