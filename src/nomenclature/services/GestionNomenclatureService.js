import dispatchData, { store } from "../../globals/redux/store";
import { apiURLs, apiURLs as urls, getResultFromUrl, postObjectToUrl } from "../../globals/services/apiService";
import { nomenclatureNs, nomenclatureData } from "../../_conf/redux";


export const modesAction = {
	AJOUT: 'Ajout',
	MODIFICATION: 'Modification',
	SUPPRESSION: 'Suppression',
	SELECTION: 'Sélection',
	VISU: 'Visualisation'
}


function getState(dataType) {
	const state = store.getState()[nomenclatureNs][dataType]
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
	dispatchData(nomenclatureData.ARBORESCENCE, result.data);
}



export async function findProtocoleDouleur(id) {

	const result = await getResultFromUrl(apiURLs.protocoleDouleur(id))
	const protocole = result.data
	dispatchData(nomenclatureData.PROTOCOLE_DOULEUR, protocole);
	return protocole
}

export async function majProtocoleDouleur(protocole) {

	if (protocole) {
		let result = await postObjectToUrl(protocole, apiURLs.majProtocoleDouleur)
		if (result.data) {
			const obj = result.data
			if (obj.errors) {
				console.log(JSON.stringify(obj))
				protocole.error = JSON.stringify(obj)
			} else {
				const arborescence = getState(nomenclatureData.ARBORESCENCE)
				if (arborescence) {
					const { nomenclature: nomenclatureParent, position } = removeNomenclature(protocole.idDouleur, arborescence)
					protocole = result.data
					if (nomenclatureParent) {
						if (!Array.isArray(nomenclatureParent.nomenclaturesEnfants)) {
							nomenclatureParent.nomenclaturesEnfants = [protocole]
						} else {
							nomenclatureParent.nomenclaturesEnfants.splice(position, 0, { ...protocole, id: protocole.idDouleur })
						}
						dispatchData(nomenclatureData.ARBORESCENCE, [...arborescence])
					}
				}
			}
		} else {
			console.error('Le protocole n\'a pas pu être correctement enregistré')
		}
	}
	dispatchData(nomenclatureData.PROTOCOLE_DOULEUR, null)
}



export function addNiveauNomenclature(id, libelle) {

	if (!libelle) {
		return { error: 'Le libellé est obligatoire' }
	}

	const arborescence = getState(nomenclatureData.ARBORESCENCE)
	if (arborescence) {
		const nomenclature = findNomenclature(id, arborescence)
		if (nomenclature) {
			nomenclature.nomenclaturesEnfants = [...nomenclature.nomenclaturesEnfants, { id: null, type: 'niveau', libelle }]
			dispatchData(nomenclatureData.ARBORESCENCE, arborescence)
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
	let result = { nomenclature: null, position: null }
	if (Array.isArray(branche)) {
		result.nomenclature = branche.find(
			(nomenclature, index) => {
				if (nomenclature.id === id || nomenclature.idDouleur === id) {
					result.position = index
					return true
				}
				return false
			}
		)
		if (result.nomenclature && result.position !== undefined) {
			branche.splice(result.position, 1)
			result.nomenclature = nomenclatureParent
		} else {
			branche.forEach(nomenclature => {
				if (!result.nomenclature && nomenclature.nomenclaturesEnfants) {
					result = removeNomenclature(id, nomenclature.nomenclaturesEnfants, nomenclature)
				}
			})
		}
	}
	return result
}



