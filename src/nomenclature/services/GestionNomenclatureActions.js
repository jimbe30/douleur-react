import dispatchData, { store } from "../../globals/redux/store";
import { apiURLs, apiURLs as urls, getResultFromUrl, postObjectToUrl } from "../../globals/services/apiService";


export const namespace = 'nomenclature'
export const dataTypes = {
	ARBORESCENCE: 'arborescence',
	PROTOCOLE_DOULEUR: 'protocoleDouleur',
	NOMENCLATURE_DOULEUR: 'nomenclatureDouleur'
}

export const modesAction = {
	AJOUT: 'Ajout',
	MODIFICATION: 'Modification',
	SUPPRESSION: 'Suppression',
	SELECTION: 'Sélection',
	VISU: 'Visualisation'
}


function getState(dataType) {
	const state = store.getState()[namespace][dataType]
	if (!state) {
		return undefined
	} else if (state instanceof Array) {
		return [...state]
	} else if (state instanceof Object) {
		return { ...state }
	}
}


export async function setArborescence() {
	const result = await getResultFromUrl(urls.arborescenceDouleurs)
	dispatchData(dataTypes.ARBORESCENCE, result.data);
}



export async function findProtocoleDouleur(id) {

	const result = await getResultFromUrl(apiURLs.protocoleDouleur(id))
	const protocole = result.data
	dispatchData(dataTypes.PROTOCOLE_DOULEUR, protocole);
	return protocole
}

export async function majProtocoleDouleur(protocole) {

	let result = await postObjectToUrl(protocole, apiURLs.majProtocoleDouleur)
	if (result.data) {
		const obj = result.data
		if (obj.errors) {
			console.log(JSON.stringify(obj))
			protocole.error = JSON.stringify(obj)
		} else {
			const arborescence = getState(dataTypes.ARBORESCENCE)
			if (arborescence) {
				const nomenclatureParent = removeNomenclature(protocole.idDouleur, arborescence)
				protocole = result.data	
				if (nomenclatureParent) {
					nomenclatureParent.nomenclaturesEnfants = [
						...nomenclatureParent.nomenclaturesEnfants, 
						{...protocole, id : protocole.idDouleur} 
					]
					dispatchData(dataTypes.ARBORESCENCE, [...arborescence])
					dispatchData(dataTypes.PROTOCOLE_DOULEUR, null)
				}	
			}
		} 
	} else {
		console.error('Le protocole n\'a pas pu être correctement enregistré')
	}
}



export function addNiveauNomenclature(id, libelle) {

	if (!libelle) {
		return {error: 'Le libellé est obligatoire'}
	}

	const arborescence = getState(dataTypes.ARBORESCENCE)
	if (arborescence) {
		const nomenclature = findNomenclature(id, arborescence)
		if (nomenclature) {
			nomenclature.nomenclaturesEnfants = [...nomenclature.nomenclaturesEnfants, { id: null, type: 'niveau', libelle }]
			dispatchData(dataTypes.ARBORESCENCE, arborescence)
		}
	}
}

function findNomenclature(id, branche, idParent) {
	let niveau
	if (Array.isArray(branche)) {
		niveau = branche.find(nomenclature => nomenclature.id === id || nomenclature.idDouleur === id)
		if (niveau) {
			niveau.idParent = idParent
		} else {
			branche.forEach(nomenclature => {
				if (!niveau && nomenclature.nomenclaturesEnfants) {
					niveau = findNomenclature(id, nomenclature.nomenclaturesEnfants, nomenclature.id)
				}
			})
		}
	}
	return niveau
}

function removeNomenclature(id, branche, nomenclatureParent) {
	let niveau
	if (Array.isArray(branche)) {
		let pos
		niveau = branche.find(
			(nomenclature, index) => {
				if (nomenclature.id === id || nomenclature.idDouleur === id) {
					pos = index
					return true
				}
				return false
			}
		)
		if (niveau && pos !== undefined) {
			branche.splice(pos, 1)
			niveau = nomenclatureParent
		} else {
			branche.forEach(nomenclature => {
				if (!niveau && nomenclature.nomenclaturesEnfants) {
					niveau = removeNomenclature(id, nomenclature.nomenclaturesEnfants, nomenclature)
				}
			})
		}
	}
	return niveau
}



