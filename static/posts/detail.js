
//console.log('hello world')
console.log(window.location)
const postBox = document.getElementById('post-box')
const alertBox = document.getElementById('alert-box')
const  backBtn = document.getElementById('back-btn')
const updateBtn = document.getElementById('update-btn')
const deleteBtn = document.getElementById('delete-btn')
const url = window.location.href + "data/"
const updateUrl = window.location.href + "update/"
const deleteUrl = window.location.href + "delete/"

const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')

const spinnerBox = document.getElementById('spinner-box')

//data for model update and delete
const titleInput = document.getElementById('id_title')
const descriptionInput = document.getElementById('id_description')

//define the csrf
const csrf = document.getElementsByName('csrfmiddlewaretoken')


//backBtn.addEventListener('click', ()=>{
    //history.back()
    //window.location.replace(document.referrer);
    //getData()
    //window.location.replace("http://127.0.0.1:8000/posts/");
//})


$.ajax({
    type: 'GET',
    url: url,
    success: (response)=>{
        console.log(response)
        const data = response.data

        if(data.logged_in !== data.author){
            //updateBtn.classList.add('not-visible');
            //deleteBtn.classList.add('not-visible');
            console.log('differents user')
            
        }else{
            updateBtn.classList.remove('not-visible')
            deleteBtn.classList.remove('not-visible')
            console.log('own data')    
        }
        const titleEl = document.createElement('h3')
        titleEl.setAttribute('class', 'mt-3')
        titleEl.setAttribute('id', 'title')

        const descriptionEl = document.createElement('p')
        descriptionEl.setAttribute('class', 'mt-1')
        descriptionEl.setAttribute('id', 'description')

        //access to data
        titleEl.textContent = data.title
        descriptionEl.textContent = data.description
        postBox.appendChild(titleEl)
        postBox.appendChild(descriptionEl)

        //append data on model
        titleInput.value = data.title
        descriptionInput.value = data.description

        //made invisible the loading
        spinnerBox.classList.add('not-visible')
    },
    error: (error)=>{
        console.log(error)
    }
})

updateForm.addEventListener('submit', e=>{
    e.preventDefault()

    const title =  document.getElementById('title')
    const description = document.getElementById('description')

    $.ajax({
        type: 'POST',
        url: updateUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'title':titleInput.value,
            'description': descriptionInput.value,
        },
        success: (response)=>{
            console.log(response)
            handleAlerts('success', 'content has been updated')
            $('#alert-box').fadeToggle(1000);
            title.textContent = response.title
            description.textContent = response.description
        },
        error: (error)=>{
            console.log(error)
        }
    })
})

deleteForm.addEventListener('submit',e=>{
    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: deleteUrl,
        data:{
            'csrfmiddlewaretoken': csrf[0].value,
        },
        success: (response)=>{
            //window.location.href = window.location.origin.href
            window.location.replace("http://127.0.0.1:8000/posts/");
            //history.back()
            localStorage.setItem('title', titleInput.value)
        },
        error: (error)=>{
            console.log(error)
        }

    })
})