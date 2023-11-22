import { BasicInfo } from "./components/BasicInfo"

export const getTabStruct = (trainer, testdetails, mainlink, id) => [
    {
        label: "Details",
        key: "1",
        children:
            <BasicInfo
                testdetails={testdetails}
                mainlink={mainlink}
                id={id}
            />
    }
]