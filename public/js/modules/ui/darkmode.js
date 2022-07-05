export const darkmode = () => {
    if(localStorage.getItem("darkmode") == "true"){
        localStorage.setItem('darkmode', 'false');
        console.log("test");
    }
    else{
        localStorage.setItem('darkmode', 'true');
    }
    document.body.classList.toggle('darkmode');

}
  