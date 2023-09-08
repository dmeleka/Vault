import { useState, useEffect } from "react";
import "./home.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { doc } from "prettier";

function home() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [logins, setLogins] = useState([]);
    const [cards, setCards] = useState([]);
    const [secNotes, setSecNotes] = useState([]);
    const [favs, setFavs] = useState([]);
    const [input, setInput] = useState([]);

    const itmBar = document.querySelector(".itm-bar");
    const copyButtons = document.querySelectorAll(".copy");
    const items = document.querySelectorAll(".itm");

    let itmInfo = () => { };

    var itmId = "";

    const fetchData = () => {
        Axios.get(`http://localhost:8000/getUserData`, {
            headers: { token: localStorage.getItem("accessToken") },
        })
            .then((res) => {
                if (res.data.auth === false) {
                    navigate(`/`);
                }
                setData(res.data);
                setLogins(res.data["logins"]);
                setCards(res.data["cards"]);
                setSecNotes(res.data["secNotes"]);

                const favoriteObjects = Object.values(res.data).flatMap((array) =>
                    array.filter((obj) => obj.favourite === true)
                );

                setFavs(favoriteObjects);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    function getObjectAttributesById(id) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const array = data[key];
                const foundObject = array.find(obj => obj._id === id);
                if (foundObject) {
                    return foundObject;
                }
            }
        }
        return null; // Return null if object with the given id is not found
    }

    // display select menu
    document.addEventListener("DOMContentLoaded", () => {

        console.log("DOMLoaded");

        const allIcn = document.querySelector(".all-icn");
        const favIcn = document.querySelector(".fav-icn");
        const logsIcn = document.querySelector(".logs-icn");
        const secNotesIcn = document.querySelector(".secNotes-icn");
        const cardsIcn = document.querySelector(".cards-icn");

        const mbAll = document.querySelector(".mb-all");
        const mbFav = document.querySelector(".mb-fav");
        const mbLogs = document.querySelector(".mb-logs");
        const mbSecNotes = document.querySelector(".mb-secNotes");
        const mbCards = document.querySelector(".mb-cards");

        const midbarDivs = document.querySelectorAll(".midbar > div");
        const icons = document.querySelectorAll(".sidebar i");

        // const items = document.querySelectorAll(".itm");

        // Set initial display style and icon colors
        mbAll.style.display = "block";
        midbarDivs.forEach((div) => {
            if (div !== mbAll) {
                div.style.display = "none";
            }
        });
        icons.forEach((icon) => {
            if (icon === allIcn.querySelector("i")) {
                icon.style.color = "#880ED4";
            } else {
                icon.style.color = "#ffffff";
            }
        });

        // Add event listeners
        allIcn.addEventListener("click", () => {
            mbAll.style.display = "block";
            mbFav.style.display = "none";
            mbCards.style.display = "none";
            mbLogs.style.display = "none";
            mbSecNotes.style.display = "none";
            icons.forEach((icon) => {
                if (icon === allIcn.querySelector("i")) {
                    icon.style.color = "#880ED4";
                } else {
                    icon.style.color = "#ffffff";
                }
            });
            midbarDivs.forEach((div) => {
                if (div !== mbAll) {
                    div.style.display = "none";
                }
            });
        });

        favIcn.addEventListener("click", () => {
            mbAll.style.display = "none";
            mbCards.style.display = "none";
            mbLogs.style.display = "none";
            mbFav.style.display = "block";
            mbSecNotes.style.display = "none";
            icons.forEach((icon) => {
                if (icon === favIcn.querySelector("i")) {
                    icon.style.color = "#880ED4";
                } else {
                    icon.style.color = "#ffffff";
                }
            });
            midbarDivs.forEach((div) => {
                if (div !== mbFav) {
                    div.style.display = "none";
                }
            });
        });

        logsIcn.addEventListener("click", () => {
            mbAll.style.display = "none";
            mbFav.style.display = "none";
            mbLogs.style.display = "block";
            mbCards.style.display = "none";
            mbSecNotes.style.display = "none";
            icons.forEach((icon) => {
                if (icon === logsIcn.querySelector("i")) {
                    icon.style.color = "#880ED4";
                } else {
                    icon.style.color = "#ffffff";
                }
            });
            midbarDivs.forEach((div) => {
                if (div !== mbLogs) {
                    div.style.display = "none";
                }
            });
        });

        secNotesIcn.addEventListener("click", () => {
            mbAll.style.display = "none";
            mbFav.style.display = "none";
            mbLogs.style.display = "none";
            mbCards.style.display = "none";
            mbSecNotes.style.display = "block";
            icons.forEach((icon) => {
                if (icon === secNotesIcn.querySelector("i")) {
                    icon.style.color = "#880ED4";
                } else {
                    icon.style.color = "#ffffff";
                }
            });
            midbarDivs.forEach((div) => {
                if (div !== mbSecNotes) {
                    div.style.display = "none";
                }
            });
        });

        cardsIcn.addEventListener("click", () => {
            mbAll.style.display = "none";
            mbFav.style.display = "none";
            mbLogs.style.display = "none";
            mbCards.style.display = "block";
            mbSecNotes.style.display = "none";
            icons.forEach((icon) => {
                if (icon === cardsIcn.querySelector("i")) {
                    icon.style.color = "#880ED4";
                } else {
                    icon.style.color = "#ffffff";
                }
            });
            midbarDivs.forEach((div) => {
                if (div !== mbCards) {
                    div.style.display = "none";
                }
            });
        });
    });

    const handleFavourite = () => {

        const id = document.querySelector(".itm-bar").getAttribute("data-id");

        Axios.post(`http://localhost:8000/setFavourite`, { itmId: id }, {
            headers: { token: localStorage.getItem("accessToken") },
        }).then((res) => {
            if (res.data.auth === false) {
                navigate(`/`);
            }
            // if (res.data === "Done") {
            fetchData();
            star.classList.toggle("gold");
            // }
        });
    };

    const handleView = () => {
        const toggleIcon = document.querySelector("#eye");
        const passwordField = document.querySelector("#pass");

        if (passwordField.type === "password") {
            passwordField.type = "text";
            toggleIcon.classList.remove("fa-eye");
            toggleIcon.classList.add("fa-eye-slash");
        } else {
            passwordField.type = "password";
            toggleIcon.classList.remove("fa-eye-slash");
            toggleIcon.classList.add("fa-eye");
        }
    };

    const handleDelete = () => {
        const id = document.querySelector(".itm-bar").getAttribute("data-id");

        Axios.post(`http://localhost:8000/deleteItm`, { itmId: id }, {
            headers: { token: localStorage.getItem("accessToken") },
        }).then((res) => {
            if (res.data.auth === false) {
                navigate(`/`);
            } else {
                fetchData();
                itmBar.style.display = "none";
                console.log(res.data);
            }
        });
    };

    function handleItemClick(event) {
        event.preventDefault();
        const item = event.currentTarget;
        const imgSrc = item.querySelector(".itm-img").getAttribute("src");
        const itmUsername = item.querySelector(".itm-username").textContent;
        const itmName = item.querySelector(".itm-name").textContent;

        const imgL = document.querySelector(".itm-imgL");
        const username = document.querySelector("#username");
        const itmNameL = document.querySelector("#itm-nameL");
        const password = document.querySelector("#pass");
        const website = document.querySelector("#website");
        const iAttribute = document.querySelector(".h3-type:first-child");
        imgL.setAttribute("src", imgSrc);
        username.textContent = itmUsername;
        itmNameL.value = itmName;

        itmBar.style.display = "flex";
        const dataID = item.getAttribute("data-id")
        itmId = dataID;
        itmBar.setAttribute("data-id", dataID);

        if (getObjectAttributesById(dataID).favourite) {
            star.classList.add("gold");
        } else {
            star.classList.remove("gold");
        }

        // Set the background-color of the clicked item to #880ED4
        item.style.backgroundColor = "#880ED4";

        // Set the background-color of other items to black
        items.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.style.backgroundColor = "black";
            }
        });

        imgL.setAttribute("src", imgSrc);
        username.value = getObjectAttributesById(dataID).username;
        itmNameL.value = getObjectAttributesById(dataID).title;
        website.value = getObjectAttributesById(dataID).websiteLink;
        password.value = getObjectAttributesById(dataID).password;

        if (item.className == "itm login") {
            iAttribute.textContent = "Username";
        } else if (item.className == "itm card") {
            iAttribute.textContent = "Card Number";
            itmInfo = () => {
                return (
                    <div className="itm-info">
                        <div className="itm-data">
                            <h3 className="h3-type">Expiry Date</h3>
                            <h3 className="pass">05/25</h3>
                        </div>
                        <div>
                            <i className="fa fa-clone copy"></i>
                        </div>
                    </div>
                );
            };
        }
    };

    // set img to brandLogo if !found
    function handleImageError(event) {
        event.target.onerror = null; // remove the onerror listener to avoid an infinite loop
        event.target.src = "Brand/Vault.png"; // set the default image source
    }

    const arrLogins = logins.map((l, index) => {
        let imgName = l.title.toLowerCase();
        let dataID = l._id
        return (
            <li key={index} className="itm login" data-id={dataID} onClick={handleItemClick}>
                <img
                    className="itm-img"
                    src={`icons/${imgName}.png`}
                    onError={handleImageError}
                    alt="icon"
                />
                <div className="itm-txt">
                    <h3 className="itm-name">{l.title}</h3>
                    <h3 className="itm-username">{l.username}</h3>
                </div>
            </li>
        );
    });

    const arrCards = cards.map((c, index) => {
        let imgName;
        if (c.brand == "mastercard") {
            imgName = "mastercard";
        } else {
            imgName = "visa";
        }

        let cardNumber =
            c.cardNumber.substring(0, 4) +
            "-XXXX-XXXX-" +
            c.cardNumber.substring(c.cardNumber.length - 4);
        return (
            <li key={index} className="itm card">
                <img
                    className="itm-img"
                    src={`icons/${imgName}.png`}
                    onError={handleImageError}
                    alt="icon"
                />
                <div className="itm-txt">
                    <h3 className="itm-name">{c.title}</h3>
                    <h3 className="itm-username">{cardNumber}</h3>
                </div>
            </li>
        );
    });

    const arrSecNotes = secNotes.map((sn, index) => {
        return (
            <li key={index} className="itm">
                <img className="itm-img" src={`Brand/Vault.png`} alt="icon" />
                <div className="itm-txt">
                    <h3 className="itm-name">{sn.title}</h3>
                </div>
            </li>
        );
    });

    //todo set different cards for each type of itm
    const arrFavs = favs.map((f, index) => {
        return (
            <li key={index} className="itm">
                <img className="itm-img" src={`Brand/Vault.png`} alt="icon" />
                <div className="itm-txt">
                    <h3 className="itm-name">{f.title}</h3>
                </div>
            </li>
        );
    });

    function handleCopy(event) {
        // get the username text
        const button = event.currentTarget;
        const username = button.parentElement.previousElementSibling.querySelector("#username").textContent;

        // copy the username text to clipboard
        navigator.clipboard
            .writeText(username)
            .then(() => {
                console.log(`Copied ${username} to clipboard`);
                // show notification for a few seconds
                const notification =
                    '<div class="notification">Text copied</div>';
                document.body.insertAdjacentHTML(
                    "beforeend",
                    notification
                );
                setTimeout(
                    () =>
                        document
                            .querySelector(".notification")
                            .remove(),
                    2000
                );
            })
            .catch((err) =>
                console.error("Failed to copy to clipboard", err)
            );
    };

    function handleEdit(event) {
        const editBtn = event.currentTarget;
        editBtn.classList.toggle("edit")
        if (editBtn.classList.contains("edit"))
            editBtn.textContent = "Save"
        else
            editBtn.innerHTML = '<i class="fa fa-pencil"></i> Edit';
        const fields = document.querySelectorAll(".field");
        const id = document.querySelector(".itm-bar").getAttribute("data-id");

        let title = "";
        let username = "";
        let password = "";
        let websiteLink = "";
        let itmType = "L";

        fields.forEach((field) => {
            field.classList.toggle("edit");
            field.readOnly = !field.readOnly;
            field.disabled = !field.disabled;

            if (!field.classList.contains("edit")) {
                if (field.id === "itm-nameL") {
                    title = field.value;
                }
                else if (field.id === "username") {
                    username = field.value;
                }
                else if (field.id === "pass") {
                    password = field.value;
                }
                else if (field.id === "website") {
                    websiteLink = field.value;
                }
            }
        });
        if (!editBtn.classList.contains("edit")) {
            Axios.post(
                'http://localhost:8000/updateItem',
                {
                    itmId: id,
                    itmType: itmType,
                    title: title,
                    username: username,
                    password: password,
                    websiteLink: websiteLink,
                },
                {
                    headers: {
                        token: localStorage.getItem('accessToken'),
                        'Content-Type': 'application/json', // Set the content type to JSON
                    },
                }
            ).then((res) => {
                if (res.data.auth === false) {
                    navigate('/');
                } else {
                    fetchData();
                }
            });

        }
    };

    return (
        <>
            <header>
                <div className="brand">VAULT</div>
                <input
                    type="text"
                    placeholder="Search Vault"
                    className="search-bar"
                    value={input}
                    onChange={(e) => handleSearch(e.target.value)}
                />

                <div className="user-dropdown">
                    <div className="icon">
                        <h6>DM</h6>
                    </div>
                </div>
            </header>
            <div className="main">
                <div className="sidebar">
                    <ul>
                        <li title="All" className="all-icn">
                            <i
                                className="fa fa-th-large"
                                aria-hidden="true"
                            ></i>
                        </li>
                        <li title="Favourits" className="fav-icn">
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </li>
                        <li title="Logins" className="logs-icn">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                        </li>
                        <li title="Secure Notes" className="secNotes-icn">
                            <i
                                className="fa fa-sticky-note"
                                aria-hidden="true"
                            ></i>
                        </li>
                        <li title="Cards" className="cards-icn">
                            <i
                                className="fa fa-credit-card-alt"
                                aria-hidden="true"
                            ></i>
                        </li>
                        {/* <li title="Folders" className="flds-icn">
                            <i className="fa fa-folder" aria-hidden="true"></i>
                        </li>
                        <li title="Trash" className="trash-icn">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </li> */}
                        <li title="Settings" className="settings-icn">
                            <i className="fa fa-cogs" aria-hidden="true"></i>
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
                        <h3 className="type">FAVOURITS</h3>
                        <ul className="itms">
                            {arrFavs}
                        </ul>
                    </div>

                    <div className="mb-logs">
                        <h3 className="type">LOGINS</h3>
                        <ul className="itms">{arrLogins}</ul>
                    </div>

                    <div className="mb-secNotes">
                        <h3 className="type">SECURE NOTES</h3>
                        <ul className="itms">{arrSecNotes}</ul>
                    </div>

                    <div className="mb-cards">
                        <h3 className="type">CARDS</h3>
                        <ul className="itms">{arrCards}</ul>
                    </div>
                </div>
                <div className="itm-bar">
                    <div className="toolbar">
                        <button className="edit-btn" onClick={handleEdit}>
                            <i className="fa fa-pencil"></i> Edit
                        </button>
                        <button id="delete" className="dlt-btn" onClick={() => handleDelete()}>
                            <i className="fa fa-trash"></i> Delete
                        </button>
                    </div>
                    <div className="itm-intro">
                        <img
                            className="itm-imgL"
                            src="icons/google.png"
                            alt="icon"
                        />
                        <div className="itm-txt">
                            <input id="itm-nameL" className="field" readOnly disabled></input>
                            <h3 className="itm-type">Login</h3>
                        </div>
                        <i id="star" className="fa fa-star" onClick={() => handleFavourite()}></i>
                    </div>
                    <div className="split"></div>
                    <div className="itm-info">
                        <div className="itm-data">
                            <h3 className="h3-type">Username</h3>
                            <input id="username" className="field" readOnly disabled></input>
                        </div>
                        <div>
                            <i className="fa fa-clone copy" onClick={handleCopy}></i>
                        </div>
                    </div>
                    <div className="itm-info">
                        <div className="itm-data">
                            <h3 className="h3-type">Password</h3>
                            <input id="pass" className="field" type="password" readOnly disabled></input>
                        </div>
                        <div>
                            <i className="fa fa-clone copy" onClick={handleCopy}></i>
                            <i id="eye" className="fa fa-eye second-i" onClick={() => handleView()}></i>
                        </div>
                    </div>
                    {itmInfo}
                    <div className="split"></div>
                    <div className="itm-info">
                        <div className="itm-data">
                            <h3 className="h3-type">Website</h3>
                            <input id="website" className="field" readOnly disabled placeholder="Edit to add a website"></input>
                        </div>
                    </div>
                </div>
                <button className="add-btn">+</button>
                <div className="add-menu">
                    <ul className="add-list">
                        <li>
                            <i className="fa fa-lock"></i>
                        </li>
                        <li>
                            <i className="fa fa-sticky-note"></i>
                        </li>
                        <li>
                            <i className="fa fa-credit-card-alt"></i>
                        </li>
                    </ul>
                </div>
            </div>

            <footer>
                <h3>
                    Designed & Built by{" "}
                    <a href="https://github.com/dmeleka"> Daniel Meleka</a>
                </h3>
            </footer>
        </>
    );
}

export default home;