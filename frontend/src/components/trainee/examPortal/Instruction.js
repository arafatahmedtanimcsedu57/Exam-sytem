import React from 'react'
import { connect } from 'react-redux';
import { Button, Card, Typography, Alert, Flex } from 'antd';

import { ProceedtoTest, fetchTestdata } from '../../../actions/traineeAction';

import { instractionSectionStruct, processButtonStruct } from "./struct"

const { Title } = Typography;

function Instruction(props) {
    return (
        <Flex {...instractionSectionStruct}>
            <Card>
                <Title level={2}>General Instructions:</Title>
                <ul>
                    <li> All questions are compulsory.</li>
                    <li> You can bookmark any question.</li>
                    <li> Answers can be updated anytime before the time limit.</li>
                    <li> This test is time bound,there's a timer on the right panel.</li>
                    <li> Click on 'End Test' button to submit test before time limit. </li>
                    <li> The test will be automatically submitted when the clock reads 0:0.</li>
                </ul>

                <Alert
                    showIcon
                    type="warning"
                    message="To save answers,click on the 'Save & Next' button."
                />

                <br />

                <Button {...processButtonStruct} onClick={() => { props.ProceedtoTest(props.trainee.testid, props.trainee.traineeid, () => { props.fetchTestdata(props.trainee.testid, props.trainee.traineeid) }) }} loading={props.trainee.proceedingToTest}>
                    Proceed To Test
                </Button>
            </Card>
        </Flex>
    )
}

const mapStateToProps = state => ({
    trainee: state.trainee
});




export default connect(mapStateToProps, {
    ProceedtoTest,
    fetchTestdata
})(Instruction);