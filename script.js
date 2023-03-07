// Оброботка пользователей

const message = document.querySelector('#message');

const usersWrapper = document.querySelector('#usersWrapper');
const objectStorageWrapper = document.querySelector('#objectStorageWrapper');
const usersDeviceWrapper = document.querySelector('#usersDeviceWrapper');

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

    objectStorageWrapper.style.display = 'block';
    usersDeviceWrapper.style.display = 'block';

    for (let i = 0; i < users.length; i++) {
        const continent = users[i].continent;

        const usersDevices = usersDeviceWrapper.querySelectorAll(`.usersDevice_container.${continent} .userDevice`);

        for (let j = 0; j < users[i].users; j++) {
            usersDevices[j].style.display = 'block';
        }
    }
}