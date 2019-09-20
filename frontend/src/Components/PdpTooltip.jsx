import React from 'react'
import ToolTip from 'react-portal-tooltip'

export default class PdpTooltip extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tooltipToggle: false
        };
      }
    showTooltip = () => {
        this.setState({tooltipToggle: !this.state.tooltipToggle})
    }
    
    render() {
        return (
            <div>
                <p id="text" onClick={this.showTooltip} >This is a cool component</p>
                <ToolTip active={this.state.tooltipToggle} position="bottom" arrow="center" parent="#text">
                    <div>
                        <p>This is the content of the tooltip</p>
                        <img src="image.png"/>
                    </div>
                </ToolTip>
            </div>
        )
    }
}