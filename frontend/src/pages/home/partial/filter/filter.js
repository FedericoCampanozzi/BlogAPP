import React from "react";
import Form from "react-bootstrap/Form";
import { useSharedState } from "../../../../shared/state-context";

const PostsFilter = () => {
    const { posts, setPosts, topics } = useSharedState();
    const t = [...topics];
    return (
        <div key={"filter_00"}>
            <Form.Label>Topics</Form.Label>
            <Form.Select>
                {
                    t.map((t_el, index)=>{
                        return (
                            <option value={t_el}>{t_el}</option>
                        )
                    })
                }
            </Form.Select>
            <Form.Label htmlFor="dateFrom">From</Form.Label>
            <Form.Control
                type="date"
                id="dateFrom"
            />
            <Form.Label htmlFor="dateTo">To</Form.Label>
            <Form.Control
                type="date"
                id="dateTo"
            />
            <Form.Label>Sort</Form.Label>
            <Form.Select>
                <option value="1">Most Liked</option>
                <option value="1">Category</option>
                <option value="2">Newer</option>
                <option value="3">Oldest</option>
            </Form.Select>
        </div>
    );
};

export default PostsFilter;
