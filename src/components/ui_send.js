import React from "react";
import { navigate } from "gatsby"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoadGif from '../images/hourglass.gif';
import { withTranslation } from 'react-i18next';

class SendUi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            country : 'BE',
            court: 'RSCE',
            year: 1990,
            identifier: '',
            text: '',
            userkey: '',
            waiting: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            text : props.uploadedText
        };
    }

    handleChange(event) {
        let change = {}
        const name = event.target.name;
        change[name] = name == 'identifier' ? event.target.value + '.OJ' : event.target.value

        this.setState(change);
    }

    handleSubmit(event) {
        this.setState({ waiting: true });
        event.preventDefault();


        const query = {
            '_v' : 1,
            '_timestamp': Math.floor(Date.now() / 1000),
            'country' : this.state.country,
            'court' : this.state.court,
            'year' : this.state.year,
            'identifier' : this.state.identifier,
            'text' : this.state.text,
            'user_key' : this.state.userkey,
        }
        // Get api response
        // fetch(`https://anon-api.openjustice.be/run`, {
        fetch(`${process.env.GATSBY_DATA_API}/create`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(query),
            }).then(response => response.json())
           .then(resultData => {
                // FIXME: Add some log
                //if ('error' in resultData.log)
                //    this.handleCallback(false, {log_text: resultData.log.error});
                //else if ('lines' in resultData.log)
                    // this.handleCallback(resultData.text, {log_text: this.logDisplay(resultData.log.lines)});
                this.setState({waiting: false})
                if (resultData.result == 'ok')
                    navigate(`/success?hash=${resultData.hash}`)
                    
            });
    }

    render() {
        const { t } = this.props;
        return (
            <div className="col-12 mb-5 shadow rounded border py-3 my-3">
                <h2>3) {t('form_title.add_metadata')}</h2>
                <div className="row">
                    <Form onSubmit={ this.handleSubmit } onChange={ this.handleChange } className="pl-3">
                      <Form.Group controlId="myform.country">
                          <Form.Label> {t('form.country')}</Form.Label>
                          <Form.Control name="country" as="select">
                            <option>BE</option>
                          </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="myform.court">
                          <Form.Label> {t('form.source')}</Form.Label>
                          <Form.Control name="court" as="select">
                            <option>RSCE</option>
                          </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="myform.year">
                          <Form.Label> {t('form.year')}</Form.Label>
                          <Form.Control name="year" as="select">
                            <option>2020</option>
                            <option>2019</option>
                            <option>2018</option>
                            <option>2017</option>
                            <option>2016</option>
                            <option>2015</option>
                            <option>2014</option>
                            <option>2013</option>
                            <option>2012</option>
                            <option>2011</option>
                            <option>2010</option>
                          </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="myform.identifier">
                        <Form.Label> {t('form.identifier')}</Form.Label>
                        <Form.Control type="text" name="identifier" placeholder="ARR.XXXXXX" />
                      </Form.Group>

                      <Form.Group controlId="myform.userkey">
                        <Form.Label> {t('form.user_key')}</Form.Label>
                        <Form.Control type="text" name="userkey" placeholder="XXXXX" />
                      </Form.Group>

                      <pre>
                        ECLI:{this.state.country}:{this.state.court}:{this.state.year}:{this.state.identifier}
                      </pre>

                      <Button variant="primary" type="submit">
                      {this.state.waiting && <img className="loadgif" src={LoadGif} alt="loading" />}
                      {t('form_btn.send')}
                      </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withTranslation()(SendUi)
