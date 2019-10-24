import React from 'react'

const f = (x, y) => func => {
    console.log(func(x, y))
    return func(x, y)
}
const mult = (x, y) => x*y
const add = (x, y) => x+y

function Test(x, y) {

    this.render = function () {

        const onClick = e => console.log(`clic sur ${e.target.className}`)

        const style = { top: '50px', position: 'relative', marginLeft: 'auto', marginRight: 'auto', width: '400px', maxWidth: '100%' }
        return (
            <div className='noborder' onClick={onClick} style={style}>
                C'est le contenu de la balise div à l'intérieur du composant Test  <br/>
                Résultat  mult : {f(x, y)(mult)} <br/>
                Résultat  add : {f(x, y)(add)} <br/>
            </div>
        )
    }
}

export default new Test(5, 7).render