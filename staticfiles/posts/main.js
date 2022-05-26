
//console.log("hello wolrd moussa")
//console.log(document);
//console.log(window.location)
const div1 = document.getElementById("div1");
const postBox = document.getElementById("posts");
const spinnerBox = document.getElementById("spinner-box")
const loadBtn = document.getElementById('load-btn')
const endBox = document.getElementById('end-box')
const postForm = document.getElementById('post-form')
const title = document.getElementById('id_title')
const description = document.getElementById('id_description')
const csrf = document.getElementsByName('csrfmiddlewaretoken')
const alertBox = document.getElementById('alert-box')
const dropzone = document.getElementById('my-dropzone')
const addBtn = document.getElementById('add-btn')
const closeBtns = [...document.getElementsByClassName('add-modal-close')] 

const url =  window.location.href
//console.log(window.location)

/*const closeModal =()=> {
    $('#addPostModal').on('shown.bs.modal', function(e) {
        $("#addPostModal").modal("hide");
    });
} */

//console.log('csrf', csrf[0].value)
/* div1.innerHTML = 'moussa is <b>cool</b>';

$.ajax({
    type: 'GET',
    url:'/posts/hello-world/',
    success: function(response){
        console.log('succes', response.text)
        div1.textContent = response.text
    },
    error: function(error){
        console.log('error', error)
    }
})*/

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const deleted = localStorage.getItem('title')
if (deleted){
    handleAlerts('danger', `deleted "${deleted}"`)
    $('#alert-box').fadeToggle(1000);
    localStorage.clear()
}
//create a funtion like a nd unlike
const likeUnlikePosts =()=>{
    const likeUnlikeForms =  [...document.getElementsByClassName('like-unlike-forms')]
    //console.log(likeUnlikeForms)
    likeUnlikeForms.forEach(form=> form.addEventListener('submit',e=>{
        e.preventDefault()
        const clickedId = e.target.getAttribute('data-form-id')
        const clickedBtn = document.getElementById(`like-unlike-${clickedId}`)

        $.ajax({
            type:'POST',
            url:"/posts/like-unlike/",
            data: {
                'csrfmiddlewaretoken': csrftoken,
                'pk': clickedId,

            },
            success: function(response){
                console.log(response)
                //work later on unlike and like icone
                clickedBtn.textContent = response.liked ? `Unlike(${response.count})`:`Like(${response.count})`
            },
            error: function(error){
                console.log(error)
            }

        })

    }))
}

let visible = 3

const getData = () => {
    $.ajax({
        type: 'GET',
        url:`/posts/data/${visible}`,
        success: function(response){
            //console.log(response)
            const data = response.data
            spinnerBox.classList.add('not-visible')
            //console.log(data)
            data.forEach(el => {
                postBox.innerHTML += `
                    <div class="card shadow-lg">
                        <img  src="${el.avatar}" class="rounded"  height="200px" width="auto" alt="${el.id}">
                        <div class="card-body">
                            <h5 class="card-title">${el.title}</h5>
                            <p class="card-text">${el.description}</p>     
                        </div>
                        <div class="card-footer">
                        <div class="row">
                            <div class="col-2">
                                <a href="${url}${el.id}" class="btn btn-primary"><i class="fas fa-search"></i></a>
                            </div>
                            <div class="col-2">
                            <form class="like-unlike-forms" data-form-id="${el.id}">
                                <button href="#" class="btn btn-primary" id="like-unlike-${el.id}">${el.liked ? `<i class="fas fa-thumbs-up"></i>(${el.count})`:`<i class="fas fa-thumbs-up"></i>(${el.count})`}</button>
                            </form>
                        </div>
                            
                        </div>
                        
                        </div>
                    </div>
                `
                likeUnlikePosts()
            });
            console.log(response.size)
            if (response.size===0){
                endBox.textContent = 'No posts added yet...'
            }
            else if (response.size <= visible){
                loadBtn.classList.add('not-visible')
                endBox.textContent = 'No more posts to load...'
            }
        },
        error: function(error){
            console.log(error)
        }
    })
}

loadBtn.addEventListener('click', ()=>{
    spinnerBox.classList.remove('not-visible')
    visible +=3
    getData()
})

let newPostId = null
// adding event listener on modal oviously
postForm.addEventListener('submit', e=>{
    e.preventDefault()
    $.ajax({
        type:'POST',
        url:'',
        data:{
            'csrfmiddlewaretoken': csrf[0].value,
            'title':title.value,
            'description':description.value
        },
        success: function(response){
            //console.log(response)
            newPostId = response.id
            postBox.insertAdjacentHTML('afterbegin',`
                    <div class="card">
                    <img  src="${response.avatar}" class="rounded"  height="200px" width="auto" alt="${response.id}">
                        <div class="card-body">
                            <h5 class="card-title">${response.title}</h5>
                            <p class="card-text">${response.description}</p>     
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col-2">
                                <a href="${url}${response.id}" class="btn btn-primary"><i class="fas fa-search"></i></a>
                                </div>
                                <div class="col-2">
                                    <form class="like-unlike-forms" data-form-id="${response.id}">
                                        <button href="#" class="btn btn-primary" id="like-unlike-${response.id}"><i class="fas fa-thumbs-up"></i>(0)</button>
                                    </form>
                                </div>
                        
                            </div>
                    
                        </div>
                    </div>
            `)
            likeUnlikePosts()
            //$('#addPostModal').hide();
            //$(".modal-backdrop").remove();
            handleAlerts('success','New content added!')
            //$('#alert-box').fadeToggle(1000);
            //postForm.reset() 

        },
        error: function(error){
            console.log(error)
            handleAlerts('danger','ups...something went wrong!')
            //$('#addPostModal').modal('hide')
        }
   })
})

addBtn.addEventListener('click',()=>{
    dropzone.classList.remove('not-visible')
})

closeBtns.forEach(btn=> btn.addEventListener('click', ()=>{
    postForm.reset()
    if (!dropzone.classList.contains('not-visible')){
        dropzone.classList.add('not-visible')
    }
    const myDropzone = Dropzone.forElement("#my-dropzone")
    myDropzone.removeAllFiles(true)
}))

Dropzone.autoDiscover = false
const myDropzone = new Dropzone('#my-dropzone', {
    url: 'upload/',
    init: function () {
        this.on('sending', function(file,xhr,formData){
            formData.append('csrfmiddlewaretoken', csrftoken)
            formData.append('new_post_id', newPostId)
        })
    },
    maxFiles: 5,
    maxFilesize: 4,
    acceptedFiles: '.png, .jpg, .jpeg'
})
//we need to run at lest one time the function getData() and click on loadBtn
getData()
