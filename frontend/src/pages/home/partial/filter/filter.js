import React from "react";
import Form from "react-bootstrap/Form";
import { useSharedState } from "../../../../shared/state-context";
import { insertItemArray } from "../../../../shared/utility-function";

const PostsFilter = () => {
  const { topics } = useSharedState();
  let t = [...topics];
  t = insertItemArray(t, 0, "ALL");

  const sortMethodChanged = () => {};
  const filteredDataChanged = () => {};
  return (
    <div key={"filter_00"}>
      <Form key={"form_00"}>
        <Form.Label>Topics</Form.Label>
        <Form.Select>
          {t.map((t_el, index) => {
            return (
              <option key={index} value={t_el}>
                {t_el}
              </option>
            );
          })}
        </Form.Select>
        <Form.Label htmlFor="dateFrom">From</Form.Label>
        <Form.Control
          type="date"
          id="dateFrom"
          onChange={filteredDataChanged}
        />
        <Form.Label htmlFor="dateTo">To</Form.Label>
        <Form.Control type="date" id="dateTo" onChange={filteredDataChanged} />
        <Form.Label>Sort</Form.Label>
        <Form.Select onChange={sortMethodChanged}>
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
