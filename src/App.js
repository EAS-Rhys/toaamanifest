import React from 'react';
import './App.css';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { Component } from 'react';
import yaml from 'js-yaml';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

class UIView extends Component {
  constructor(props) {
    super(props);
    try {
      this.myObj = yaml.load(this.props.code)
    } catch (error) {
      console.log('yaml error')
      this.myObj = {}
    }
  }
  render() {
    return (
      <Accordion defaultActiveKey="0">

        {this.myObj.components.map((comp, index) => {
          return (
            <Accordion.Item eventKey={index}>
              <Accordion.Header>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    {comp.capability_name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                  </Dropdown.Menu>
                </Dropdown>
                <div className='transparent'>{'---'}</div>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    {comp.capability_version}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                  </Dropdown.Menu>
                </Dropdown>
              </Accordion.Header>
              <Accordion.Body>
                {comp.capability_params.map((directive,index) => {
                  return (
                    <div className='DirectiveContainer' id={index}>
                      <Badge bg="dark">{Object.keys(directive)[0]}</Badge> 
                      <Form>
                        <Form.Group as={Row} className="mb-3" >
                          <Form.Label column sm="2"> 
                            {Object.keys(directive[Object.keys(directive)[0]])}
                          </Form.Label>
                          <Col sm="10">
                            <Form.Control defaultValue={directive[Object.keys(directive)[0]][Object.keys(directive[Object.keys(directive)[0]])]} />
                          </Col>
                        </Form.Group>
                      </Form>
                    </div>
                  )
                })}
              </Accordion.Body>
            </Accordion.Item>
          )
        })}
      </Accordion>
    )
  }
}

function App() {
  const [code, setCode] = React.useState(`
  components:
  - capability_name: fileutils
    capability_version: 1.0.1
    capability_groups:
    - iis,sql
    capability_params:
    - fileutils_create:
        directory:
        - /home/kris/p0rn
    - fileutils_delete:
        file:
        - /home/kris/search
  - capability_name: iis
    capability_version: 1.8.7
    capability_groups:
    - iis
    capability_params:
    - iis_website:
        name: goat p0rn
    - iis_security:
        mode: local`
  );
  return (
    <div className="App">
      <div className='TopPanel'>

      </div>
      <div className='container'>
        <div className='LeftPanel'>
          <UIView code={code}></UIView>
        </div>
        <div className='RightPanel'>
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
