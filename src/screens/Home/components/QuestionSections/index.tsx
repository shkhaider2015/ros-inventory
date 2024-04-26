"use client";
import { Button, Checkbox, Col, Form, Row, Select, message } from "antd";
import styles from "./QuestionSection.module.css";
import FormItem from "antd/es/form/FormItem";
import CheckboxGroup from "antd/es/checkbox/Group";
import TextArea from "antd/es/input/TextArea";
import { IQuestion } from "../..";
import axios from "axios";
import { END_POINTS } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";
const QuestionSection: React.FC<IQuestionSection> = ({ questions }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  // const [form] = useForm();

  const _handleSubmit = async (values: any) => {
    console.log("form Values: ", values);
    // return
    let data: ISubmitData[] = [];

    // Filter Data
    Object.keys(values).forEach((id) => {
      if (typeof values[id] === "undefined") return;
      if (Array.isArray(values[id])) {
        // if checkbox
        values[id]?.forEach((optionId: string) => {
          data.push({
            question_id: id,
            selected_option_id: optionId,
            text_answer: "",
            is_checked: true,
          });
        });
      } else {
        console.log(
          "Options : ",
          questions?.flatMap((itemX) => itemX.options)
        );
        if (
          questions
            ?.flatMap((itemX) => itemX.options)
            .some((item) => item.id === values[id])
        ) {
          // if value is uuid
          data.push({
            question_id: id,
            selected_option_id: values[id],
            text_answer: "",
          });
        } else {
          // if value is text
          data.push({
            question_id: id,
            selected_option_id: "",
            text_answer: values[id],
          });
        }
      }
    });

    data = data.map((item) => ({
      ...item,
      text_answer: item.text_answer?.trim(),
    }));

    // console.log("yy befiore ", data);

    data = data.map((item) => {
      let answer_id: string | undefined = undefined;
      let answers = questions.find(
        (itemX) => itemX.id === item.question_id
      )?.workspace_inventory_question_answers;
      if (!answers) return item;
      answers.forEach((ii: any) => {
        if (ii?.question_id === item.question_id && !item.is_checked)
          answer_id = ii?.id;

        if (
          item.is_checked &&
          ii?.question_id === item.question_id &&
          ii?.selected_option_id === item.selected_option_id
        )
          answer_id = ii?.id;
        // if(ii?.question_id === item.question_id && !ii?.selected_option_id) answer_id = ii?.id;
        // if(ii?.question_id === item.question_id && ii?.selected_option_id === item.selected_option_id) answer_id = ii?.id;
      });
      return { ...item, answer_id: answer_id };
    });

    // console.log("form Data 777 before: yy after ", data);
    // let toBeChecked = data.filter(item => item.isCheckbox);
    // let toBeUnchecked = data
    // questions
    //   .filter((item) => item.type === "CHECKBOX")
    //   .forEach((item) => {
    //     console.log("form item ", item);
    //     item.workspace_inventory_question_answers?.forEach((ii: any) => {
    //       console.log("form ii", ii);
    //       let title = item?.options.find(oi => oi.id == ii?.question_id)?.option_title;
    //       // let toBeChecked = data.filter(toBeChecked => toBeChecked.isCheckbox);
    //       // let toBeUnchecked = []
    //       // if (!data.filter(ij => ij.isCheckbox).some((ij) => ij.question_id == ii?.question_id)) {
    //       //   data.push({
    //       //     question_id: ii?.question_id,
    //       //     selected_option_id: undefined,
    //       //     answer_id: ii?.id,
    //       //     text_answer: "",
    //       //   });
    //       // }
    //     });
    //   });
    // data = data.filter((item) => !item.is_checked);
    // console.log("form Data 777 : ", data);
    // let filterData: any[] = data.map((item) => {
    //   if (item.answer_id) {
    //     if(item.text_answer)
    //     return {
    //       id: item.answer_id,
    //       question_id: item.question_id,
    //       selected_option_id: item.selected_option_id,
    //       text_answer: item.text_answer,
    //     };
    //   } else {
    //     return {
    //       question_id: item.question_id,
    //       selected_option_id: item.selected_option_id,
    //       text_answer: item.text_answer,
    //     };
    //   }
    // });

    let checksInForms: ISubmitData[] = data.filter((item) => item.is_checked);
    // let checkOptIds: (string | undefined)[] = data
    //   .filter((item) => item.is_checked)
    //   .map((item) => item.selected_option_id)
    //   .filter((item) => item);
    // let unCheckOptIds: string[] = [];
    // return

    // console.log("Checkids : ", checkOptIds, checksInForms);

    questions
      .filter((item) => item.type === "CHECKBOX")
      .forEach((item) => {
        item.workspace_inventory_question_answers?.forEach((ii: any) => {
          if (
            !checksInForms.some(
              (item) => item.selected_option_id == ii?.selected_option_id
            )
          ) {
            data.push({
              question_id: item.id,
              selected_option_id: ii?.selected_option_id,
              text_answer: "",
              answer_id: ii?.id,
              is_checked: false,
            });
          }
        });
      });

    let filterData: any[] = data.map((item) => {
      let obj: any = {
        question_id: item.question_id,
        text_answer: item.text_answer,
      };
      if (item?.selected_option_id)
        obj.selected_option_id = item.selected_option_id;
      if (item.answer_id) obj.id = item.answer_id;
      if (typeof item.is_checked == "boolean") obj.is_checked = item.is_checked;
      return obj;
    });

    // console.log("gg ", filterData);

    // console.log("Data : ", data);

    // return
    try {
      setLoading(true);
      await axios.post(END_POINTS.UPDATE_QUESTION, {
        question_responses: filterData,
      });
      // await axios.post(END_POINTS.UPDATE_QUESTION, {
      //   question_responses: filterData.filter(item => item?.id),
      // });
      message.success("Answer saved successfully");
      router.refresh();
    } catch (error) {
      console.log("Answer : ", error);
      message.error("Answer save failed");
    } finally {
      setLoading(false);
    }

    // console.log("form UU Data : ", filterData);
  };

  // console.log("Question : ", questions);

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
              initialValue={
                item.type === "PARAGRAPH"
                  ? item.answer
                  : item.type === "CHECKBOX"
                  ? item.workspace_inventory_question_answers?.map(
                      (ii) => ii?.is_checked ? ii?.selected_option_id : undefined
                    ).filter(item => item)
                  : item.workspace_inventory_question_answers?.map(
                      (ii) => ii?.selected_option_id
                    )?.[0]
              }
            >
              {item.type === "PARAGRAPH" && (
                <TextArea
                  placeholder="Answer here"
                  draggable={false}
                  rows={3}
                  // defaultValue={item.answer}
                />
              )}
              {item.type === "DROPDOWN" && (
                <Select
                  // defaultValue={item.options.filter((ii) => ii.checked)?.[0].id}
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
                        checked: itemX.is_checked,
                      }))
                      .map((itemX, index) => (
                        <Col span={24} key={item.id + "-" + index}>
                          <Checkbox
                            // defaultChecked={itemX.checked}
                            value={itemX.value}
                          >
                            {itemX.label}
                          </Checkbox>
                        </Col>
                      ))}
                  </Row>
                </CheckboxGroup>
              )}
            </FormItem>
          ))}
        </div>
        <Form.Item className={styles.qsFooter}>
          <Button
            loading={loading}
            className={styles.saveBtn}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

interface IQuestionSection {
  questions: IQuestion[];
}

interface ISubmitData {
  question_id: string;
  selected_option_id?: string;
  text_answer: string;
  answer_id?: string;
  is_checked?: boolean;
}

export default QuestionSection;
