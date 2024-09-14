
//listing element
document.getElementById('resumeForm')?.addEventListener('submit', function(event){
    event.preventDefault();

    //Get reference to form elements using their IDs:
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement; 
    

    ///type assertion
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const addressElement = document.getElementById('address') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    //** 
    const usernameElement = document.getElementById(
        "username"
    )as HTMLInputElement;
    
    if( profilePictureInput && nameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && skillsElement && usernameElement){
      //get values from form
        const name = nameElement.value; 
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addressElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skill = skillsElement.value;



        // Handle picture elements
        const profilePictureFile = profilePictureInput.files?.[0]
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
    

   //generate the resume HTML content
   const resumeHTML =`
   <h2>Resume</h2>
   ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""}
   <p><strong>Name :</strong> ${name} </p>
   <p><strong>Email :</strong> ${email} </p>
   <p><strong>Phone Number :</strong> ${phone} </p>${address} </p>
   <p><strong>Address :</strong> 

   
   <h3>Education:</h3>
   <p>${education}</p>

   <h3> Work Experience:</h3>
   <p>${experience}</p>

   <h3>Skills:</h3>
   <p>${skill}</p>
   `;    

 //Display the resume output container
    const resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeHTML;
        resumeOutputElement.classList.remove("hidden");

        //create container for button
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        //Add download PDF button
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
            window.print();//open thr print dialog allowing thr user to save as PDF
        });
        buttonsContainer.appendChild(downloadButton);
        
        //Add shareable link button
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent ="Copy Shareable Link";
        shareLinkButton.addEventListener("click", async () => {
            try{
                //create a unique shareable link (simulate it in this case)
                const shareableLink = `https://yourdomain.com/resumes/${name.replace(
                    /\s+/g,
                    "_"
             )}_cv.html`;

            //use clipboard API to copy the shareable Link
            await navigator.clipboard.writeText(shareableLink);
            alert("Shareable link copied to clipboard!");
            }catch(err){
                console.error("Failed to copy link: ", err);
                alert("Failed to copy link to clipboard. Please try again.");
            }
        });
        buttonsContainer.appendChild(shareLinkButton);
    }else{
    console.error("Resume output container not found");
  }
  }else{
    console.error("Form elements are missing");

 }
});


