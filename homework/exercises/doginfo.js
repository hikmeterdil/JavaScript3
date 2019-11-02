const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';


function makeRequestWithXHR() {
    const xhr = new XMLHttpRequest();
    if (!xhr) {
        console.error('Could not create XMLHttpRequest!');
        return;
    }

    xhr.open('GET', DOG_API_URL);
    xhr.send();

    xhr.onreadystatechange = responseHandler;

    function responseHandler() {
        try {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Here is the response:');
                    console.log(JSON.parse(xhr.responseText))
                } else {
                    console.error('There was a problem with the request, here is the response:');
                    console.error(xhr.responseText)
                }
            }
        } catch (e) {
            console.error('There was a problem with the request:');
            console.error(e.message)
        }
    }
}

function makeRequestWithAxios() {
    axios.get(DOG_API_URL)
        .then(function(response) {
            console.log('Here is the response:');
            console.log(response.data)
        })
        .catch(function(error) {
            console.error('There was a problem with the request:');
            console.error(error)
        })
        .finally(function() {
            console.log('All done!')
        })
}


makeRequestWithXHR();
makeRequestWithAxios();