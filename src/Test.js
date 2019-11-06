import React from 'react'

function Test(props) {

    const {className, children, width, height, ...rest} = props

    const style = 
        <style> {`
            .truncated {
                max-height: ${height ? height + ';':'2rem;'}
                max-width: ${width ? width + ';':'100%;'}
                overflow: hidden;
                text-overflow: ellipsis;
            } 
            .expand, .trunc {
                width: fit-content;
                margin-left: auto;
                margin-right: auto;
            }
            .expand::after {
                content: '\\FE40'; 
                font-size: 1.5rem;
            }         
            .trunc::after {
                content: '\\FE3F';
                font-size: 1.5rem;
            }
        `}
        </style>

    let truncated = true

    const onClick = e => {
        if (truncated) {
             e.target.className = 'trunc'
            e.target.previousSibling.className = props.className
            truncated = false
        } else {
            e.target.className = 'expand'
            e.target.previousSibling.className = `${props.className} truncated`
            truncated = true
        }
    }

    const render = function () {       

        return (
            <React.Fragment>
                {style}
                <div className={`${className} truncated`} {...rest}>
                    <div>{children}</div>                    
                </div>
                <div onClick={onClick} className='expand'></div>
            </React.Fragment>
        )
    }

    return render()
}

export default Test