
import { Descriptions, message } from "antd";

import { basicInfoStruct, getDescirptionStruct } from "./struct";

export const BasicInfo = ({ testdetails, mainlink, id }) => {
    const [messageApi, contextHolder] = message.useMessage();

    return (<>
        {contextHolder}
        <Descriptions
            {...basicInfoStruct}
            items={[...getDescirptionStruct(testdetails, mainlink, messageApi, id)]}
        />
    </>
    )
}