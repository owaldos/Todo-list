import React from "react";
import PropTypes from "prop-types";
const Task = props => {
	return (
		<div className="container">
			<div className="row justify-content-between"></div>
			<li className="col-6">{props.inputTask}</li>
		</div>
	);
};

export default Task;

Task.propTypes = {
	inputTask: PropTypes.string
};
