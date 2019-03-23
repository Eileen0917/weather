console.log('c s js is loaded.')

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const wearther_form = document.querySelector('form')
const search = document.querySelector('input')
const message_one = document.querySelector('#message-1')
const message_two = document.querySelector('#message-2')



wearther_form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message_one.textContent = 'Loading...'
    message_two.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message_one.textContent = data.error
            } else {
                message_one.textContent = data.location
                message_two.textContent = data.forecast
            }
        })
    })
})