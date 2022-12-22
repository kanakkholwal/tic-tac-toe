import styled from "styled-components";


export const Turn = styled.div`
background: #FFE79E;
width:100%;
padding:1rem 1.25rem;
text-align:center;
margin-top:1rem;
`;

export const Board = styled.div`
display:grid;
grid-template-rows:  repeat(3, 1fr);
grid-template-columns: repeat(3, 1fr);
background: #FFE79E;
gap:7px;
`
export const Square = styled.button`
background: #FFFFFF;
display:flex;
align-items:center;
justify-content:center;
text-align:center;
padding:1rem;
height: 96px;
`;

export const Piece = styled.div`
background: #09101c0d;
border-radius:8px;
display:flex;
align-items:center;
justify-content:center;
text-align:center;
padding:1rem;
height: 96px;
width: 96px;
margin-inline:0.5rem auto;
`
export const Cross = () => {

    return (<svg width={64} height={64} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16.1985" height="72.8932" rx="8.09924" transform="matrix(0.706472 0.707741 -0.706472 0.707741 51.5152 0.0183716)" fill="#2C8DFF" />
        <rect width="16.1985" height="72.8932" rx="8.09924" transform="matrix(0.706472 -0.707741 0.706472 0.707741 0.131042 11.4824)" fill="#2C8DFF" />
    </svg>
    )
}

export const Circle = () => {

    return (<svg width={63} height={63} viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="31.5" cy="31.5" r="23.625" stroke="#FF4F4F" strokeWidth="15.75" />
    </svg>


    )
}

