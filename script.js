// Оброботка пользователей

const message = document.querySelector('#message');

const usersWrapper = document.querySelector('#usersWrapper');
const serverWrapper = document.querySelector('#serverWrapper');
const usersDeviceWrapper = document.querySelector('#usersDeviceWrapper');

let objectStorage = null;

const byteCloudServers = [];
const users = [];

usersWrapper.addEventListener('click', event => {
    const parent = event.target.parentNode;
    const target = event.target;

    if (target.hasAttribute('data-users')) {
        if (users.length === 0) {
            const nextStep = document.createElement('a');
            nextStep.setAttribute('href', '#');
            nextStep.setAttribute('id', 'toObjectStorage');
            nextStep.innerText = 'Next';
            message.append(nextStep);

            nextStep.addEventListener('click', () => {
                toObjectStorage();
            });
        }

        users.push({
            continent: parent.dataset.continent,
            users: Number(target.dataset.users)
        });

        parent.style.display = 'none';

        if (users.length === 5) {
            //Next Step
            toObjectStorage();
        }

    }
});

// Выбор Object Storage
function toObjectStorage() {
    usersWrapper.style.display = 'none';

    message.innerHTML = 'Where is your data? Choose one spot for Object Storage system';

    serverWrapper.style.display = 'block';
    usersDeviceWrapper.style.display = 'block';

    for (let i = 0; i < users.length; i++) {

        const usersDevices = getUsersDevice(users[i].continent);

        for (let j = 0; j < users[i].users; j++) {
            usersDevices[j].style.display = 'block';
        }
    }
}

let btnParsing = null;

// Обработчик клика по objectStorage
serverWrapper.addEventListener('click', event => {
    const elem = event.target;

    if (elem.className.includes('objectStorage') !== -1 && !elem.dataset.type) {
        if (!objectStorage) {
            objectStorage = elem;
            elem.setAttribute('data-type', 'objectStorage');
            message.innerHTML = 'Choose minimum two additional spots for ByteCloud and press <button id="btnParsing" disabled>Start</button>';
            btnParsing = message.querySelector('#btnParsing');
            btnParsing.addEventListener('click', () => {
                serverWrapper.querySelector('.server:not([data-type])').style.display = 'none';
                parsing();
            });
        } else {
            byteCloudServers.push(elem)
            elem.setAttribute('data-type', 'byteCloud');

            if (byteCloudServers.length === 2) {
                btnParsing.removeAttribute('disabled');
            } else if (byteCloudServers.length === 3) (
                parsing()
            )
        }
    }
});

// Возврат массива контейнров с устройствами 
function getUsersDevice(continent) {
    return usersDeviceWrapper.querySelectorAll(`.usersDevice_container.${continent} .userDevice`);
}

//Просчет скорости

function parsing() {
    message.style.display = 'none';

    users.forEach(u => {
        const usersDevice = getUsersDevice(u.continent);

        for (let i = 0; i < u.users; i++) {
            usersDevice[i].innerHTML = '<div class="parsing"></div>';
        }
    });

    console.log(users)
}