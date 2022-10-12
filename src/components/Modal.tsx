import classes from './Modal.module.scss'
import {FC, useState} from "react";
import {BoardTypes, ITask} from "./Board";


interface Props {
	title: string;
	onClose: () => void;
	onDelete?: (deleteId: string) => void;
	onCreate?: (task: ITask, boardTypes: BoardTypes) => void;
	type: 'delete' | 'create'
}

export const Modal: FC<Props> = ({ title, onClose, type, onDelete, onCreate}) => {
	const [deleteId, setDeleteId] = useState<string>('');
	const [task, setTask] = useState<ITask & {boardType: BoardTypes}>({
		title: '',
		number: '',
		time: '',
		boardType: BoardTypes.Todo
	})

	if (type === 'delete') {
		const deleteHandler = (deleteId: string) => {
			if (onDelete) {
				onDelete(deleteId);
			}
			onClose();
		};

		return (
			<>
				<div className={classes.backdrop} onClick={onClose}></div>
				<div className={classes.modal}>
					<header>
						<h2>{title}</h2>
					</header>
					<div>
						<p>Номер задачи: </p>
						<input type="text" value={deleteId} onChange={(e) => setDeleteId(e.target.value)}/>
					</div>
					<footer className={classes.footer}>
						<button onClick={() => deleteHandler(deleteId)} >Удалить</button>
					</footer>
				</div>
			</>

			)

	}

	const createHandler = () => {
		if (onCreate) {
			onCreate(task, task.boardType);
		}
		onClose();
	}


	return (
		<>
			<div className={classes.backdrop} onClick={onClose}></div>
			<div className={classes.modal}>
				<header>
					<h2>{title}</h2>
				</header>
				<div>
					<p>Номер задачи: </p>
					<input type="text" value={task.number} onChange={(e) => setTask(prevState => ({...prevState, number: e.target.value}))}/>
					<p>Cтатус: </p>
					<select value={task.boardType} onChange={(e) => setTask(prevState => ({...prevState, boardType: e.target.value as BoardTypes }))} >
						{Object.values(BoardTypes).map((item) => (
							 <option key={item} value={item}>{item}</option>
						))}
					</select>
					<p>Описание: </p>
					<input type="text" value={task.title} onChange={(e) => setTask(prevState => ({...prevState, title: e.target.value}))}/>
					<p>Трудозатратность: </p>
					<input type="text" value={task.time} onChange={(e) => setTask(prevState => ({...prevState, time: e.target.value}))}/>
				</div>
				<footer className={classes.footer}>
					<button onClick={() => createHandler()} >Сохранить</button>
				</footer>
			</div>
		</>
	)
}