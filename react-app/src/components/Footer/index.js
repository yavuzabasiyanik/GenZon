import "./footer.css";

const Footer = ({ something, something2 }) => {




    return (

        <footer style={something ? { marginTop: "85px" } : {}} >
            <button onClick={() => window.scrollTo(0, 0)} className="backtotopbutton">Back to top</button>

            <div className="footer-main-div">

                <div className="footerps">

                    <div className="footerdivs4">

                        <p>Contact Me</p>
                        <h6>Yavuz Abasiyanik</h6>
                        <h6>(312) 607-5021</h6>
                    </div>



                    {/* <div className="footerdivs4">

                        <p>Projects</p>
                        <a rel="noreferrer" target="_blank" href="https://air-b-end.herokuapp.com/"><h6 style={{ textDecoration: "underline" }}>AirBend</h6></a>
                        <a rel="noreferrer" target="_blank" href="https://memestagram-group-project.herokuapp.com/"><h6 style={{ textDecoration: "underline" }}>Memestagram</h6></a>
                        <a rel="noreferrer" target="_blank" href="https://the-best-stuck-overflow.herokuapp.com/"><h6 style={{ textDecoration: "underline" }}>Stuckoverflow</h6></a>

                    </div> */}
                    <div className="footerdivs4">

                        <p>Technologies Used</p>

                        <div className="technologiesused">

                            <h6>Python</h6>
                            <h6>Flask</h6>
                            <h6>JavaScript</h6>
                            <h6>SQLAlchemy</h6>
                            <h6>React</h6>
                            <h6>HTML5</h6>
                            <h6>PostgreSQL</h6>
                            <h6>CSS3</h6>
                            <h6>Redux</h6>

                        </div>

                    </div>
                    <div className="footerdivs4">

                        <p>About Me</p>

                        <div className="someeeeeee">
                            <a rel="noreferrer" href="https://www.linkedin.com/in/yavuzabasiyanik/" target="_blank"><i className="githublinked fa-brands fa-linkedin"></i></a>
                            <a rel="noreferrer" href="https://github.com/yavuzabasiyanik" target="_blank"><i className="githublinked fa-brands fa-github"></i></a>
                        </div>

                    </div>


                </div>



            </div>
            <div className="bilgiler">
                GenZon is an Amazon clone built by Yavuz Abasiyanik.
            </div>
        </footer>

    )
}




export default Footer
