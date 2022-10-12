import {FC, DragEvent} from "react";

import classes from './Task.module.scss'
import {IBoard, ITask} from "./Board";

interface Props {
	card: ITask
	board: IBoard;
	dragStartHandler: (e: DragEvent<HTMLDivElement>, card: ITask) => void;
	onDropHandler: (e: DragEvent<HTMLElement>, board: IBoard, task?: ITask) => void;

}

export const Task: FC<Props> = ({card, dragStartHandler, onDropHandler, board}) => {
	const { time, title, number } = card;

	function dragOverHandler(e: DragEvent<HTMLElement>) {
		e.preventDefault()
		if (e.currentTarget.className === classes.task && e.currentTarget.style.boxShadow !== '0 4px 3px gray') {
			e.currentTarget.style.boxShadow = '0 4px 3px gray'
		}
	}
	function dragEndHandler(e: DragEvent<HTMLElement>) {
		e.preventDefault()
		e.currentTarget.style.boxShadow = 'none'
	}

	return (
		<div
			onDragOver={dragOverHandler}
			onDragStart={(e) => dragStartHandler(e, card)}
			onDragLeave={dragEndHandler}
			onDragEnd={dragEndHandler}
			onDrop={(e) => onDropHandler(e, board, card)}
			draggable
			className={classes.task}
		>
			<p>Задача: {number}</p>
			<p>{title}</p>
			<p>{time}</p>
		</div>
	)
}