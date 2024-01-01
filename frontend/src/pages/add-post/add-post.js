import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSharedState } from "../../shared/state-context";
import { putPostAPI } from "../../shared/api";

const AddPost = () => {
  const navigate = useNavigate();
  const { userAuth, topics } = useSharedState();
  const t = [...topics];

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [topic, setTopic] = useState(t[0]);

  const handleTextChangeEvent = (event, setMethod) => {
    setMethod(event.target.value);
  };
  const uploadPostFunction = () => {
    putPostAPI(title, summary, text, userAuth, topic);
    navigate("/");
  };
  return (
    <Form className="p-5 form-border">
      <h1>Add new Post</h1>
      <Form.Group className="mb-3">
        <div className="py-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="txt_title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => handleTextChangeEvent(event, setTitle)}
          />
        </div>
        <div className="py-2">
          <Form.Label>Topics</Form.Label>
          <Form.Select onChange={(event) => handleTextChangeEvent(event, setTopic)}>
            {t.map((t_el, index) => {
              return <option key={index} value={t_el}>{t_el}</option>;
            })}
          </Form.Select>
        </div>
        <div className="py-2">
          <Form.Label>Summary</Form.Label>
          <Form.Control
            style={{resize:"none"}}
            as={"textarea"}
            id="txt_summary"
            type="text"
            rows={4}
            placeholder="A short text ..."
            value={summary}
            onChange={(event) => handleTextChangeEvent(event, setSummary)}
          />
        </div>
        <div className="py-2">
          <Form.Label>Text</Form.Label>
          <Form.Control
            style={{resize:"none"}}
            as={"textarea"}
            id="txt_text"
            type="text"
            rows={8}
            placeholder="A text article ..."
            value={text}
            onChange={(event) => handleTextChangeEvent(event, setText)}
          />
        </div>
        <Button variant="outline-dark" onClick={uploadPostFunction}>
          Post
        </Button>
      </Form.Group>
    </Form>
  );
};

export default AddPost;