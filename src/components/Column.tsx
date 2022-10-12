import classes from './Column.module.scss'
import {FC, DragEvent} from "react";
import {Task} from "./Task";
import {IBoard, ITask} from "./Board";

interface Props {
	board: IBoard;
	onChangeCurrentBoard: (board: IBoard) => void;
	onChangeCurrentTask: (task: ITask) => void;
	dropHandler: (e: DragEvent<HTMLElement>, board: IBoard, task?: ITask) => void;
}

export const Column: FC<Props> = ({board, onChangeCurrentBoard, onChangeCurrentTask, dropHandler}) => {
	const {tasks, title} = board;

	function dragOverHandler(e: DragEvent<HTMLElement>) {
		e.preventDefault()
	}

	function dragStartHandler(e: DragEvent<HTMLDivElement>, card: ITask) {
		onChangeCurrentTask(card);
		onChangeCurrentBoard(board);
	}

	return (
		<section
			className={classes.column}
			onDragOver={(e) => dragOverHandler(e)}
			onDrop={(e) => dropHandler(e, board)}
		>
			<h3 className={classes.title}>{title}</h3>
			<div className={classes.content}>
				{tasks.map((task) => <Task key={task.title} card={task} dragStartHandler={dragStartHandler} onDropHandler={dropHandler} board={board} />)}
			</div>
		</section>
	)
}