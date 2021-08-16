import styled from "styled-components";

const ProfileStyle = styled.div`
display: flex;
//   max-width: 800px;
margin: auto;
flex-direction:column;
align-items:center;
width:100%;
min-height:100vh;
background-color:#505750;

.badge{
    cursor:pointer;
    color:black;
   position:absolute;
   top:0;
   right:1.8rem;
   border-radius:50%;
   width:1.4rem;
   height:1.4rem;
   display:flex;
   justify-content:center;
   align-items:center;
   padding:2px;
   background-color:yellow;
}

.header{
    width:100%;
    
    padding:3vw 0.6vw;
     display:flex;
     align-items:center;
     background-color:var(--primary);
     color:white;
     justify-content:flex-start;
     .name-container{
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        justify-content:center;
        font-size:1rem;
        .name{
            font-size:2rem;
        }
     }
     .pic-container{
            position:relative;
            .pic{
                border:2px solid white;
                padding:0.8rem;
            border-radius:50%;
            font-size:3rem;
            margin:0 2rem;
            position:relative;
            }
     }


}

 table{
     align-self:flex-start;
     margin:2rem;
     color:white;
     font-size:1.2rem;

     .key{
         color: var(--primary);
         font-weight:400;
     }


     .value::before{
         margin:0 10px;
         color:var(--primary);
         content:" - ";
         padding-right:1rem;
     }
 }


 .dashboard-btn{
    align-self:flex-start;
    background-color:var(--primary);
    padding:0.2rem 1rem;
    color:white;
    border-radius:2px;
    margin:1rem;
    font-weight:500;
    cursor:pointer;
    font-size:1rem;
    border:1px solid transparent;
 }

 .dashboard-btn:hover{
     border:1px solid yellow;
 }


 
  }
`;

export { ProfileStyle };
