const generateFrom = document.querySelector(".gen-form");
const genBtnn = document.getElementById("genbtn")
const imgGallery = document.querySelector(".img-gallery")
const OPENAI_API_KEY = "sk-proj-KthJbjrJGhexLgtAKFHHT3BlbkFJg3yM58vonsktqJxgquR3";
//  const updataImageCard =(imdataarray) =>{
//     imdataarray.forEach((imgObject, index)=>{
//         const imgCard = imageGallery.querySelectorAll(".img-card")[index];
//         const imgElemet= imgCard.querySelectorAll(".card-img");
//         const aigenimg = `data:image/jepg;base64,${imgObject.b64_json}`;
//         imgElemet.src = aigenimg;
//         imgElemet.onload = ()=>{
//             imgCard.classList.remove("loading");
//         }
//     })
//  }
const genAiImage = async (userPrompt, userImgQun) => {
    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          prompt: userPrompt,
          n: parseInt(userImgQun),
          size: "512x512",
          response_format: "b64_json"
        })
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to Generate Images! ${errorDetails.error.message}`);
      }
  
      const { data } = await response.json();
      updataImageCard({...data});
      // Handle the image data (e.g., display the images)
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Error details:', error);
    }
  }
  

const  handleFromSubmission = (e)=>{
    e.preventDefault();
     
    const userPromt = e.srcElement[0].value;
    const userImgQun = e.srcElement[1].value;
    // console.log(userPromt, userImgQun);

    //creating Html cards 
    const imgCard = Array.from({ length: userImgQun }, () => {
        return `
          <div class="img-card loading">
            <img src="images/loader.svg" alt="" class="card-img loader">
            <a href="#" class="download-btn">
              <img src="images/download.svg" alt="" class="download-icon">
            </a>
          </div>
        `;
      }).join("");
      console.log(imgCard);
      imgGallery.innerHTML = imgCard;
      genAiImage(userPromt,userImgQun);
   
    
}
generateFrom.addEventListener("submit", handleFromSubmission)




