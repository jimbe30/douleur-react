

export const definePromise = (nom, age) => {
  return new Promise(
    (resolve, reject) => {
      if (nom && 'BRUN' === nom.trim().toUpperCase()) {
        if (age !== 50) {
          reject("C'est pas le bon âge pour monsieur Brun")
        }
      }
      resolve({ nom, age })
    }
  )
}

export const usePromise = (nom, age) => {
  definePromise(nom, age)
    .then(result => console.log(JSON.stringify(result)))
    .catch(reason => console.log(reason))

}