import React, { useState, useEffect, useRef } from "react";
import Task from "./Task.jsx";
import "./styles.css";

//include images into your bundle

//create your first component
const Home = () => {
	const [listTask, setListTask] = useState([]);
	const input = useRef();
	const url = "https://assets.breatheco.de/apis/fake/todos/user/oswaldo";

	useEffect(() => {
		const _fetch = async direction => {
			let respuesta = await fetch(direction);
			let result = await respuesta.json();
			setListTask(result);
		};
		_fetch(url);
	}, []);

	const addTask = async e => {
		if (e.key == "Enter" && input.current.value != "") {
			const response = await fetch(url, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([
					...listTask,
					{ label: e.target.value, done: false }
				])
			});
			if (response.ok) {
				let respuesta = await fetch(url);
				let resultado = await respuesta.json();
				setListTask([...resultado]);
				input.current.value = "";
			}
		}
	};

	const deleteTask = async position => {
		let newListTask = listTask.filter((item, index) => index != position);
		const response = await fetch(url, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify([...newListTask])
		});
		if (response.ok) {
			let respuesta = await fetch(url);
			let resultado = await respuesta.json();
			setListTask([...resultado]);
		} else alert(response.statusText);
	};
	return (
		<div className="container-fluid bg-dark  vh-100 ">
			<div className="container pt-5 w-75 bg-light vh-100 ">
				<h1 className="text-center title">todos</h1>
				<div className="card w-75 mx-auto shadow-lg">
					<div className="">
						<ul className="list-group list-group-flush">
							<li className="list-group-item">
								<input
									className="input"
									type="text"
									ref={input}
									placeholder="What I need to be done?"
									onKeyPress={addTask}></input>
							</li>
							{listTask.map((item, index) => {
								return (
									<li
										className="list-group-item f"
										key={index}
										onClick={() => deleteTask(index)}>
										{item.label}
									</li>
								);
							})}
							<li className="list-group-item">
								<p className="text-muted">
									{listTask.length} items left
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
