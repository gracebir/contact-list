const avatar = document.querySelector('.image-avatar');

document.querySelectorAll('.image-input').forEach(inputElement=>{
    const dropzoneElt = inputElement.closest('.image-preview');

    dropzoneElt.addEventListener("click", (e) => {
        inputElement.click();
    });

    dropzoneElt.addEventListener('dragover', e=>{
        e.preventDefault()
        dropzoneElt.classList.add('drop-zone__over');
    })

    dropzoneElt.addEventListener('drop', e=>{
        e.preventDefault()
        if(e.dataTransfer.files.length){
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropzoneElt, e.dataTransfer.files[0]);
            dropzoneElt.classList.remove('drop-zone__over')
        }
    })
})

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropzoneElt
 * @param {File} file
 */

function updateThumbnail(dropElt, file){
    
    if(dropElt.querySelector('.image-text')){
        dropElt.querySelector('.image-text').remove()
    }

    if (file.type.startsWith("image/")) {
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
        reader.onload = () => {
            avatar.style.display = "block"
            avatar.setAttribute("src", reader.result)
        };
      } else {
       avatar.attributes("src",null)
      }
}

const upload = new Upload({ apiKey: "free" })
let imageurl
let contact_data = []
const prenom = document.getElementById('prenom')
const nom = document.getElementById('nom')
const phone = document.getElementById('phone')
const groupe = document.getElementById('group')
const email = document.getElementById('email')
const bio = document.getElementById('bio')
const buttonSubmit = document.getElementById('create');
const contact_items = document.getElementById('contact-items');
const resetBtn = document.getElementById('resetBtn');

const uploadFile = upload.createFileInputHandler({
    onUploaded: async ({ fileUrl, fileId }) => {
    //   alert(`File uploaded! ${fileUrl}`);
      imageurl = await fileUrl
    }
  });

function onSubmit(e){
    e.preventDefault()

    let contact_object = {
            surname: prenom.value,
            name: nom.value,
            telephone: phone.value,
            group: groupe.value,
            mail: email.value,
            bio: bio.value,
            imageuri: imageurl
        }
    contact_data.push(contact_object)
    console.log(contact_data)
    contact_data.map((data, index)=>{
        contact_items.innerHTML += `
        <div class="contact-item" key=${index}>
        <img src=${data.imageuri} class="contact-img" alt="">
        <div class="card-body">
            <div class="card-header">
                <div class="name">
                    <span>${data.surname} ${data.name}</span> - <span>${data.group}</span>
                </div>
                <div class="icons">
                <img src="./images/icons/edit.png" alt=""> 
                <img src="./images/icons/delete.png" alt="">
                </div>
            </div>
        
            <span class="card-phone">${data.telephone}</span>
            <p class="card-bio">
            ${data.bio}
            </p>
        </div>
        `
    })

    if(e.currentTarget.disabled){
        e.currentTarget.disabled = false
    } else {
        e.currentTarget.disabled = true
    }

}


buttonSubmit.addEventListener('click', onSubmit)

resetBtn.addEventListener('click', (e)=>{
    e.currentTarget.disabled = false;
})