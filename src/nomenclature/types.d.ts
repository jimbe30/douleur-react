import { AnyObject, Optional } from "../types/global-types";

export interface INomenclature {
	id: number,	
	libelle: string,
	type?: 'protocole' | 'niveau',
	infosGenerales?: string,
	recommandations?: string,
	nomenclaturesEnfants?: Optional<INomenclature>[]
}

export interface IElementAction { 
	libelle: string,
	process: (id?: string | number) => any,
	primary?: boolean,
	explanation?: string
}

interface ActionsNomenclatures {
	actionsBranches?: IElementAction[], 
	actionsDouleurs?: IElementAction[]
}

export interface BoutonsActionsProps {
	actions?: IElementAction[],
	id?: string | number 
}

export interface ArborescenceProps extends ActionsNomenclatures, AnyObject { 
	nomenclatures: Optional<INomenclature>[]
}

export interface RenderProps extends AnyObject<> {
	component: Optional<INomenclature>, 
	index: number, 
	isActive: boolean, 
	handleClick: (index: number) => void
}

export interface NomenclatureProps extends ActionsNomenclatures, AnyObject { 
	nomenclature: Optional<INomenclature>, 
	onClick?: (event?: React.Event) => void, 
	isActive: boolean
}

export interface AccordionProps { 
	title: string, 
	content: Optional<JSX.Element | string>, 
	isActive: boolean, 
	onClick?: (event?: React.Event) => void
}






