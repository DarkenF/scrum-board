import {Column} from "./Column"

import classes from './Board.module.scss'
import {DragEvent, useState} from "react";
import {Control} from "./Control";


export interface ITask {
	number: string;
	title: string;
	time: string;
}

export interface IBoard {
	id: number;
	title: BoardTypes;
	tasks: ITask[]
}

export enum BoardTypes {
	Todo = 'Нужно сделать',
	Pending = 'Ожидание',
	InWork = 'В работе',
	Completed = 'Выполнено'
}

const DEFAULT_STATE: IBoard[] = [
	{
		id: 0,
		title: BoardTypes.Todo,
		tasks: [
			{
				number: '4015',
				title: 'Типизация данных 5',
				time: '2d'
			},
			{
				number: '4019',
				title: 'Типизация данных 4',
				time: '2d'
			}
		]
	},
	{
		id: 1,
		title: BoardTypes.Pending,
		tasks: [
			{
				number: '4018',
				title: 'Типизация данных 1',
				time: '2d'
			},
			{
				number: '4017',
				title: 'Типизация данных 2',
				time: '2d'
			}
		]
	},
	{
		id: 2,
		title: BoardTypes.InWork,
		tasks: [
			{
				number: '4016',
				title: 'Типизация данных 3',
				time: '2d'
			},
		]
	},
	{
		id: 3,
		title: BoardTypes.Completed,
		tasks: []
	}
]

export const Board = () => {
	const [boards, setBoards] = useState<IBoard[]>(DEFAULT_STATE)
	const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);
	const [currentTask, setCurrentTask] = useState<ITask | null>(null);

	const onChangeCurrentBoard = (board: IBoard) => {
		setCurrentBoard(board)
	}

	const onChangeCurrentTask = (task: ITask) => {
		setCurrentTask(task)
	}

	function dropHandler(e: DragEvent<HTMLElement>, dropBoard: IBoard, dropTask?: ITask) {
		e.preventDefault()
		e.stopPropagation();
		if (currentTask && currentBoard) {
			const currentTaskIndex = currentBoard.tasks.indexOf(currentTask)
			const newStartBoardTasks = currentBoard.tasks
			newStartBoardTasks.splice(currentTaskIndex, 1);

			let newDropBoardTasks: ITask[] = [...dropBoard.tasks];

			if (dropTask) {
				const dropTaskIndex = newDropBoardTasks.indexOf(dropTask);
				newDropBoardTasks.splice(dropTaskIndex + 1, 0, currentTask)
			} else {
				newDropBoardTasks.push(currentTask)
			}

			const newBoard = boards.map(board => {
				if (board.id === dropBoard.id) {
					return {
						...board,
						tasks: newDropBoardTasks
					}
				}
				if (board.id === currentBoard.id) {
					return {
						...board,
						tasks: newStartBoardTasks
					}
				}
				return board
			})

			setBoards(newBoard);
		}
	}

	function onCreateHandler(task: ITask, boardType: BoardTypes) {
		const nextBoards = boards.map((board) => {
			if (board.title === boardType) {
				return {
					...board,
					tasks: [
						...board.tasks,
						task
					]
				}
			}
			return board
		})

		setBoards(nextBoards);
	}

	function onDeleteHandler(taskId: string) {
		const nextBoards = boards.map(board => {
			const deleteTaskIndex = board.tasks.findIndex((task) => task.number === taskId)
			if (deleteTaskIndex !== -1) {
				board.tasks.splice(deleteTaskIndex, 1)
			}
			return board;
		})

		setBoards(nextBoards);
	}

	return (
		<div className={classes.container}>
			<Control onDelete={onDeleteHandler} onCreate={onCreateHandler}/>
			<div className={classes.board}>
				{boards.map((board) => {
					return <Column
						key={`${board.id}-${board.title}`}
						board={board}
						dropHandler={dropHandler}
						onChangeCurrentBoard={onChangeCurrentBoard}
						onChangeCurrentTask={onChangeCurrentTask}
					/>
				})}
			</div>
		</div>

	)
}