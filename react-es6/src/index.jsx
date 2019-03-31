import React from 'react'
import { render } from 'react-dom'
import SearchAppBar from './NavBar';


class App extends React.Component {
/*  constructor(props) {
    super(props)
  }
*/
  render() {
    return (
      <div>
        <SearchAppBar />
      </div>
    )
  }
}

export default App;
render(<App/>, document.getElementById('app'));
