const KEY_NOT_SELESAI_BACA = "NOT SELESAI BACA";
const TEMPORY_DATA = "TEMPORY_DATA";


const placeNotEnd = "incompleteBookshelfList";
const placeIsEnd = "completeBookshelfList";


const todos = [];

const clickSubmit = document.querySelector("form");

function mainTodo(){
    const getTitle = document.getElementById("inputBookTitle");
    const getAutohor = document.getElementById("inputBookAuthor");
    const getYears = document.getElementById("inputBookYear");
    const cekDibaca = document.getElementById("inputBookIsComplete");

    clickSubmit.addEventListener("submit", function(e){
        e.preventDefault()

        const infoUser = saveDataUserToStrg(inputUser(getTitle, getAutohor, getYears, cekDibaca.checked));
        
        todoShowData(infoUser);
    })
};





const unixId = () =>{
    return Date.now();
}

const supportBrowser = () =>{
    if(typeof(Storage) !== null){
        return true;
    };

    return false;
}


const inputUser = (judul, penulis, tahun, complete) =>{
    const dataUser = {
        id: unixId(),
        title: judul.value,
        author: penulis.value,
        year: tahun.value,
        isComplete: complete,
    };

    return dataUser;
}


const saveDataUserToStrg = (dataUser) =>{
    if(localStorage.getItem(KEY_NOT_SELESAI_BACA) === null){
        localStorage.setItem(KEY_NOT_SELESAI_BACA, JSON.stringify(todos));
    };

    const strgData = JSON.parse(localStorage.getItem(KEY_NOT_SELESAI_BACA));

    if(strgData.length === 0){
        strgData.push(dataUser);
        localStorage.setItem(KEY_NOT_SELESAI_BACA, JSON.stringify(strgData));
    
    }else{
        strgData.push(dataUser);
        localStorage.setItem(KEY_NOT_SELESAI_BACA, JSON.stringify(strgData));

        document.dispatchEvent(new Event("ondataloaded"))
    };

    return JSON.parse(localStorage.getItem(KEY_NOT_SELESAI_BACA));
};



const todoShowData = (dataUser) => {

        
    const dataTempLocal = JSON.parse(localStorage.getItem(TEMPORY_DATA));


    let stop = true;

    while(stop){
        if(dataUser === null ){
            return null;
        
        }else{

            if(dataTempLocal === null || dataTempLocal.length === 0){
                elementDataHtml(dataUser);
            
            }else{
                elementDataHtml(dataTempLocal)
            }
            
            
            stop = false;
        }
    }







};


const elementDataHtml = (dataUser) =>{
    dataUser.forEach(data =>{

        const parentArticle = document.createElement("article");
        parentArticle.classList.add("book_item");

        const titleH3 = data.isComplete ? 
        document.createElement("h2") : document.createElement("h3");
        titleH3.innerText = data.title;

        const pPenulis = document.createElement("p");
        pPenulis.innerText = data.author;

        const pYears = document.createElement("p");
        pYears.innerText = data.year;


        const secondDiv = document.createElement("div");
        secondDiv.classList.add("action");


        if(data.isComplete){
            secondDiv.append(
                btnEndRead(data),
                btnNotEndRead(data)
            );

            parentArticle.append(titleH3, pPenulis, pYears, secondDiv);
            document.getElementById(placeIsEnd).append(parentArticle)
        
        }else{
            secondDiv.append(
                btnEndRead(data),
                btnNotEndRead(data)
            );

            parentArticle.append(titleH3, pPenulis, pYears, secondDiv);
            document.getElementById(placeNotEnd).append(parentArticle)
        }
    });
}


