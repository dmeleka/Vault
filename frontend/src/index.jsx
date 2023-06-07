import './index.css'

function index() {

    document.addEventListener('DOMContentLoaded', () => {
        const rgstrBtn = document.querySelector(".rgstr-btn");

        rgstrBtn.addEventListener('click', () => {
            document.getElementById("overlay").style.display = "block";
            document.querySelector(".rgstr-ol").style.display = "flex";
        });
    });

    return (
        <>
            <header class="header-indx">
                <div class="brand">VAULT</div>
            </header>
            <div class="main-indx">
                <h2>WELCOME TO VAULT</h2>
                <h4>A MODERN SOLUTION TO A MODERN PROBLEM</h4>
                <button class="rgstr-btn">Join Us</button>
            </div>
            <section class="wrapper">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            </section >
            <div id="overlay"></div>
            <div class="rgstr-ol">
                <h2>JOIN US</h2>
                <input type="text" placeholder='First Name'></input>
                <input type="text" placeholder='Last Name'></input>
                <input type="text" placeholder='Username'></input>
                <input type="text" placeholder='Email'></input>
                <input type="Password" placeholder='Password'></input>
                <button class="rgstr-sBtn">Register</button>
            </div>
        </>
    )
}

export default index