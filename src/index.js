import React from "react";
import './style/App.css'
import { createRoot } from "react-dom/client";
import { SeasonDisplay } from "./SeasonDisplay";
import { Spinner } from "./Spinner";

const container = document.getElementById('root')
const root = createRoot(container)

class App extends React.Component {
    state = { lat: null, errorMessage: '' }
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            error => this.setState({ errorMessage: error.message })
        )
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage} </div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Spinner message="Please accept location request" />
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

root.render(<App />)