const btnEndRead = (data) =>{
    const buttonSelesaiDibaca = document.createElement("button");
    buttonSelesaiDibaca.classList.add("green");

    if(!data.isComplete){
        buttonSelesaiDibaca.innerText = "Selesai Dibaca";
    
    }else{
        buttonSelesaiDibaca.innerText = "Belum Selesai Dibaca";
    }

    

    buttonSelesaiDibaca.addEventListener("click", function(){
        if(this.innerText === 'Belum Selesai Dibaca' === true){
            const dataLocal = JSON.parse(localStorage.getItem(KEY_NOT_SELESAI_BACA));


            data.isComplete = false;
            
            const searchIndex = dataLocal.findIndex(dLoc =>{
                return dLoc.id === data.id;
            });
    
    
            removeElementData(this.parentElement.parentElement);
            
            
            dataLocal[searchIndex] = data;
            localStorage.setItem(KEY_NOT_SELESAI_BACA, JSON.stringify(dataLocal));
            

            const localTemp =  JSON.parse(localStorage.getItem(TEMPORY_DATA));
            if(localTemp !== null){
                const tempIndex = localTemp.findIndex(temp =>{
                    return temp.id === data.id
                })
    
    
                localTemp[tempIndex] = data
                localStorage.setItem(TEMPORY_DATA, JSON.stringify(localTemp));
                
            }

            
            
            document.dispatchEvent(new Event("ondataloaded"))
        
        }else{
            const dataLocal = JSON.parse(localStorage.getItem(KEY_NOT_SELESAI_BACA));


            data.isComplete = true;
            
            const searchIndex = dataLocal.findIndex(dLoc =>{
                return dLoc.id === data.id;
            });
    
    
            removeElementData(this.parentElement.parentElement);
            
            
            dataLocal[searchIndex] = data;
            localStorage.setItem(KEY_NOT_SELESAI_BACA, JSON.stringify(dataLocal));


            const localTemp =  JSON.parse(localStorage.getItem(TEMPORY_DATA));
            


            if(localTemp !== null){
                const tempIndex = localTemp.findIndex(temp =>{
                    return temp.id === data.id
                })


                localTemp[tempIndex] = data
                localStorage.setItem(TEMPORY_DATA, JSON.stringify(localTemp));
            }
            

            document.dispatchEvent(new Event("ondataloaded"))
        }



    })

    return buttonSelesaiDibaca;
};




const btnNotEndRead = (data) =>{
    const buttonNotDibaca = document.createElement("button");
    buttonNotDibaca.classList.add("red")
    buttonNotDibaca.innerText = "Hapus Buku";

    const dataLocal = JSON.parse(localStorage.getItem(KEY_NOT_SELESAI_BACA));

    buttonNotDibaca.addEventListener("click", function(){

        const message = confirm("Wanna delete??");

        if(message){
            const dataSelect = dataLocal.filter(dLoc =>{
                return dLoc.id !== data.id;
            });
        
            localStorage.setItem(KEY_NOT_SELESAI_BACA, JSON.stringify(dataSelect));
            removeElementData(this.parentElement.parentElement)
    
    
    
            let localTemp =  JSON.parse(localStorage.getItem(TEMPORY_DATA));
    
            localTemp = dataSelect
    
            
    
    
            
    
            localStorage.setItem(TEMPORY_DATA, JSON.stringify(localTemp));
    
            return document.dispatchEvent(new Event("ondataloaded"))
        }


    })

    return buttonNotDibaca;
}


const removeElementData = (element) =>{
    return element.remove();
}



if(KEY_NOT_SELESAI_BACA.length !== 0){
    todoShowData(JSON.parse(localStorage.getItem(KEY_NOT_SELESAI_BACA)));
};

document.addEventListener("ondataloaded", function(){
    window.location.reload();
})



function submitTodo(){
    const submitSearch = document.getElementById("searchBook");
    const textSearchTitle = document.getElementById("searchBookTitle");

    const temp = [];

    submitSearch.addEventListener("submit", function(e){        
        e.preventDefault();



        const textTitle = {
            title: textSearchTitle.value.toString().toLowerCase(),
        };

        const dataLocal = JSON.parse(localStorage.getItem(KEY_NOT_SELESAI_BACA));
        const selectData = dataLocal.filter(data =>{
            const dataTitle = data.title.toString().toLowerCase();
            if(dataTitle.indexOf(textTitle.title) > -1){
                if(dataTitle !== undefined){
                    return data;
                }
            }
        });


        if(localStorage.getItem(TEMPORY_DATA) === null){
            
            localStorage.setItem(TEMPORY_DATA, JSON.stringify(temp));
        };

        localStorage.setItem(TEMPORY_DATA, JSON.stringify(selectData));

        document.dispatchEvent(new Event("ondataloaded"))


    })
}







document.addEventListener("DOMContentLoaded", function(){
    mainTodo();     
    submitTodo();
})








