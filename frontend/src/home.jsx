import { useState, useEffect } from 'react'
import './home.css'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'

function home() {

    // display select menu
    document.addEventListener('DOMContentLoaded', () => {
        const allIcn = document.querySelector('.all-icn');
        const favIcn = document.querySelector('.fav-icn');
        const logsIcn = document.querySelector('.logs-icn');
        const secNotesIcn = document.querySelector('.secNotes-icn');
        const cardsIcn = document.querySelector('.cards-icn');

        const mbAll = document.querySelector('.mb-all');
        const mbFav = document.querySelector('.mb-fav');
        const mbLogs = document.querySelector('.mb-logs');
        const mbSecNotes = document.querySelector('.mb-secNotes');
        const mbCards = document.querySelector('.mb-cards');

        const midbarDivs = document.querySelectorAll('.midbar > div');
        const icons = document.querySelectorAll('.sidebar i');

        // Set initial display style and icon colors
        mbAll.style.display = 'block';
        midbarDivs.forEach((div) => {
            if (div !== mbAll) {
                div.style.display = 'none';
            }
        });
        icons.forEach((icon) => {
            if (icon === allIcn.querySelector('i')) {
                icon.style.color = '#880ED4';
            } else {
                icon.style.color = '#ffffff';
            }
        });

        // Add event listeners
        allIcn.addEventListener('click', () => {
            mbAll.style.display = 'block';
            mbFav.style.display = 'none';
            mbCards.style.display = 'none'
            mbLogs.style.display = 'none'
            mbSecNotes.style.display = 'none'
            icons.forEach((icon) => {
                if (icon === allIcn.querySelector('i')) {
                    icon.style.color = '#880ED4';
                } else {
                    icon.style.color = '#ffffff';
                }
            });
            midbarDivs.forEach((div) => {
                if (div !== mbAll) {
                    div.style.display = 'none';
                }
            });
        });

        favIcn.addEventListener('click', () => {
            mbAll.style.display = 'none';
            mbCards.style.display = 'none'
            mbLogs.style.display = 'none'
            mbFav.style.display = 'block';
            mbSecNotes.style.display = 'none'
            icons.forEach((icon) => {
                if (icon === favIcn.querySelector('i')) {
                    icon.style.color = '#880ED4';
                } else {
                    icon.style.color = '#ffffff';
                }
            });
            midbarDivs.forEach((div) => {
                if (div !== mbFav) {
                    div.style.display = 'none';
                }
            });
        });

        logsIcn.addEventListener('click', () => {
            mbAll.style.display = 'none';
            mbFav.style.display = 'none';
            mbLogs.style.display = 'block'
            mbCards.style.display = 'none'
            mbSecNotes.style.display = 'none'
            icons.forEach((icon) => {
                if (icon === logsIcn.querySelector('i')) {
                    icon.style.color = '#880ED4';
                } else {
                    icon.style.color = '#ffffff';
                }
            });
            midbarDivs.forEach((div) => {
                if (div !== mbLogs) {
                    div.style.display = 'none';
                }
            });
        });

        secNotesIcn.addEventListener('click', () => {
            mbAll.style.display = 'none';
            mbFav.style.display = 'none';
            mbLogs.style.display = 'none'
            mbCards.style.display = 'none'
            mbSecNotes.style.display = 'block'
            icons.forEach((icon) => {
                if (icon === secNotesIcn.querySelector('i')) {
                    icon.style.color = '#880ED4';
                } else {
                    icon.style.color = '#ffffff';
                }
            });
            midbarDivs.forEach((div) => {
                if (div !== mbSecNotes) {
                    div.style.display = 'none';
                }
            });
        });

        cardsIcn.addEventListener('click', () => {
            mbAll.style.display = 'none';
            mbFav.style.display = 'none';
            mbLogs.style.display = 'none'
            mbCards.style.display = 'block'
            mbSecNotes.style.display = 'none'
            icons.forEach((icon) => {
                if (icon === cardsIcn.querySelector('i')) {
                    icon.style.color = '#880ED4';
                } else {
                    icon.style.color = '#ffffff';
                }
            });
            midbarDivs.forEach((div) => {
                if (div !== mbCards) {
                    div.style.display = 'none';
                }
            });
        });

        // get all the list items with className "itm"
        const items = document.querySelectorAll('.itm');

        // loop through each item and add a click event listener
        items.forEach(item => {
            item.addEventListener('click', () => {
                // get the image source and username of the selected item
                const imgSrc = item.querySelector('.itm-img').getAttribute('src');
                const itmUsername = item.querySelector('.itm-username').textContent;
                const itmName = item.querySelector('.itm-name').textContent;

                // set the image source and username in the appropriate elements
                const imgL = document.querySelector('.itm-imgL');
                const username = document.querySelector('.username');
                const itmNameL = document.querySelector('.itm-nameL')
                imgL.setAttribute('src', imgSrc);
                username.textContent = itmUsername;
                itmNameL.textContent = itmName;
            });
        });

        // get all the copy buttons
        const copyButtons = document.querySelectorAll('.copy');

        // add a click event listener to each copy button
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                // get the username text
                const username = button.parentElement.previousElementSibling.querySelector('.username').textContent;

                // copy the username text to clipboard
                navigator.clipboard.writeText(username)
                    .then(() => {
                        console.log(`Copied ${username} to clipboard`);
                        // show notification for a few seconds
                        const notification = '<div className="notification">Text copied</div>';
                        document.body.insertAdjacentHTML('beforeend', notification);
                        setTimeout(() => document.querySelector('.notification').remove(), 3000);
                    })
                    .catch(err => console.error('Failed to copy to clipboard', err));
            });
        });

        const addButton = document.querySelector('.add-btn');
        const addMenu = document.querySelector('.add-menu');

        addButton.addEventListener('click', () => {
            addMenu.classList.toggle('add-menu-show');
        });

        const editableHeading = document.querySelector(".itm-nameL");
        const editButton = document.querySelector(".edit-btn");

        editButton.addEventListener("click", function () {
            console.log("read");
            if (editableHeading.contentEditable === "false") {
                editableHeading.contentEditable = "true";
                editableHeading.style.border = "1px solid #880ED4";
                editButton.textContent = "Save";
            } else {
                const text = editableHeading.innerText;
                const formattedText = text.replace(/\r?\n/g, ""); // remove new lines
                if (formattedText.length === 0) {
                    alert("Please enter some text before saving.");
                    return;
                }
                editableHeading.contentEditable = "false";
                editableHeading.style.border = "none";
                editButton.textContent = "Edit";
            }
        });

        editableHeading.addEventListener("keydown", function (e) {
            const text = editableHeading.innerText;
            const formattedText = text.replace(/\r?\n/g, ""); // remove new lines
            if (formattedText.length >= 10 && e.key.length === 1) {
                e.preventDefault(); // prevent new characters from being added
            }
        });

        // Get a reference to the <i> tag
        const icon = document.querySelector('.itm-intro i');

        // Add a click event listener to the <i> tag
        icon.addEventListener('click', function () {
            // Toggle the 'gold' className on the <i> tag
            this.classList.toggle('gold');
        });

    });

    // Set selected sidebar bgColor
    $(document).ready(function () {
        $('.itm').click(function () {
            // set the background-color of clicked item to #880ED4
            $(this).css('background-color', '#880ED4');
            // set the background-color of other items to white
            $('.itm').not(this).css('background-color', 'black');
        });
    });

    const [logins, setLogins] = useState([])
    const [cards, setCards] = useState([])
    const [secNotes, setSecNotes] = useState([])
    const [favs, setFavs] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        Axios.get(`http://localhost:8000/getUserData`, {
            headers: { "token": localStorage.getItem("accessToken") }
        }).then(res => {
            if (res.data.auth == false) {
                navigate(`/`)
            }
            setLogins(res.data['logins'])
            setCards(res.data['cards'])
            setSecNotes(res.data['secNotes'])
        });
    }, []);

    // set img to brandLogo if !found
    function handleImageError(event) {
        event.target.onerror = null; // remove the onerror listener to avoid an infinite loop
        event.target.src = 'Brand/Vault.png'; // set the default image source
    }

    const arrLogins = logins.map((l) => {
        let imgName = l.title.toLowerCase()
        return (

            <li className="itm login">
                <img className="itm-img" src={`icons/${imgName}.png`} onError={handleImageError} alt="icon" />
                <div className="itm-txt">
                    <h3 className="itm-name">{l.title}</h3>
                    <h3 className="itm-username">{l.username}</h3>
                </div>
            </li>
        )
    })

    const arrCards = cards.map((c) => {
        let imgName;
        if (c.brand == "mastercard") {
            imgName = 'mastercard'
        }
        else {
            imgName = 'visa'
        }

        let cardNumber = c.cardNumber.substring(0, 4) + "-XXXX-XXXX-" + c.cardNumber.substring(c.cardNumber.length - 4)
        return (

            <li className="itm card">
                <img className="itm-img" src={`icons/${imgName}.png`} onError={handleImageError} alt="icon" />
                <div className="itm-txt">
                    <h3 className="itm-name">{c.title}</h3>
                    <h3 className="itm-username">{cardNumber}</h3>
                </div>
            </li>
        )
    })

    const arrSecNotes = secNotes.map((sn) => {
        return (

            <li className="itm">
                <img className="itm-img" src={`Brand/Vault.png`} alt="icon" />
                <div className="itm-txt">
                    <h3 className="itm-name">{sn.title}</h3>
                </div>
            </li>
        )
    })

    // get all the list items with className "itm"
    const items = document.querySelectorAll('.itm');
    let itmInfo = () => { };

    // loop through each item and add a click event listener
    items.forEach(item => {
        item.addEventListener('click', () => {
            // get the image source and username of the selected item
            const imgSrc = item.querySelector('.itm-img').getAttribute('src');
            const itmUsername = item.querySelector('.itm-username').textContent;
            const itmName = item.querySelector('.itm-name').textContent;

            // set the image source and username in the appropriate elements
            const imgL = document.querySelector('.itm-imgL');
            const username = document.querySelector('.username');
            const itmNameL = document.querySelector('.itm-nameL');
            const iAttribute = document.querySelector('.h3-type:first-child');
            imgL.setAttribute('src', imgSrc);
            username.textContent = itmUsername;
            itmNameL.textContent = itmName;

            if (item.className == 'itm login') {
                iAttribute.textContent = 'Username'
            }
            else if (item.className == 'itm card') {
                iAttribute.textContent = 'Card Number'
                itmInfo = () => {
                    return (
                        <div className="itm-info">
                            <div className="itm-data">
                                <h3 className="h3-type">Expiry Date</h3>
                                <h3 className="pass">05/25</h3>
                            </div>
                            <div><i className="fa fa-clone copy"></i></div>
                        </div>
                    );
                }
            }
        });
    });

    return (
        <>
            <header>

                <div className="brand">VAULT</div>
                <input type="text" placeholder="Search Vault" className="search-bar" />

                <div className="user-dropdown">
                    <div className="icon">
                        <h6>DM</h6>
                    </div>
                </div>
            </header>
            <div className="main">
                <div className="sidebar">
                    <ul>
                        <li title="All" className="all-icn"><i className="fa fa-th-large" aria-hidden="true"></i>
                        </li>
                        <li title="Favourits" className="fav-icn"><i className="fa fa-star" aria-hidden="true"></i>
                        </li>
                        <li title="Logins" className="logs-icn"><i className="fa fa-lock" aria-hidden="true"></i>
                        </li>
                        <li title="Secure Notes" className="secNotes-icn"><i className="fa fa-sticky-note" aria-hidden="true"></i>
                        </li>
                        <li title="Cards" className="cards-icn"><i className="fa fa-credit-card-alt" aria-hidden="true"></i>
                        </li>
                        <li title="Folders" className="flds-icn"><i className="fa fa-folder" aria-hidden="true"></i>
                        </li>
                        <li title="Trash" className="trash-icn"><i className="fa fa-trash" aria-hidden="true"></i>
                        </li>
                        <li title="Settings" className="settings-icn"><i className="fa fa-cogs" aria-hidden="true"></i>
                        </li>
                    </ul>
                </div>
                <div className="midbar">
                    <div className="mb-all">
                        <h3 className="type">LOGINS</h3>
                        <ul className="itms">
                            {arrLogins}
                            <h3 className="type">CARDS</h3>
                            {arrCards}
                            <h3 className="type">SECURE NOTES</h3>
                            {arrSecNotes}
                        </ul>
                    </div>
                    <div className="mb-fav">
                        <h3 className="type">LOGINS</h3>
                        <ul className="itms">
                            <li className="itm">
                                <img className="itm-img" src="icons/facebook.png" alt="icon" />
                                <div className="itm-txt">
                                    <h3 className="itm-name">Facebook</h3>
                                    <h3 className="itm-username">facebook@mail.com</h3>
                                </div>
                            </li>
                            <h3 className="type">CARDS</h3>
                            <li className="itm">
                                <img className="itm-img" src="icons/visa.png" alt="icon" />
                                <div className="itm-txt">
                                    <h3 className="itm-name">Visa</h3>
                                    <h3 className="itm-username">4921-XXXX-XXXX-9070</h3>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-logs">
                        <h3 className="type">LOGINS</h3>
                        <ul className="itms">
                            {arrLogins}
                        </ul>
                    </div>

                    <div className="mb-secNotes">
                        <h3 className="type">SECURE NOTES</h3>
                        <ul className="itms">
                            {arrSecNotes}
                        </ul>
                    </div>


                    <div className="mb-cards">
                        <h3 className="type">CARDS</h3>
                        <ul className="itms">
                            {arrCards}
                        </ul>
                    </div>
                </div>
                <div className="itm-bar">
                    <div className="toolbar">
                        <button className="edit-btn"><i className="fa fa-pencil"></i> Edit</button>
                        <button className="dlt-btn"><i className="fa fa-trash"></i> Delete</button>
                    </div>
                    <div className="itm-intro">
                        <img className="itm-imgL" src="icons/google.png" alt="icon" />
                        <div className="itm-txt">
                            {/* <h3 className="itm-nameL" contentEditable="false">Google</h3> */}
                            <h3 className="itm-nameL">Google</h3>
                            <h3 className="itm-type">Login</h3>
                        </div>
                        <i className="fa fa-star"></i>
                    </div>
                    <div className="split"></div>
                    <div className="itm-info">
                        <div className="itm-data">
                            <h3 className="h3-type">Username</h3>
                            <h3 className="username">google@gmailcom</h3>
                        </div>
                        <div><i className="fa fa-clone copy"></i></div>
                    </div>
                    <div className="itm-info">
                        <div className="itm-data">
                            <h3 className="h3-type">Password</h3>
                            <h3 className="pass">●●●●●●●●●●●●●●●</h3>
                        </div>
                        <div><i className="fa fa-clone copy"></i>
                            <i className="fa fa-eye second-i"></i></div>
                    </div>
                    {itmInfo}
                    <div className="split"></div>
                    <div className="itm-info">
                        <div className="itm-data">
                            <h3 className="h3-type">Website</h3>
                            <h3 className="username">accounts.google.com</h3>
                        </div>
                    </div>
                </div>
                <button className="add-btn">+</button>
                <div className="add-menu">
                    <ul className="add-list">
                        <li><i className="fa fa-lock"></i></li>
                        <li><i className="fa fa-sticky-note"></i></li>
                        <li><i className="fa fa-credit-card-alt"></i></li>
                    </ul>
                </div>
            </div >

            <footer>
                <h3>Designed & Built by <a href="https://github.com/dmeleka"> Daniel Meleka</a></h3>
            </footer>
        </>
    )
}

export default home
