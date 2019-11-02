const RANDOM_PIC_URL = 'https://picsum.photos/400';


function makeRequestWithXHR() {
    const xhr = new XMLHttpRequest();
    if (!xhr) {
        console.error('Could not create XMLHttpRequest!');
        return;
    }

    xhr.open('HEAD', RANDOM_PIC_URL);
    xhr.send();

    xhr.onreadystatechange = responseHandler;

    function responseHandler() {
        try {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    renderImage(xhr.responseURL)
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
    axios.get(RANDOM_PIC_URL)
        .then(function(response) {
            renderImage(response.request.responseURL)
        })
        .catch(function(error) {
            console.error('There was a problem with the request:');
            console.error(error)
        })
        .finally(function() {
            console.log('All done!')
        })
}

function renderImage(imageURL) {
    const imageElement = document.querySelector('#image');
    imageElement.setAttribute('src', imageURL)
}

makeRequestWithXHR();
makeRequestWithAxios();