import classes from "./Control.module.scss";
import {FC, useState} from "react";
import {Modal} from "./Modal";
import {BoardTypes, ITask} from "./Board";

interface Props {
	onDelete: (deleteId: string) => void;
	onCreate: (task: ITask, boardType: BoardTypes) => void;
}

export const Control: FC<Props> = ({onCreate, onDelete}) => {
	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)

	function onOpenCreateModalHandler() {
		setCreateModalOpen(true)
	}

	function onOpenDeleteModalHandler() {
		setDeleteModalOpen(true)
	}


	return (
		<div className={classes.control}>
			<button onClick={onOpenCreateModalHandler}>Добавить</button>
			<button onClick={onOpenDeleteModalHandler}>Удалить</button>
			{deleteModalOpen && (<Modal onClose={() => setDeleteModalOpen(false)} title="Добавить" onDelete={onDelete} type="delete" />)}
			{createModalOpen && (<Modal onClose={() => setCreateModalOpen(false)} title="Удалить" onCreate={onCreate} type="create" />)}
		</div>
	)
}