"use client";
import { Button, Checkbox, Col, Form, Row, Select } from "antd";
import styles from "./QuestionSection.module.css";
import FormItem from "antd/es/form/FormItem";
import CheckboxGroup from "antd/es/checkbox/Group";
import TextArea from "antd/es/input/TextArea";
import { IQuestion } from "../..";
const QuestionSection:React.FC<IQuestionSection> = ({questions}) => {
  const _handleSubmit = (values: any) => {
    console.log("Values: ", values);
  };

  return (
    <div className={styles.qsContainer}>
      <Form onFinish={_handleSubmit} className={styles.qsForm}>
        <div className={styles.qsItemContainer}>
          {questions.map((item) => (
            <FormItem
              key={item.id}
              name={item.id}
              label={item.question_title}
              labelCol={{ span: 24 }}
            >
              {item.type === "PARAGRAPH" && (
                <TextArea
                  placeholder="Answer here"
                  draggable={false}
                  rows={3}
                />
              )}
              {item.type === "DROPDOWN" && (
                <Select
                  placeholder="select from the option"
                  options={item.options.map((itemX) => ({
                    label: itemX.option_title,
                    value: itemX.id,
                  }))}
                />
              )}
              {item.type === "CHECKBOX" && (
                <CheckboxGroup className={styles.checkboxGroup}>
                  <Row>
                    {item.options
                      .map((itemX) => ({
                        label: itemX.option_title,
                        value: itemX.id || "",
                      }))
                      .map((itemX, index) => (
                        <Col span={8} key={item.id+'-'+index}>
                          <Checkbox value={itemX.value}>{itemX.label}</Checkbox>
                        </Col>
                      ))}
                  </Row>
                </CheckboxGroup>
              )}
            </FormItem>
          ))}
        </div>
        <Form.Item className={styles.qsFooter}>
          <Button className={styles.saveBtn} type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

interface IQuestionSection {
  questions: IQuestion[]
}

export default QuestionSection;
