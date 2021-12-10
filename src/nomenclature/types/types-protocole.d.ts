import { AnyObject, Optional } from "../../types/global-types";

export interface IProduit {
	id: number,
	description: string,
	designation?: string,
	listeDosages: (string | number)[],
	uniteDosage?: string = 'mg'
}

export interface IMedicament {
	id: number,
	description: string,
	dureeMax?:string | number,
	dureeMin?:string | number,
	formes: string[],
	frequenceMax?:string | number,
	frequenceMin?:string | number,
	frequencePrecision?:string,	
	quantiteMax?:number,
	quantiteMin?:number,
	produits: IProduit[]
}

export interface IPrescription extends AnyObject {	
	idDouleur: number,
	numOrdonnance: number,
	description?:string,
	idOrdoType?:number,
	medicamentsPreconises?:IMedicament[]
}

export interface IProtocoleDouleur extends AnyObject {	
	idDouleur?:number,
	libelle?:string,
	idParent?:number,
	infosGenerales?:string,
	prescriptions?: IPrescription[],
	recommandations?:string
}