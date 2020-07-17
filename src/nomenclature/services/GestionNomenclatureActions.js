import dispatchData, { store } from "../../globals/redux/store";
import { apiURLs as urls, getResultFromUrl } from "../../globals/services/apiService";


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

export function majProtocoleDouleur(protocole) {

	console.log('Mise à jour du protocole anti douleur')
}



export function addNiveauNomenclature(id, libelle) {

	if (!libelle) {
		return {error: 'Le libellé est obligatoire'}
	}

	const arborescence = getState(dataTypes.ARBORESCENCE)
	if (arborescence) {
		const nomenclature = findNiveauNomenclature(id, arborescence)
		if (nomenclature) {
			nomenclature.nomenclaturesEnfants = [...nomenclature.nomenclaturesEnfants, { id: null, type: 'niveau', libelle }]
			dispatchData(dataTypes.ARBORESCENCE, arborescence)
		}
	}
}


function findNiveauNomenclature(id, branche) {
	let niveau
	if (Array.isArray(branche)) {
		niveau = branche.find(nomenclature => nomenclature.id === id)
		if (!niveau) {
			branche.forEach(nomenclature => {
				if (!niveau && nomenclature.nomenclaturesEnfants) {
					niveau = findNiveauNomenclature(id, nomenclature.nomenclaturesEnfants)
				}
			})
		}
	}
	return niveau
}



