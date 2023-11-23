import { BasicInfo } from "./components/BasicInfo"
import { QuestionDetails } from "../../../../common/QuestionDetails"

export const getTabStruct = (trainer, testdetails, questions, mainlink, id) => [
    {
        label: "Details",
        key: "1",
        children:
            <BasicInfo
                testdetails={testdetails}
                mainlink={mainlink}
                id={id}
            />
    }, {
        label: "Questions",
        key: "2",
        children: <>
            {questions.map(question => <QuestionDetails id={question} />)}
        </>
    }
]