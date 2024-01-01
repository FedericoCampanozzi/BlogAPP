import React from "react";
import Form from "react-bootstrap/Form";
import { useSharedState } from "../../../../shared/state-context";

const insert = (arr, index, ...newItems) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted items
  ...newItems,
  // part of the array after the specified index
  ...arr.slice(index),
];

const PostsFilter = () => {
  const { topics } = useSharedState();
  let t = [...topics];
  t = insert(t, 0, "ALL");

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
