const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const getWeather = (address, callback) => {
    fetch(`http://localhost:3000/weather?address=${address}`).then(
        (response) => {
            response.json().then((data) => {
                callback(data)
            })
        }
    )
}

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    e.preventDefault()
    const location = search.value
    getWeather(location, (data) => {
        if (data.error) {
            messageOne.setAttribute('color', '#ff0000')
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = `${data.description}, Temp: ${data.temperature}, Feels like: ${data.feelslike}`
        }
    })
})
