import { AnyObject, Optional } from "../../types/global-types";
import { IProtocoleDouleur } from "./types-protocole";


export interface GestionNomenclatureProps extends AnyObject {	
	nomenclatures?: INomenclature | INomenclature[],
	protocoleDouleur?: IProtocoleDouleur
}

export interface INomenclature {
	id: number,	
	libelle: string,
	type?: 'protocole' | 'niveau',
	infosGenerales?: string,
	recommandations?: string,
	nomenclaturesEnfants?: INomenclature[]
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
	nomenclatures?: INomenclature | INomenclature[]
}

export interface NomenclatureProps extends ActionsNomenclatures, AnyObject { 
	nomenclature?: INomenclature, 
	onClick?: (event?: React.Event) => void, 
	isActive: boolean
}

export interface AccordionProps { 
	title: string, 
	content: Optional<JSX.Element | string>, 
	isActive: boolean, 
	onClick?: (event?: React.Event) => void
}






