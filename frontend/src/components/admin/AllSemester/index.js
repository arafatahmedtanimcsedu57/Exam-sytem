import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EditOutlined } from "@ant-design/icons";
import { Table, Button, Typography, Modal, Flex, Card, Tag } from "antd";

import SemesterForm from "./components/SemesterForm";

import {
  getSemesters,
  setSemesterModifyAction,
} from "../../../actions/semester.action";

import {
  headerStruct,
  headingStruct,
  addButtonStruct,
  tableStruct,
  staticColumns,
  editButtonStruct,
} from "./struct";

const { Title } = Typography;

const AllSemester = () => {
  const dispatch = useDispatch();

  const semester = useSelector((state) => state.semester);
  const { semestersLoading, semesters, semesterModalState } = semester;

  const openModal = (subjectId, mode) =>
    dispatch(setSemesterModifyAction(subjectId, true, mode));

  const closeModal = () =>
    dispatch(setSemesterModifyAction(null, false, "COMPLETE"));

  console.log(semesters, semestersLoading, "Semesters");

  const columns = [
    ...staticColumns,
    {
      title: "",
      key: "_id",
      dataIndex: "_id",
      render: (key) => (
        <Button
          {...editButtonStruct}
          icon={<EditOutlined />}
          onClick={() => openModal(key, "UPDATE")}
        />
      ),
    },
  ];

  useEffect(() => dispatch(getSemesters()), []);

  return (
    <>
      <Card>
        <Flex {...headerStruct}>
          <Flex {...headingStruct.heading}>
            <Title {...headingStruct.title}>Semesters</Title>
            <div>
              {semesters && semesters.length && (
                <Tag {...headingStruct.tag}>{semesters.length}</Tag>
              )}
            </div>
          </Flex>
          <Button
            {...addButtonStruct}
            onClick={() => openModal(null, "CREATE")}
          >
            Add New
          </Button>
        </Flex>
        <Table
          {...tableStruct}
          columns={columns}
          dataSource={semesters}
          loading={semestersLoading}
        />
      </Card>

      <Modal
        open={semesterModalState}
        title="Add New Semester"
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <SemesterForm />
      </Modal>
    </>
  );
};

export default AllSemester;
