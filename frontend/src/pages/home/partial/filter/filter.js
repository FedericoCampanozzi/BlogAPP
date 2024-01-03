import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useSharedState } from "../../../../shared/state-context";
import { insertItemArray } from "../../../../shared/utility-function";
import {
  handleTextChangeEvent,
  getFormattedDate,
} from "../../../../shared/utility-function";
import { getAllPostAPI } from "../../../../shared/api";
import { useEffect } from "react";

const PostsFilter = () => {
  const { topics, setPosts } = useSharedState();
  let _topics = [...topics];
  _topics = insertItemArray(_topics, 0, "ALL");

  const [selTopic, setSelTopic] = useState("ALL");
  const [dateFrom, setDateFrom] = useState(getFormattedDate((new Date().getDate() - 3650)));
  const [dateTo, setDateTo] = useState(getFormattedDate(new Date()));
  const [sortPresetIndex, setSortPresetIndex] = useState("1");

  useEffect(() => {
    getAllPostAPI(selTopic, dateFrom, dateTo, setPosts, sortPresetIndex);
  }, [selTopic, dateFrom, dateTo, setPosts, sortPresetIndex]);
  return (
    <div>
      <Form>
        <Form.Label>Topics</Form.Label>
        <Form.Select
          onChange={(event) => handleTextChangeEvent(event, setSelTopic)}
        >
          {_topics.map((topic, index) => {
            return (
              <option key={index} value={topic}>
                {topic}
              </option>
            );
          })}
        </Form.Select>
        <Form.Label htmlFor="dateFrom">From</Form.Label>
        <Form.Control
          type="date"
          id="dateFrom"
          value={getFormattedDate(dateFrom)}
          onChange={(event) => handleTextChangeEvent(event, setDateFrom)}
        />
        <Form.Label htmlFor="dateTo">To</Form.Label>
        <Form.Control
          type="date"
          id="dateTo"
          value={getFormattedDate(dateTo)}
          onChange={(event) => handleTextChangeEvent(event, setDateTo)}
        />
        <Form.Label>Sort</Form.Label>
        <Form.Select
          onChange={(event) => handleTextChangeEvent(event, setSortPresetIndex)}
        >
          <option value="1">Most Liked</option>
          <option value="2">Category</option>
          <option value="3">Newer</option>
          <option value="4">Oldest</option>
        </Form.Select>
      </Form>
    </div>
  );
};

export default PostsFilter;
