import React from 'react';

class NavSteps extends React.Component {
    constructor(props) {
        super(props);
      };

  render() {
    return (

      <div style={{width:"1000px"}}>
        <h2>Nav</h2>
         <p>Step {this.props.currentStep}</p>
         <p>Total Steps: {this.props.totalSteps}</p>
         <p>Is Active: {this.props.isActive}</p>
         <div>
            <nav aria-label="wizard-nav">
                <ul class="pagination">        
                    <li className="page-item"><button 
                      onClick={this.props.firstStep} 
                      className="btn btn-secondary page-link"
                      >First Step</button></li>
                    <li className="page-item"> <button 
                      onClick={this.props.previousStep} 
                      className="btn btn-primary page-link"
                      ><span aria-hidden="true">&laquo;</span> Previous Step</button>
                    </li>
                    
                    <li className="page-item"><button 
                      onClick={this.props.nextStep} 
                      className="btn btn-primary page-link"
                      >Next Step <span aria-hidden="true">&raquo;</span></button>
                    </li>
      
                    <li className="page-item"><button 
                      onClick={this.props.lastStep} 
                      className="btn btn-secondary page-link"
                      >Last Step</button>
                    </li>
                </ul>
            </nav>
          </div>
      </div>
    )
  }
}

export default NavSteps
