import React from 'react';
import { useTranslation } from 'react-i18next';

class NavSteps extends React.Component {
    constructor(props) {
        super(props);
      };

  render() {
    const { t } = this.props;

    return (

      <div style={{width:"1000px"}}>
        <h2>Nav</h2>
         <p>{this.props.currentStep}/{this.props.totalSteps}</p>
         <p>{this.props.isActive}</p>
         <div>
            <nav aria-label="wizard-nav">
                <ul class="pagination">        
                    <li className="page-item"><button 
                      onClick={this.props.firstStep} 
                      className="btn btn-secondary page-link"
                      >{t('nav.first_step')}</button></li>
                    <li className="page-item"> <button 
                      onClick={this.props.previousStep} 
                      className="btn btn-primary page-link"
                      ><span aria-hidden="true">&laquo;</span> {t('nav.previous_step')}</button>
                    </li>
                    
                    <li className="page-item"><button 
                      onClick={this.props.nextStep} 
                      className="btn btn-primary page-link"
                      >{t('nav.next_step')} <span aria-hidden="true">&raquo;</span></button>
                    </li>
      
                    <li className="page-item"><button 
                      onClick={this.props.lastStep} 
                      className="btn btn-secondary page-link"
                      >{t('nav.last_step')}</button>
                    </li>
                </ul>
            </nav>
          </div>
      </div>
    )
  }
}

export default NavSteps
