import React from 'react'

function TruncBox(props) {

    const {className, children, width, height, moreText, lessText, ...rest} = props

    const style = 
        <style> {`
            .truncated {
                max-height: ${height ? height + ';':'2rem;'}
                max-width: ${width ? width + ';':'100%;'}
                width: ${width ? width + ';':'100%;'}
                overflow: hidden;
                text-overflow: ellipsis;
            } 
            .expand, .trunc {
                width: fit-content;
                margin-left: auto;
                margin-right: auto;
            }
            .expand::after, .trunc::after {
                cursor: pointer;
                color: blue;
            }
            .expand::after {
                content: '${moreText ? moreText : '\\FE40'}'; 
                font-size: ${!moreText ? '1.5rem' : '.5rem'};
            }         
            .trunc::after {
                content: '${lessText ? lessText : '\\FE3F'}';
                font-size: ${!lessText ? '1.5rem' : '.5rem'};
            }
        `}
        </style>

    let truncated = true

    const onClick = e => {
        if (truncated) {
            e.target.className = 'trunc'
            e.target.previousSibling.className = className ? className: ''
            truncated = false
        } else {
            e.target.className = 'expand'
            e.target.previousSibling.className = `${className ? className + ' ' : ''}truncated`
            truncated = true
        }
    }

    const render = function () {
        return (
            <React.Fragment>
                {style}
                <div className={`${className ? className + ' ' : ''}truncated`} {...rest}>
                    {children}                    
                </div>
                <div onClick={onClick} className='expand'></div>
            </React.Fragment>
        )
    }

    return render()
}

export default TruncBox