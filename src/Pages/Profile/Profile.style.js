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
overflow:hidden;

.badge{
    font-size:0.8rem;
    cursor:pointer;
    color:black;
   position:absolute;
   top:0;
   right:0.8rem;
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
            position:relative;
            padding:0px 10px;
            margin-right:3rem;
            .first-name{
                position:relative;
                width:fit-content;
            }
            .last-name{
                font-size:1.8rem;
                width:fit-content;
                position:relative;
            }
        }
        
        .name-badge{
           right:0;
           top:100%; 
           transform:translateX(100%) translateY(-100%) scale(0.8);
        }
     }
     .pic-container{
            position:relative;
            width:100px;
            height:100px;
            border-radius:50%;
            .pic-holder{
                border-radius:50%;
                border:2px solid white;
                padding:0.8rem;
                font-size:4rem;
                width:100%;
                height:100%;
                position:relative;
            }
            .pic{
                border-radius:50%;
                border:2px solid white;
                width:100%;
                height:100%;
                object-fit:cover;
            }
     }


}

.edit-input{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    padding:0.3rem;
    display:inline;
    overflow:aut;
    width:70%;
    background-color:transparent;
    border:1px solid white;
    font-size:1.2rem;
    font-weight:400;

}
.first-name-input{
    font-size:2rem;
}
.last-name-input{
    font-size:1.8rem;
}
.table-container{
    width:100%;
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

     .mobile{
         position:relative;
         .badge-mobile{
             right:-2rem;
             top:10px;
             font-size:0.8rem;
         }
     }
 }

 .btn-container{
     position:absolute;
     bottom:0;
     left:0;
     display:flex;
     margin:1rem;
 }

 .btn{
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

 .btn:hover{
     border:1px solid yellow;
 }


 
  }
`;

export { ProfileStyle };
